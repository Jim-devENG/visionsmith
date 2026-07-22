"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export type SpotlightEvent = {
  slug: string;
  title: string;
  flyerUrl: string | null;
  date: string;
  time: string;
};

export type SpotlightPost = {
  slug: string;
  title: string;
  excerpt: string | null;
  coverImageUrl: string | null;
  publishedAt: string;
};

function Poster({
  href,
  eyebrow,
  title,
  meta,
  imageUrl,
  ctaLabel,
  delay,
}: {
  href: string;
  eyebrow: string;
  title: string;
  meta: string;
  imageUrl: string | null;
  ctaLabel: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={href}
        className="group relative block aspect-[4/5] overflow-hidden rounded-[var(--vs-radius-lg)] border border-[color:var(--vs-line)] shadow-[var(--vs-shadow-lg)] sm:aspect-[16/11]"
      >
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-[color:var(--vs-ink)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/5" />

        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-6">
          <span className="vs-label vs-label-on-dark">{eyebrow}</span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17 17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
          <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-white/60">{meta}</p>
          <h3 className="mt-2 max-w-[24rem] font-[var(--font-sans)] text-[1.5rem] font-extrabold leading-[1.1] tracking-tight text-white sm:text-[1.75rem]">
            {title}
          </h3>
          <span className="mt-4 inline-block text-[13px] font-semibold text-white underline decoration-white/40 underline-offset-4 transition-colors group-hover:decoration-white">
            {ctaLabel}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

function CompactPostCard({
  href,
  title,
  meta,
  imageUrl,
  delay,
}: {
  href: string;
  title: string;
  meta: string;
  imageUrl: string | null;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={href} className="group block">
        <div className="aspect-[16/10] overflow-hidden rounded-[var(--vs-radius)] border border-[color:var(--vs-line)] bg-[color:var(--vs-surface-2)]">
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt=""
              className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[color:var(--vs-subtle)]">
                Field notes
              </span>
            </div>
          )}
        </div>
        <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.06em] text-[color:var(--vs-subtle)]">{meta}</p>
        <h4 className="mt-1 text-[1rem] font-bold leading-snug text-[color:var(--vs-ink)] transition-colors group-hover:text-[color:var(--vs-accent)]">
          {title}
        </h4>
      </Link>
    </motion.div>
  );
}

export function Spotlight({
  event,
  post,
  morePosts,
}: {
  event: SpotlightEvent | null;
  post: SpotlightPost | null;
  morePosts: SpotlightPost[];
}) {
  if (!event && !post) return null;

  return (
    <section className="vs-section vs-surface">
      <div className="vs-wrap vs-section-inner">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6 }}
          className="max-w-[32rem]"
        >
          <p className="vs-label mb-4">Right now</p>
          <h2 className="vs-title">Where the thinking is happening.</h2>
        </motion.div>

        <div className={`mt-10 grid gap-6 ${event && post ? "lg:grid-cols-2" : "lg:max-w-[32rem]"}`}>
          {event ? (
            <Poster
              href={`/events/${event.slug}`}
              eyebrow="Live session"
              title={event.title}
              meta={`${event.date} · ${event.time}`}
              imageUrl={event.flyerUrl}
              ctaLabel="Reserve your seat"
              delay={0}
            />
          ) : null}
          {post ? (
            <Poster
              href={`/blog/${post.slug}`}
              eyebrow="Field notes"
              title={post.title}
              meta={post.publishedAt}
              imageUrl={post.coverImageUrl}
              ctaLabel="Read the piece"
              delay={0.12}
            />
          ) : null}
        </div>

        {morePosts.length > 0 ? (
          <div className="mt-14">
            <div className="mb-6 flex items-center gap-5">
              <p className="shrink-0 text-[12px] font-semibold uppercase tracking-[0.08em] text-[color:var(--vs-subtle)]">
                More from the blog
              </p>
              <div className="h-px flex-1 bg-[color:var(--vs-line)]" />
              <Link href="/blog" className="vs-link shrink-0 text-[13px]">
                View all
              </Link>
            </div>
            <div className="grid gap-x-6 gap-y-8 sm:grid-cols-3">
              {morePosts.map((p, index) => (
                <CompactPostCard
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  title={p.title}
                  meta={p.publishedAt}
                  imageUrl={p.coverImageUrl}
                  delay={index * 0.08}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
