"use client";

import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("Message sent.");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("Failed.");
      }
    } catch {
      setStatus("Failed.");
    }
  };

  return (
    <section id="contact" className="min-h-screen px-6 md:px-12 py-24 flex flex-col justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <span className="text-muted text-xs tracking-widest">03 — CONTACT</span>
          <h2 className="font-display text-5xl md:text-7xl font-bold mt-4 leading-tight">
            LET&apos;S BUILD<br />SOMETHING
          </h2>
          <p className="mt-8 text-lg text-foreground/80 max-w-md">
            Have a project in mind? Send an inquiry and we&apos;ll get back within 24 hours.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6"
        >
          <label className="text-xs tracking-widest text-muted">NAME</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="bg-transparent border-b border-foreground/30 py-3 focus:outline-none focus:border-accent transition-colors"
          />
          <label className="text-xs tracking-widest text-muted mt-2">EMAIL</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="bg-transparent border-b border-foreground/30 py-3 focus:outline-none focus:border-accent transition-colors"
          />
          <label className="text-xs tracking-widest text-muted mt-2">MESSAGE</label>
          <textarea
            required
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            rows={4}
            className="bg-transparent border-b border-foreground/30 py-3 focus:outline-none focus:border-accent transition-colors resize-none"
          />
          <button
            type="submit"
            className="mt-4 self-start px-10 py-4 border border-foreground text-xs tracking-widest font-medium hover:bg-foreground hover:text-background transition-colors"
          >
            SEND INQUIRY
          </button>
          {status && <p className="text-sm text-muted mt-4">{status}</p>}
        </form>
      </div>
    </section>
  );
}
