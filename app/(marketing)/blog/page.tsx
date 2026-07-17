import Link from "next/link";
import { sql } from "../../../lib/db";
import { Reveal } from "../../../components/ui/Reveal";
import { Marquee } from "../../../components/ui/Marquee";
import { Highlight } from "../../../components/ui/Highlight";

type Post = {
  title: string;
  slug: string;
  cover_image_url: string | null;
  excerpt: string | null;
  published_at: string;
};

function formatDate(value: string) {
  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogIndexPage() {
  const posts = (await sql`
    select title, slug, cover_image_url, excerpt, published_at
    from blog_posts
    where is_published = true
    order by published_at desc
  `) as Post[];

  const [featured, ...rest] = posts;

  return (
    <main>
      <section className="vs-section vs-surface">
        <div className="vs-wrap vs-section-inner-open">
          <Reveal>
            <p className="vs-label mb-8">Field notes</p>
            <h1 className="vs-display max-w-[36rem]">Thinking, written down.</h1>
            <p className="vs-copy mt-8 max-w-[36rem]">
              Short pieces on pattern, structure, and the discipline of
              thinking clearly before you build.
            </p>
          </Reveal>
        </div>
      </section>

      {featured ? (
        <section className="vs-section vs-tint">
          <div className="vs-wrap vs-section-inner-tight">
            <Reveal>
              <p className="vs-label mb-6">Latest</p>
              <Link
                href={`/blog/${featured.slug}`}
                className="vs-card grid gap-8 !p-0 overflow-hidden lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-stretch"
              >
                {featured.cover_image_url ? (
                  <figure className="vs-media !rounded-none">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={featured.cover_image_url} alt="" className="aspect-[16/10] lg:aspect-auto lg:h-full" />
                  </figure>
                ) : (
                  <div className="hidden bg-[color:var(--vs-surface-2)] lg:block" />
                )}
                <div className="flex flex-col justify-center p-8 lg:p-10">
                  <p className="vs-meta">{formatDate(featured.published_at)}</p>
                  <h2 className="vs-title mt-4">{featured.title}</h2>
                  {featured.excerpt ? <p className="vs-copy mt-4">{featured.excerpt}</p> : null}
                  <span className="vs-link mt-6 inline-block w-fit">Read the piece</span>
                </div>
              </Link>
            </Reveal>
          </div>
        </section>
      ) : null}

      <section className="vs-section vs-surface">
        <div className="vs-wrap vs-section-inner">
          {posts.length === 0 ? (
            <Reveal>
              <p className="vs-copy">Nothing published yet. Check back soon.</p>
            </Reveal>
          ) : rest.length === 0 ? null : (
            <Reveal className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="vs-card block overflow-hidden !p-0">
                  {post.cover_image_url ? (
                    <figure className="vs-media !rounded-none">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={post.cover_image_url} alt="" loading="lazy" className="aspect-[16/10]" />
                    </figure>
                  ) : null}
                  <div className="p-6">
                    <p className="vs-meta">{formatDate(post.published_at)}</p>
                    <h2 className="vs-subtitle mt-3">{post.title}</h2>
                    {post.excerpt ? <p className="vs-copy mt-3">{post.excerpt}</p> : null}
                  </div>
                </Link>
              ))}
            </Reveal>
          )}
        </div>
      </section>

      <section className="vs-section vs-section-dark relative overflow-hidden">
        <div className="pt-14 text-white/[0.06]">
          <Marquee items={["PATTERN", "STRUCTURE", "THINKING", "BUILDING"]} />
        </div>
        <div className="vs-wrap relative vs-section-inner-tight text-center">
          <Reveal className="mx-auto max-w-xl">
            <p className="vs-label vs-label-on-dark mx-auto mb-6">Path forward</p>
            <h2 className="vs-title">Reading is not the <Highlight>practice</Highlight>.</h2>
            <p className="vs-copy mx-auto mt-6 max-w-lg">
              Notes are useful when they change what you build next. If they
              don't, the next step is the platform itself.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
              <Link href="/join" className="vs-btn vs-btn-on-dark">
                Build with Clarity
              </Link>
              <Link href="/how-it-works" className="vs-btn vs-btn-ghost-on-color">
                Explore the Pattern
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
