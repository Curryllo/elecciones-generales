import { Reveal } from "@/components/reveal";
import {
  CONGRESS_2023,
  MAJORITY,
  OTHER_SEATS,
  TOTAL_SEATS,
  type CongressParty,
} from "@/lib/parties";

function SeatRow({
  party,
  align,
}: {
  party: CongressParty;
  align: "left" | "right";
}) {
  const width = Math.min(100, (party.seats / MAJORITY) * 100);
  const name = <span className="text-sm font-medium">{party.name}</span>;
  const count = (
    <span className="font-mono text-2xl font-medium tabular-nums">
      {party.seats}
    </span>
  );
  const vote = (
    <span className="font-mono text-xs tabular-nums text-muted">
      {party.vote}
    </span>
  );

  return (
    <div>
      <div
        className={`flex items-baseline gap-3 ${
          align === "left" ? "justify-end" : "justify-start"
        }`}
      >
        {align === "left" ? (
          <>
            {count}
            {vote}
            {name}
          </>
        ) : (
          <>
            {name}
            {count}
            {vote}
          </>
        )}
      </div>
      <div className="mt-2.5 h-2">
        <div
          className={`h-full rounded-full bg-ink ${
            align === "left" ? "ml-auto" : ""
          }`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

export function Congress() {
  const left = CONGRESS_2023.filter((party) => party.side === "left");
  const right = CONGRESS_2023.filter((party) => party.side === "right");

  return (
    <section id="congreso" className="scroll-mt-24">
      <div className="container-page py-16 sm:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">El Congreso hoy</p>
          <h2 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl">
            350 escaños, 176 para gobernar
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted">
            Así quedó la Cámara tras las elecciones de julio de 2023. El 29 de
            noviembre se renueva.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <div className="grid gap-7 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch lg:gap-10">
            <div className="space-y-7">
              {left.map((party) => (
                <SeatRow key={party.id} party={party} align="left" />
              ))}
            </div>

            <div className="relative hidden w-px bg-line lg:block">
              <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-line bg-canvas px-3 py-1 font-mono text-[11px] tracking-wider">
                176
              </span>
            </div>

            <div className="space-y-7">
              {right.map((party) => (
                <SeatRow key={party.id} party={party} align="right" />
              ))}
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm leading-relaxed text-muted">
               Los cuatro grandes partidos suman, {TOTAL_SEATS - OTHER_SEATS} de {TOTAL_SEATS}.
              Otros grupos parlamentarios {OTHER_SEATS} escaños.
            </p>
            {/*<p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-muted">
              La anchura completa de cada barra equivale a 176 escaños
            </p>*/}
            {/* <p className="mt-6 font-mono text-[11px] uppercase tracking-widest text-muted">
              Resultados oficiales del 23 de julio de 2023
            </p> */}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
