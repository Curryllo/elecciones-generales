const STATS = [
  { value: "350", label: "escaños del Congreso" },
  { value: "176", label: "para mayoría absoluta" },
  { value: "52", label: "provincias" },
];

export function Stats() {
  return (
    <section aria-label="Cifras clave del 29 de noviembre">
      <div className="container-page py-14 sm:py-16">
        <div className="grid grid-cols-3 border-l border-t border-line">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="border-b border-r border-line px-2 py-7 text-center sm:px-6 sm:py-8"
            >
              <div className="font-mono text-3xl font-medium tabular-nums tracking-tight sm:text-4xl">
                {stat.value}
              </div>
              <div className="mt-2 text-sm text-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
