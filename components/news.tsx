import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { getNews } from "@/lib/news";
import type { Article } from "@/lib/feeds";

function formatArticleDate(timestamp: number): string {
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(timestamp));
}

function SourceMeta({ article }: { article: Article }) {
  return (
    <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted">
      <span className="rounded-full border border-line px-2.5 py-1 text-ink">
        {article.sourceName}
      </span>
      {article.publishedAt > 0 && (
        <time dateTime={new Date(article.publishedAt).toISOString()}>
          {formatArticleDate(article.publishedAt)}
        </time>
      )}
    </div>
  );
}

function ArticleImage({
  article,
  sizes,
  className,
}: {
  article: Article;
  sizes: string;
  className: string;
}) {
  if (!article.image) return null;
  return (
    <div className={`relative overflow-hidden bg-line ${className}`}>
      <Image
        src={article.image}
        alt=""
        fill
        sizes={sizes}
        className="object-cover transition-opacity duration-300 group-hover:opacity-90"
      />
    </div>
  );
}

export async function News() {
  const { featured, grid, unavailable } = await getNews();
  const hasContent = featured !== null || grid.length > 0;

  return (
    <section id="prensa" className="scroll-mt-24">
      <div className="container-page py-16 sm:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">En prensa</p>
          <h2 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl">
            Lo que se cuenta hoy
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted">
            Titulares de El País, El Mundo, ABC y La Razón sobre la
            campaña, ordenados por fecha. Cada noticia enlaza a su medio de
            origen.
          </p>
        </Reveal>

        {!hasContent ? (
          <p className="mt-12 text-center text-sm text-muted">
            No hay titulares disponibles ahora mismo. Vuelve a pasar dentro de
            unos minutos.
          </p>
        ) : (
          <Reveal className="mt-12">
            {featured && (
              <a
                href={featured.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group grid gap-6 border-t border-line pt-6 ${
                  featured.image ? "lg:grid-cols-2 lg:gap-10" : ""
                }`}
              >
                <ArticleImage
                  article={featured}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="aspect-[16/9] rounded-2xl"
                />
                <div className="flex flex-col justify-center">
                  <SourceMeta article={featured} />
                  <h3
                    className={`mt-3 text-balance font-medium leading-snug tracking-tight group-hover:underline ${
                      featured.image
                        ? "text-2xl sm:text-3xl"
                        : "max-w-3xl text-3xl sm:text-4xl"
                    }`}
                  >
                    {featured.title}
                  </h3>
                  {featured.description && (
                    <p
                      className={`mt-3 text-sm leading-relaxed text-muted ${
                        featured.image ? "line-clamp-3" : "max-w-2xl"
                      }`}
                    >
                      {featured.description}
                    </p>
                  )}
                  <span className="mt-4 font-mono text-xs text-accent">
                    Leer en {featured.sourceName} ↗
                  </span>
                </div>
              </a>
            )}

            {grid.length > 0 && (
              <div className="mt-10 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                {grid.map((article) => (
                  <a
                    key={article.id}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col border-t border-line pt-5"
                  >
                    <SourceMeta article={article} />
                    <h3 className="mt-3 text-balance text-base font-medium leading-snug tracking-tight group-hover:underline">
                      {article.title}
                    </h3>
                    {article.description && (
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
                        {article.description}
                      </p>
                    )}
                    <span className="mt-3 font-mono text-[11px] uppercase tracking-widest text-accent">
                      {article.sourceName} ↗
                    </span>
                  </a>
                ))}
              </div>
            )}

            <p className="mt-10 font-mono text-[11px] uppercase tracking-widest text-muted">
              {unavailable.length > 0
                ? `No disponibles ahora: ${unavailable.join(", ")}`
                : "Vía RSS de Google News · actualizado cada 5 minutos"}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
