import Image from "next/image";
import { Reveal } from "@/components/reveal";

export function Hero() {
  return (
    <section id="inicio" className="relative isolate overflow-hidden">
      <Image
        src="/Papeletas.jpeg"
        alt="Mesa electoral con urnas y papeletas de voto"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-canvas/75 via-canvas/65 to-canvas" />
      <div className="container-page relative flex min-h-[74svh] flex-col items-center justify-center py-24 text-center">
        <Reveal className="flex w-full flex-col items-center">
          <p className="eyebrow">
            Elecciones generales · domingo 29 de noviembre
          </p>
          <h1 className="mt-6 max-w-3xl text-balance text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl">
            Las elecciones del 29N, explicadas con calma
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
            Datos, prensa y mensajes oficiales de los partidos en un solo
            lugar. Sin ruido, sin tomar partido.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#congreso"
              className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-ink transition-opacity hover:opacity-90"
            >
              Ver el Congreso
            </a>
            <a
              href="#prensa"
              className="rounded-full border border-line bg-surface px-6 py-3 text-sm font-medium transition-colors hover:border-ink/40"
            >
              Últimas noticias
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
