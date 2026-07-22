import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { sql } from "../../../../lib/db";
import { deriveSubscribeUrl } from "../../../../lib/blog-sync";
import { Reveal } from "../../../../components/ui/Reveal";
import { ShareButtons } from "../../../../components/sections/ShareButtons";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

type Post = {
  title: string;
  cover_image_url: string | null;
  body_html: string;
  excerpt: string | null;
  published_at: string;
  author: string | null;
  reading_time_minutes: number | null;
  category: string | null;
  seo_title: string | null;
  seo_description: string | null;
};

async function getPost(slug: string) {
  const rows = await sql`
    select title, cover_image_url, body_html, excerpt, published_at, author, reading_time_minutes, category, seo_title, seo_description
    from blog_posts
    where slug = ${slug} and is_published = true
  `;
  return (rows[0] as Post | undefined) ?? null;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  const url = `https://www.visionsmith.world/blog/${slug}`;
  const title = post.seo_title || post.title;
  const description = post.seo_description || post.excerpt || undefined;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      images: post.cover_image_url ? [{ url: post.cover_image_url }] : undefined,
      publishedTime: post.published_at,
      authors: post.author ? [post.author] : undefined,
    },
    twitter: {
      card: post.cover_image_url ? "summary_large_image" : "summary",
      title,
      description,
      images: post.cover_image_url ? [post.cover_image_url] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const [relatedRows, syncSettingsRows] = await Promise.all([
    post.category
      ? sql`
          select title, slug, cover_image_url from blog_posts
          where is_published = true and category = ${post.category} and slug != ${slug}
          order by published_at desc limit 3
        `
      : sql`
          select title, slug, cover_image_url from blog_posts
          where is_published = true and slug != ${slug}
          order by published_at desc limit 3
        `,
    sql`select rss_feed_url from blog_sync_settings where id = 1`,
  ]);

  const related = relatedRows as { title: string; slug: string; cover_image_url: string | null }[];
  const subscribeUrl = deriveSubscribeUrl(
    (syncSettingsRows[0] as { rss_feed_url: string | null } | undefined)?.rss_feed_url
  );

  const url = `https://www.visionsmith.world/blog/${slug}`;
  const publishedDate = new Date(post.published_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const metaLine = [publishedDate, post.author, post.reading_time_minutes ? `${post.reading_time_minutes} min read` : null]
    .filter(Boolean)
    .join(" · ");

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt ?? undefined,
    image: post.cover_image_url ?? undefined,
    author: post.author ? { "@type": "Person", name: post.author } : undefined,
    datePublished: post.published_at,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    publisher: { "@type": "Organization", name: "VisionSmith" },
  };

  return (
    <main>
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <section className="vs-section vs-surface">
        <div className="vs-wrap vs-section-inner-open">
          <Reveal className="max-w-[42rem]">
            <p className="vs-label mb-6">
              <Link href="/blog" className="vs-link">
                Field notes
              </Link>
            </p>
            <h1 className="vs-display">{post.title}</h1>
            <p className="vs-meta mt-6">{metaLine}</p>
          </Reveal>
        </div>
      </section>

      {post.cover_image_url ? (
        <section className="vs-section vs-surface">
          <div className="vs-wrap pb-10">
            <Reveal>
              <figure className="vs-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={post.cover_image_url} alt="" className="aspect-[21/9]" />
              </figure>
            </Reveal>
          </div>
        </section>
      ) : null}

      <section className="vs-section vs-surface">
        <div className="vs-wrap vs-section-inner-tight">
          <Reveal className="max-w-[42rem]">
            <div className="prose-editor" dangerouslySetInnerHTML={{ __html: post.body_html }} />
          </Reveal>
        </div>
      </section>

      <section className="vs-section vs-tint">
        <div className="vs-wrap vs-section-inner-tight">
          <Reveal className="max-w-[42rem]">
            <ShareButtons url={url} title={post.title} />
          </Reveal>
        </div>
      </section>

      {subscribeUrl ? (
        <section className="vs-section vs-section-dark">
          <div className="vs-wrap vs-section-inner-tight text-center">
            <Reveal className="mx-auto max-w-[30rem]">
              <p className="vs-label vs-label-on-dark mx-auto mb-6">Enjoying these essays?</p>
              <h2 className="vs-title">Receive new VisionSmith essays directly in your inbox.</h2>
              <a
                href={subscribeUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="vs-btn vs-btn-on-dark mt-8 inline-flex"
              >
                Subscribe
              </a>
            </Reveal>
          </div>
        </section>
      ) : null}

      {related.length > 0 ? (
        <section className="vs-section vs-surface">
          <div className="vs-wrap vs-section-inner">
            <Reveal className="max-w-[28rem]">
              <p className="vs-label mb-6">Related essays</p>
            </Reveal>
            <div className="mt-4 grid gap-6 sm:grid-cols-3">
              {related.map((item) => (
                <Link key={item.slug} href={`/blog/${item.slug}`} className="vs-card block overflow-hidden !p-0">
                  {item.cover_image_url ? (
                    <figure className="vs-media !rounded-none">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.cover_image_url} alt="" loading="lazy" className="aspect-[16/10]" />
                    </figure>
                  ) : null}
                  <div className="p-6">
                    <h3 className="vs-subtitle">{item.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="vs-section vs-section-accent">
        <div className="vs-wrap vs-section-inner-tight">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <p className="vs-title max-w-[35rem]">Read something. Now build something.</p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/join" className="vs-btn vs-btn-on-accent">
                Build with Clarity
              </Link>
              <Link href="/blog" className="vs-btn vs-btn-ghost-on-color">
                More field notes
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
