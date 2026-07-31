import { ReactNode } from "react";

interface ContactProps {
  footer?: ReactNode;
}

export default function Contact({ footer }: ContactProps) {
  return (
    <section id="contact" className="relative h-full w-full px-6 md:px-12 pt-28 md:pt-32 pb-20 flex flex-col justify-between bg-background">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
        <div>
          <span className="text-muted text-xs tracking-widest">03 — CONTACT</span>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold mt-4 leading-tight">
            LET&apos;S BUILD<br />SOMETHING
          </h2>
          <p className="mt-4 md:mt-6 text-sm md:text-base text-foreground/80 max-w-md">
            Have a project in mind? Send an inquiry and we&apos;ll get back within 24 hours.
          </p>
        </div>

        <form
          action="/api/contact"
          method="POST"
          className="flex flex-col gap-3 md:gap-4"
        >
          <label className="text-[10px] md:text-xs tracking-widest text-muted">NAME</label>
          <input
            type="text"
            name="name"
            required
            className="bg-transparent border-b border-foreground/30 py-2 focus:outline-none focus:border-accent transition-colors"
          />
          <label className="text-[10px] md:text-xs tracking-widest text-muted mt-1">EMAIL</label>
          <input
            type="email"
            name="email"
            required
            className="bg-transparent border-b border-foreground/30 py-2 focus:outline-none focus:border-accent transition-colors"
          />
          <label className="text-[10px] md:text-xs tracking-widest text-muted mt-1">MESSAGE</label>
          <textarea
            name="message"
            required
            rows={3}
            className="bg-transparent border-b border-foreground/30 py-2 focus:outline-none focus:border-accent transition-colors resize-none"
          />
          <button
            type="submit"
            className="mt-2 self-start w-full md:w-auto px-8 py-3 border border-foreground text-[10px] md:text-xs tracking-widest font-medium hover:bg-foreground hover:text-background transition-colors"
          >
            SEND INQUIRY
          </button>
        </form>
      </div>

      {footer && <div className="mt-auto">{footer}</div>}
    </section>
  );
}
