import Image from "next/image";
import { Reveal } from "@/components/reveal";

const POINTS = [
  {
    title: "52 circunscripciones",
    description:
      "Las 50 provincias más Ceuta y Melilla reparten los escaños por separado, cada una con su propia papeleta y su propio recuento.",
  },
  {
    title: "Método divisor",
    description:
      "Los votos de cada circunscripción se dividen entre 1, 2, 3 y así sucesivamente. Los cocientes más altos se llevan los escaños disponibles.",
  },
  {
    title: "Umbral del 3%",
    description:
      "Las candidaturas que no alcanzan el 3% de los votos válidos en su circunscripción no entran en el reparto de escaños.",
  },
  {
    title: "Ceuta y Melilla",
    description:
      "Cada una tiene un solo escaño en juego, así que allí queda proclamado electo el candidato más votado, sin reparto proporcional.",
  },
];

export function Explainer() {
  return (
    <section id="sistema" className="scroll-mt-24">
      <div className="container-page py-16 sm:py-24">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-line sm:aspect-[3/4] lg:aspect-[4/5]">
              <Image
                src="/Congreso.jpg"
                alt="Fachada del Congreso de los Diputados en Madrid"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-[center_35%]"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">
              Cómo se eligen los 350 diputados
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              Un reparto proporcional con reglas que cambian el resultado
              según la circunscripción. Estos son los cuatro pasos que
              importan.
            </p>
            <ol className="mt-8 border-y border-line">
              {POINTS.map((point, index) => (
                <li
                  key={point.title}
                  className="flex gap-4 border-b border-line py-5 last:border-b-0"
                >
                  <span className="pt-0.5 font-mono text-xs text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-base font-medium">{point.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {point.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-5 text-xs leading-relaxed text-muted">
              Cada provincia tiene garantizado un mínimo de escaños, así que
              el reparto no sigue exactamente la población: el voto de las
              provincias pequeñas pesa algo más.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
