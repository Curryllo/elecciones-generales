import {
  dedupeByTitle,
  fetchFeed,
  sortByDateDesc,
  type Article,
} from "@/lib/feeds";
import {
  ELECTIONS_TOPIC,
  googleNewsSearchUrl,
  NEWS_SOURCES,
} from "@/lib/sources";

export interface NewsBundle {
  featured: Article | null;
  grid: Article[];
  unavailable: string[];
}

const PER_SOURCE_CAP = 2;

const FOREIGN_RE =
  /Venezuela|Chávez|Maduro|Caracas|Uruguay|Paraguay|Honduras|Bolivia|Chile|Colombia|Ecuador|Argentina|Brasil|México|Cuba|Nicaragua|Guatemala|Panamá|Meloni|Italia|Grynspan|jefatura de la ONU|Zelenski|Ucrania/i;

const SPAIN_RE =
  /29-N|29N|Congreso|España|español|Sánchez|campaña|precampaña|sondeo|urnas|censo|Maricarmen|\bPP\b|\bPSOE\b|\bVOX\b|Sumar|Feijóo|Sánchez/i;

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function stripSourceSuffix(text: string, sourceName: string): string {
  const escaped = escapeRegExp(sourceName);
  return text
    .replace(new RegExp(`\\s*(?:[-\u2013\u2014]\\s*)?${escaped}\\s*$`, "i"), "")
    .trim();
}

function normalizeDashes(text: string): string {
  return text.replace(/[\u2013\u2014]/g, "-");
}

function isOnTopic(title: string): boolean {
  if (!FOREIGN_RE.test(title)) return true;
  return SPAIN_RE.test(title);
}

export async function getNews(): Promise<NewsBundle> {
  const results = await Promise.allSettled(
    NEWS_SOURCES.map((source) =>
      fetchFeed(
        googleNewsSearchUrl(`${source.site} ${ELECTIONS_TOPIC} when:60d`),
        source.id,
        source.name
      )
    )
  );

  const unavailable: string[] = [];
  const pools: Article[][] = [];

  results.forEach((result, index) => {
    const source = NEWS_SOURCES[index];
    if (result.status === "rejected" || !result.value.ok) {
      unavailable.push(source.name);
      return;
    }
    const articles = sortByDateDesc(dedupeByTitle(result.value.articles))
      .map((article) => {
        const title = normalizeDashes(
          stripSourceSuffix(article.title, source.name)
        );
        const description = article.description
          ? normalizeDashes(
              stripSourceSuffix(article.description, source.name)
            )
          : null;
        return {
          ...article,
          title,
          description:
            description && description.trim() !== title ? description : null,
        };
      })
      .filter((article) => isOnTopic(article.title))
      .slice(0, PER_SOURCE_CAP);
    pools.push(articles);
  });

  const pool = sortByDateDesc(pools.flat());
  const [featured, ...rest] = pool;

  return {
    featured: featured ?? null,
    grid: rest.slice(0, 6),
    unavailable,
  };
}
