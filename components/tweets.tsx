import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { PARTIES, SIDE_LABEL } from "@/lib/parties";
import { fetchAllParties, type PartyFeed } from "@/lib/rsshub";

function formatTweetDate(timestamp: number): string {
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(timestamp));
}

function FeedCell({ feed }: { feed: PartyFeed }) {
  const { party, avatar, tweets, error } = feed;
  const latest = tweets.slice(0, 2);

  return (
    <article className="rounded-2xl border border-line bg-canvas p-5 sm:p-6">
      <header className="flex items-center gap-3">
        {avatar ? (
          <Image
            src={avatar}
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <div
            aria-hidden="true"
            className="h-10 w-10 rounded-full bg-line"
          />
        )}
        <div>
          <div className="text-sm font-medium">{party.name}</div>
          <div className="font-mono text-xs text-muted">@{party.handle}</div>
        </div>
      </header>

      {error ? (
        <p className="mt-4 text-sm leading-relaxed text-muted">
          No se pudo cargar el feed de {party.name} ahora mismo. Vuelve a
          pasar dentro de unos minutos.
        </p>
      ) : latest.length === 0 ? (
        <p className="mt-4 text-sm text-muted">Sin mensajes recientes.</p>
      ) : (
        <div className="mt-4 space-y-4">
          {latest.map((tweet, index) => (
            <div
              key={tweet.id}
              className={index > 0 ? "border-t border-line pt-4" : ""}
            >
              <p className="line-clamp-4 text-sm leading-relaxed">
                {tweet.text}
              </p>
              <div className="mt-2 flex items-center justify-between gap-3">
                <time
                  className="font-mono text-[11px] text-muted"
                  dateTime={
                    tweet.publishedAt
                      ? new Date(tweet.publishedAt).toISOString()
                      : undefined
                  }
                >
                  {formatTweetDate(tweet.publishedAt)}
                </time>
                <a
                  href={tweet.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[11px] text-accent transition-opacity hover:opacity-75"
                >
                  Ver en X ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}

export async function Tweets() {
  const feeds = await fetchAllParties(PARTIES);
  const byId = new Map(feeds.map((feed) => [feed.party.id, feed]));
  const left = PARTIES.filter((party) => party.side === "left");
  const right = PARTIES.filter((party) => party.side === "right");
  const ordered: PartyFeed[] = [];
  left.forEach((party, index) => {
    const leftFeed = byId.get(party.id);
    const rightParty = right[index];
    const rightFeed = rightParty ? byId.get(rightParty.id) : undefined;
    if (leftFeed) ordered.push(leftFeed);
    if (rightFeed) ordered.push(rightFeed);
  });

  return (
    <section id="partidos" className="scroll-mt-24 border-y border-line bg-surface">
      <div className="container-page py-16 sm:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">
            Lo que dicen los partidos
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted">
            Los últimos mensajes en X de las cuatro grandes formaciones, a la
            misma altura y en el mismo formato, para leerlos sin favoritismos.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <div className="mb-4 hidden grid-cols-2 gap-6 lg:grid">
            <div className="text-right font-mono text-[11px] uppercase tracking-widest text-muted">
              {SIDE_LABEL.left}
            </div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-muted">
              {SIDE_LABEL.right}
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {ordered.map((feed) => (
              <FeedCell key={feed.party.id} feed={feed} />
            ))}
          </div>
          <p className="mt-6 text-center font-mono text-[11px] uppercase tracking-widest text-muted">
            Cada mensaje enlaza a su publicación original · cuentas oficiales
            en X
          </p>
        </Reveal>
      </div>
    </section>
  );
}
