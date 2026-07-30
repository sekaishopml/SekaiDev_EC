import FadeIn from "./FadeIn";

export default function Footer() {
  return (
    <FadeIn>
      <footer className="px-6 md:px-12 py-8 border-t border-foreground/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs tracking-widest text-muted">
        <span className="font-display text-2xl font-bold text-foreground">SEKAIDEV</span>
        <span>© 2025 SEKAIDEV. ALL RIGHTS RESERVED.</span>
        <span>MADE WITH NEXT.JS, GO & POSTGRES</span>
      </footer>
    </FadeIn>
  );
}
