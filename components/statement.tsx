import Image from "next/image";

export function Statement() {
  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src="/Votacion.jpg"
        alt="Manos introduciendo una papeleta en una urna"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/70 to-canvas/30" />
      <div className="container-page relative flex min-h-[56svh] items-end py-16 sm:py-20">
        <div>
          <p className="max-w-3xl text-balance text-3xl font-medium leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            No te decimos por quién votar. Te contamos qué se decide el 29 de
            noviembre.
          </p>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted">
            Esta web reúne datos, prensa y mensajes oficiales de los partidos.
            No somos la administración electoral ni trabajamos para ningún
            partido.
          </p>
        </div>
      </div>
    </section>
  );
}
