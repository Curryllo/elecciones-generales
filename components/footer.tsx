const SECTIONS = [
  { href: "#congreso", label: "Congreso" },
  { href: "#calendario", label: "Calendario" },
  { href: "#prensa", label: "Prensa" },
  { href: "#sistema", label: "Sistema electoral" },
  { href: "#preguntas", label: "Preguntas" },
];

const SOURCES = [
  { href: "https://www.boe.es", label: "BOE" },
  {
    href: "https://www.juntaelectoralcentral.es",
    label: "Junta Electoral Central",
  },
  { href: "https://news.google.com", label: "Google News" },
  { href: "https://x.com", label: "Cuentas en X" },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-canvas">
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="font-mono text-sm font-semibold">
            29N<span className="text-accent">.</span>
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
            Información neutral sobre las elecciones generales del domingo 29
            de noviembre de 2026.
          </p>
        </div>

        <nav aria-label="Secciones">
          <h2 className="font-mono text-[11px] uppercase tracking-widest text-muted">
            Secciones
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {SECTIONS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-muted transition-colors hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Fuentes">
          <h2 className="font-mono text-[11px] uppercase tracking-widest text-muted">
            Fuentes
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {SOURCES.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted transition-colors hover:text-ink"
                >
                  {link.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-mono text-[11px] uppercase tracking-widest text-muted">
            Aviso
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Sitio no oficial. Sin relación con la administración electoral ni
            con ningún partido. Los mensajes de los partidos pertenecen a sus
            autores.
          </p>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-2 py-5 font-mono text-[11px] uppercase tracking-widest text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>29N · 2026</span>
          <span>Datos actualizados cada 5 minutos</span>
        </div>
      </div>
    </footer>
  );
}
