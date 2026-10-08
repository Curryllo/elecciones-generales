export function TweetsSkeleton() {
  return (
    <section aria-busy="true" aria-label="Cargando mensajes de los partidos" className="border-y border-line bg-surface">
      <div className="container-page py-16 sm:py-24">
        <div className="mx-auto h-9 w-64 animate-pulse rounded bg-line" />
        <div className="mx-auto mt-4 h-4 w-96 max-w-full animate-pulse rounded bg-line" />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className="h-56 animate-pulse rounded-2xl border border-line bg-canvas/60"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function NewsSkeleton() {
  return (
    <section aria-busy="true" aria-label="Cargando titulares de prensa">
      <div className="container-page py-16 sm:py-24">
        <div className="mx-auto h-9 w-56 animate-pulse rounded bg-line" />
        <div className="mx-auto mt-4 h-4 w-96 max-w-full animate-pulse rounded bg-line" />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="aspect-[16/9] animate-pulse rounded-2xl bg-line" />
          <div className="flex flex-col justify-center gap-4">
            <div className="h-4 w-32 animate-pulse rounded bg-line" />
            <div className="h-7 w-full animate-pulse rounded bg-line" />
            <div className="h-7 w-4/5 animate-pulse rounded bg-line" />
            <div className="h-4 w-40 animate-pulse rounded bg-line" />
          </div>
        </div>
        <div className="mt-10 grid gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <div key={index} className="animate-pulse">
              <div className="aspect-[16/10] rounded-2xl bg-line" />
              <div className="mt-4 h-4 w-24 rounded bg-line" />
              <div className="mt-3 h-4 w-full rounded bg-line" />
              <div className="mt-2 h-4 w-3/4 rounded bg-line" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
