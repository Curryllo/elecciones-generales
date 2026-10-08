const LINKS = [
  { href: "#congreso", label: "Congreso" },
  { href: "#calendario", label: "Calendario" },
  { href: "#prensa", label: "Prensa" },
  { href: "#preguntas", label: "Preguntas" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/85 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between sm:h-[68px]">
        <a href="#inicio" className="font-mono text-sm font-semibold">
          29N<span className="text-accent">.</span>
        </a>
        <nav className="hidden items-center gap-7 text-sm text-muted md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <span className="font-mono text-xs tracking-widest text-muted">
          29 · 11 · 2026
        </span>
      </div>
    </header>
  );
}
