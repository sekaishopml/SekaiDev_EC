package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/jackc/pgx/v5/pgxpool"
)

var db *pgxpool.Pool

type ContactRequest struct {
	Name    string `json:"name"`
	Email   string `json:"email"`
	Message string `json:"message"`
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}
	databaseURL := os.Getenv("DATABASE_URL")
	if databaseURL == "" {
		databaseURL = "postgres://sekai:sekai@localhost:5432/sekaidev"
	}

	var err error
	db, err = pgxpool.New(context.Background(), databaseURL)
	if err != nil {
		log.Fatalf("unable to connect to database: %v", err)
	}
	defer db.Close()

	if err := ensureSchema(); err != nil {
		log.Fatalf("schema error: %v", err)
	}

	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(corsMiddleware)

	r.Get("/api/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
	})

	r.Post("/api/contact", handleContact)

	addr := fmt.Sprintf(":%s", port)
	log.Printf("backend listening on %s", addr)
	if err := http.ListenAndServe(addr, r); err != nil {
		log.Fatalf("server error: %v", err)
	}
}

func ensureSchema() error {
	_, err := db.Exec(context.Background(), `
		CREATE TABLE IF NOT EXISTS contacts (
			id SERIAL PRIMARY KEY,
			name TEXT NOT NULL,
			email TEXT NOT NULL,
			message TEXT NOT NULL,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		)
	`)
	return err
}

func handleContact(w http.ResponseWriter, r *http.Request) {
	var req ContactRequest
	ct := r.Header.Get("Content-Type")
	if ct == "" || ct == "application/json" || len(ct) > 16 && ct[:16] == "application/json" {
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, "invalid request", http.StatusBadRequest)
			return
		}
	} else {
		if err := r.ParseForm(); err != nil {
			http.Error(w, "invalid request", http.StatusBadRequest)
			return
		}
		req.Name = r.FormValue("name")
		req.Email = r.FormValue("email")
		req.Message = r.FormValue("message")
	}

	if req.Name == "" || req.Email == "" || req.Message == "" {
		http.Error(w, "missing fields", http.StatusBadRequest)
		return
	}

	_, err := db.Exec(context.Background(),
		"INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3)",
		req.Name, req.Email, req.Message,
	)
	if err != nil {
		log.Printf("contact insert error: %v", err)
		http.Error(w, "internal error", http.StatusInternalServerError)
		return
	}

	if ct != "" && (len(ct) < 16 || ct[:16] != "application/json") && (r.Header.Get("Accept") == "" || len(r.Header.Get("Accept")) >= 9 && r.Header.Get("Accept")[:9] == "text/html") {
		http.Redirect(w, r, "/?success=1", http.StatusSeeOther)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"status": "created"})
}

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}
		next.ServeHTTP(w, r)
	})
}
