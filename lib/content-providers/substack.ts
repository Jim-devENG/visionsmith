import Parser from "rss-parser";
import { slugify } from "../slug";
import type { ContentProvider, NormalizedArticle } from "./types";

type SubstackItem = {
  link?: string;
  guid?: string;
  title?: string;
  pubDate?: string;
  creator?: string;
  content?: string;
  contentSnippet?: string;
  isoDate?: string;
  categories?: string[];
  enclosure?: { url: string };
  contentEncoded?: string;
};

function slugFromUrl(url: string | undefined, fallbackTitle: string) {
  if (url) {
    try {
      const path = new URL(url).pathname;
      const last = path.split("/").filter(Boolean).pop();
      if (last) return slugify(last);
    } catch {
      // fall through to title-based slug
    }
  }
  return slugify(fallbackTitle);
}

function firstImageFromHtml(html: string) {
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : null;
}

const HTML_ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&apos;": "'",
  "&nbsp;": " ",
  "&#8212;": "—",
  "&#8211;": "–",
  "&#8217;": "’",
  "&#8216;": "‘",
  "&#8220;": "“",
  "&#8221;": "”",
  "&#8230;": "…",
};

function decodeEntities(text: string) {
  return text.replace(/&#?\w+;/g, (entity) => HTML_ENTITIES[entity] ?? entity);
}

function excerptFromHtml(html: string, max = 220) {
  const text = decodeEntities(
    html
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
  );
  if (text.length <= max) return text || null;
  return `${text.slice(0, max).trim()}…`;
}

export class SubstackProvider implements ContentProvider {
  readonly id = "substack";

  async fetchArticles(feedUrl: string): Promise<NormalizedArticle[]> {
    const parser = new Parser<Record<string, unknown>, SubstackItem>({
      timeout: 15_000,
      headers: { "User-Agent": "VisionSmith-BlogSync/1.0" },
      customFields: {
        item: [["content:encoded", "contentEncoded"]],
      },
    });

    const feed = await parser.parseURL(feedUrl);

    return (feed.items ?? [])
      .filter((item) => item.title && item.link)
      .map((item) => {
        const bodyHtml = item.contentEncoded || item.content || "";
        const guid = item.guid || item.link!;
        const publishedAt = item.isoDate || item.pubDate || new Date().toISOString();

        return {
          guid,
          title: item.title!.trim(),
          slug: slugFromUrl(item.link, item.title!),
          excerpt: excerptFromHtml(bodyHtml) || item.contentSnippet?.trim() || null,
          coverImageUrl: item.enclosure?.url || firstImageFromHtml(bodyHtml),
          bodyHtml,
          author: item.creator?.trim() || null,
          publishedAt,
          tags: item.categories ?? [],
          category: item.categories?.[0] ?? null,
          sourceUrl: item.link!,
        } satisfies NormalizedArticle;
      });
  }
}
