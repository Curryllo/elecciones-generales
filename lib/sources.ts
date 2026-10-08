export type SourceId = "elpais" | "elmundo" | "abc" | "lavanguardia";

export interface NewsSource {
  id: SourceId;
  name: string;
  site: string;
}

export const NEWS_SOURCES: NewsSource[] = [
  { id: "elpais", name: "El País", site: "site:elpais.com" },
  { id: "elmundo", name: "El Mundo", site: "site:elmundo.es" },
  { id: "abc", name: "ABC", site: "site:abc.es" },
  { id: "lavanguardia", name: "La Vanguardia", site: "site:lavanguardia.com" },
];

export const ELECTIONS_TOPIC =
  '(elecciones OR electoral OR "29-N" OR campaña OR Congreso OR votación)';

export function googleNewsSearchUrl(query: string): string {
  return `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=es&gl=ES&ceid=ES:es`;
}
