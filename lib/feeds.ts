import { XMLParser } from "fast-xml-parser";

export interface RawMedia {
  url: string;
  type: "image" | "video";
}

export interface Article {
  id: string;
  title: string;
  url: string;
  sourceId: string;
  sourceName: string;
  publishedAt: number;
  image: string | null;
  description: string | null;
}

export type FeedResult =
  | { ok: true; articles: Article[] }
  | { ok: false; error: string };

const FETCH_TIMEOUT_MS = 20_000;
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  removeNSPrefix: false,
  parseTagValue: false,
  trimValues: true,
});

function asArray<T>(value: T | T[] | undefined): T[] {
  if (value === undefined) return [];
  return Array.isArray(value) ? value : [value];
}

function textOf(node: unknown): string | null {
  if (node === null || node === undefined) return null;
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (typeof node === "object" && "#text" in node) {
    const t = (node as Record<string, unknown>)["#text"];
    if (typeof t === "string" || typeof t === "number") return String(t);
  }
  return null;
}

function attrOf(node: unknown, name: string): string | null {
  if (node && typeof node === "object") {
    const v = (node as Record<string, unknown>)[`@_${name}`];
    if (typeof v === "string") return v;
  }
  return null;
}

function parseDate(value: string | null): number | null {
  if (!value) return null;
  const d = Date.parse(value);
  return Number.isNaN(d) ? null : d;
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

function stripHtml(html: string): string {
  return decodeEntities(
    html
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
  );
}

function extractImageFromNode(item: Record<string, unknown>): string | null {
  const thumb = asArray(item["media:thumbnail"])[0];
  const thumbUrl = attrOf(thumb, "url");
  if (thumbUrl) return thumbUrl;

  for (const content of asArray(item["media:content"])) {
    const url = attrOf(content, "url");
    const type = attrOf(content, "type") ?? "";
    const medium = attrOf(content, "medium") ?? "";
    if (url && (type.startsWith("image/") || medium === "image")) return url;
  }

  for (const enc of asArray(item.enclosure)) {
    const url = attrOf(enc, "url");
    const type = attrOf(enc, "type") ?? "";
    if (url && type.startsWith("image/")) return url;
  }

  const description = textOf(item.description) ?? "";
  const match = description.match(/<img[^>]+src="([^"]+)"/i);
  if (match) return decodeEntities(match[1]);

  return null;
}

function extractVideoFromNode(item: Record<string, unknown>): string | null {
  for (const content of asArray(item["media:content"])) {
    const url = attrOf(content, "url");
    const type = attrOf(content, "type") ?? "";
    if (url && type.startsWith("video/")) return url;
  }
  return null;
}

function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim();
}

export function parseFeed(
  xml: string,
  sourceId: string,
  sourceName: string
): Article[] {
  const doc = parser.parse(xml) as Record<string, unknown>;
  const rss = (doc.rss ?? doc.feed) as Record<string, unknown> | undefined;
  if (!rss) return [];
  const channel = (rss.channel ?? rss) as Record<string, unknown>;
  const items = asArray(channel.item ?? channel.entry);

  const articles: Article[] = [];
  for (const raw of items) {
    if (!raw || typeof raw !== "object") continue;
    const item = raw as Record<string, unknown>;
    const title = textOf(item.title);
    const link = textOf(item.link) ?? attrOf(asArray(item.link)[0], "href");
    if (!title || !link) continue;

    const publishedAt =
      parseDate(textOf(item.pubDate)) ??
      parseDate(textOf(item.published)) ??
      parseDate(textOf(item.updated)) ??
      0;

    const descriptionRaw = textOf(item.description);
    const description = descriptionRaw ? stripHtml(descriptionRaw) : null;
    const video = extractVideoFromNode(item);

    articles.push({
      id: `${sourceId}:${link}`,
      title: decodeEntities(title).trim(),
      url: link,
      sourceId,
      sourceName,
      publishedAt,
      image: extractImageFromNode(item) ?? video,
      description: description ? description.slice(0, 280) : null,
    });
  }
  return articles;
}

export async function fetchFeed(
  url: string,
  sourceId: string,
  sourceName: string
): Promise<FeedResult> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": UA, Accept: "application/rss+xml,application/xml,text/xml,*/*" },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      next: { revalidate: 300 },
    });
    if (!res.ok) return { ok: false, error: `HTTP ${res.status}` };
    const xml = await res.text();
    const articles = parseFeed(xml, sourceId, sourceName);
    return { ok: true, articles };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error desconocido";
    return { ok: false, error: message };
  }
}

export function dedupeByTitle(articles: Article[]): Article[] {
  const seen = new Set<string>();
  const out: Article[] = [];
  for (const article of articles) {
    const key = normalizeTitle(
      article.title.replace(/\s*-\s*[^-]+$/, "").slice(0, 80)
    );
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(article);
  }
  return out;
}

export function sortByDateDesc(articles: Article[]): Article[] {
  return [...articles].sort((a, b) => b.publishedAt - a.publishedAt);
}
