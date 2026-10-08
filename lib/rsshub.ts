import { XMLParser } from "fast-xml-parser";
import type { Party } from "@/lib/parties";

export interface TweetMedia {
  url: string;
  type: "image" | "video";
  poster?: string;
  width?: number;
  height?: number;
}

export interface Tweet {
  id: string;
  text: string;
  url: string;
  publishedAt: number;
  media: TweetMedia[];
}

export interface PartyFeed {
  party: Party;
  avatar: string | null;
  tweets: Tweet[];
  error: string | null;
}

const FETCH_TIMEOUT_MS = 25_000;
const RSSHUB_PARAMS = "readable=1&showAuthorInDesc=0&includeRts=1";

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  removeNSPrefix: false,
  parseTagValue: false,
  trimValues: true,
});

export function rssHubBase(): string {
  return (process.env.RSSHUB_URL ?? "https://rss-hub-ebon-ten.vercel.app/").replace(/\/$/, "");
}

function decodeEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function asArray<T>(value: T | T[] | undefined): T[] {
  if (value === undefined) return [];
  return Array.isArray(value) ? value : [value];
}

export function parseTweetHtml(html: string): {
  text: string;
  media: Tweet["media"];
} {
  const media: Tweet["media"] = [];

  for (const match of html.matchAll(/<video\b[^>]*>/gi)) {
    const tag = match[0];
    const src = tag.match(/\bsrc="([^"]+)"/i)?.[1];
    if (!src) continue;
    const poster = tag.match(/\bposter="([^"]+)"/i)?.[1];
    const width = Number(tag.match(/\bwidth="(\d+)"/i)?.[1]) || undefined;
    const height = Number(tag.match(/\bheight="(\d+)"/i)?.[1]) || undefined;
    media.push({
      url: decodeEntities(src),
      type: "video",
      poster: poster ? decodeEntities(poster) : undefined,
      width,
      height,
    });
  }

  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    const src = match[0].match(/\bsrc="([^"]+)"/i)?.[1];
    if (!src) continue;
    const url = decodeEntities(src);
    if (/profile_images/i.test(url)) continue;
    media.push({ url, type: "image" });
  }

  const text = decodeEntities(
    html
      .replace(/<video\b[\s\S]*?(?:<\/video>|$)/gi, " ")
      .replace(/<img\b[^>]*>/gi, " ")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/(p|div)>/gi, "\n")
      .replace(/<[^>]+>/g, "")
      .replace(/\n{3,}/g, "\n\n")
      .trim()
  );

  return { text, media };
}

export function parseTwitterFeed(xml: string, party: Party): PartyFeed {
  try {
    const doc = parser.parse(xml) as Record<string, unknown>;
    const rss = doc.rss as Record<string, unknown> | undefined;
    const channel = rss?.channel as Record<string, unknown> | undefined;
    if (!channel) {
      return { party, avatar: null, tweets: [], error: "Feed no válido" };
    }

    const imageNode = channel.image as Record<string, unknown> | undefined;
    const avatar =
      imageNode && typeof imageNode.url === "string" ? imageNode.url : null;

    const tweets: Tweet[] = [];
    for (const raw of asArray(channel.item)) {
      if (!raw || typeof raw !== "object") continue;
      const item = raw as Record<string, unknown>;
      const link = typeof item.link === "string" ? item.link : null;
      const title = typeof item.title === "string" ? item.title : "";
      const description = typeof item.description === "string" ? item.description : "";
      if (!link) continue;

      const pubDate =
        typeof item.pubDate === "string" ? Date.parse(item.pubDate) : NaN;
      const { text, media } = parseTweetHtml(description || title);

      tweets.push({
        id: link,
        text: text || title,
        url: link,
        publishedAt: Number.isNaN(pubDate) ? 0 : pubDate,
        media,
      });
    }

    return { party, avatar, tweets, error: null };
  } catch (err) {
    return {
      party,
      avatar: null,
      tweets: [],
      error: err instanceof Error ? err.message : "Error al leer el feed",
    };
  }
}

export async function fetchPartyFeed(party: Party): Promise<PartyFeed> {
  const url = `${rssHubBase()}/twitter/user/${party.handle}/${RSSHUB_PARAMS}`;
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      next: { revalidate: 300 },
    });
    if (!res.ok) {
      return {
        party,
        avatar: null,
        tweets: [],
        error: res.status === 503 ? "RSSHub no disponible (503)" : `HTTP ${res.status}`,
      };
    }
    const xml = await res.text();
    if (!xml.includes("<rss")) {
      return { party, avatar: null, tweets: [], error: "Respuesta inesperada de RSSHub" };
    }
    return parseTwitterFeed(xml, party);
  } catch (err) {
    return {
      party,
      avatar: null,
      tweets: [],
      error: err instanceof Error ? err.message : "No se pudo conectar con RSSHub",
    };
  }
}

export async function fetchAllParties(parties: Party[]): Promise<PartyFeed[]> {
  const results = await Promise.allSettled(parties.map(fetchPartyFeed));
  return results.map((result, index) => {
    if (result.status === "fulfilled") return result.value;
    return {
      party: parties[index],
      avatar: null,
      tweets: [],
      error: "No se pudo cargar el feed",
    };
  });
}
