export type NormalizedArticle = {
  /** Stable unique id from the source platform — used for dedup/upsert. */
  guid: string;
  title: string;
  /** Preferred slug for the VisionSmith URL, derived from the source when possible. */
  slug: string;
  excerpt: string | null;
  coverImageUrl: string | null;
  bodyHtml: string;
  author: string | null;
  publishedAt: string;
  tags: string[];
  category: string | null;
  /** Original URL on the source platform — kept for reference, never shown publicly. */
  sourceUrl: string;
};

export interface ContentProvider {
  readonly id: string;
  fetchArticles(feedUrl: string): Promise<NormalizedArticle[]>;
}
