# SekaiDev Portfolio

Full-stack corporate portfolio for SekaiDev — freelance software development company.

## Stack

- Frontend: Next.js 14 (App Router) + Tailwind CSS + Framer Motion + React Three Fiber
- Backend: Go 1.23 (Chi, pgx)
- Database: PostgreSQL 16

## Development

```bash
# Start PostgreSQL
docker run -d --name sekai-dev-db -e POSTGRES_USER=sekai -e POSTGRES_PASSWORD=sekai -e POSTGRES_DB=sekaidev -p 5432:5432 postgres:16-alpine

# Backend
cd backend
DATABASE_URL=postgres://sekai:sekai@localhost:5432/sekaidev go run main.go

# Frontend
cd frontend
npm install
npm run dev
```

## Production

Nginx reverse proxy to `http://127.0.0.1:3000` for the frontend and `http://127.0.0.1:8000` for `/api`.
