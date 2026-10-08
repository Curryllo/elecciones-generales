import { Reveal } from "@/components/reveal";
import { TIMELINE } from "@/lib/calendar";

export function Dates() {
  return (
    <section id="calendario" className="scroll-mt-24">
      <div className="container-page py-16 sm:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">
            El camino hasta el 29 de noviembre
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted">
            Las fechas oficiales del proceso, tomadas del real decreto de
            convocatoria y de la ley electoral.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <ol className="relative">
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-[7px] top-0 w-px bg-line lg:left-1/2"
            />
            {TIMELINE.map((item, index) => {
              const flipped = index % 2 === 1;
              return (
                <li
                  key={item.title}
                  className="relative grid gap-3 pb-10 pl-10 last:pb-0 lg:grid-cols-2 lg:gap-0 lg:pb-14 lg:pl-0"
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-accent bg-canvas lg:left-1/2 lg:-translate-x-1/2"
                  />
                  <div
                    className={
                      flipped
                        ? "lg:col-start-2 lg:pl-14"
                        : "lg:pr-14 lg:text-right"
                    }
                  >
                    <time className="font-mono text-xs uppercase tracking-widest text-accent">
                      {item.date}
                    </time>
                    <h3 className="mt-1.5 text-lg font-medium tracking-tight">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 max-w-md text-sm leading-relaxed text-muted lg:max-w-none">
                      {item.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
