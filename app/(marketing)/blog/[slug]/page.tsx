import { notFound } from "next/navigation";
import Link from "next/link";
import { sql } from "../../../../lib/db";
import { Reveal } from "../../../../components/ui/Reveal";
import { ShareButtons } from "../../../../components/sections/ShareButtons";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  const rows = await sql`
    select title, cover_image_url, body_html, published_at
    from blog_posts
    where slug = ${slug} and is_published = true
  `;
  const post = rows[0] as
    | { title: string; cover_image_url: string | null; body_html: string; published_at: string }
    | undefined;

  if (!post) notFound();

  const url = `https://www.visionsmith.world/blog/${slug}`;
  const publishedDate = new Date(post.published_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main>
      <section className="vs-section vs-surface">
        <div className="vs-wrap vs-section-inner-open">
          <Reveal className="max-w-[42rem]">
            <p className="vs-label mb-6">
              <Link href="/blog" className="vs-link">
                Writing
              </Link>
            </p>
            <h1 className="vs-display">{post.title}</h1>
            <p className="vs-meta mt-6">{publishedDate}</p>
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

      <section className="vs-section vs-section-accent">
        <div className="vs-wrap vs-section-inner-tight">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <p className="vs-title max-w-[35rem]">Read something. Now govern something.</p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/join" className="vs-btn vs-btn-on-accent">
                Enter VisionSmith
              </Link>
              <Link href="/blog" className="vs-btn vs-btn-ghost-on-color">
                More writing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
