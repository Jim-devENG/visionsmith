import Link from "next/link";
import { sql } from "../../../lib/db";
import { AdminShell } from "../../../components/admin/AdminShell";

export default async function AdminDashboardPage() {
  const [events, posts, registrations, participants] = await Promise.all([
    sql`select count(*)::int as count from events`,
    sql`select count(*)::int as count from blog_posts`,
    sql`select count(*)::int as count from event_registrations`,
    sql`select count(*)::int as count from participants`,
  ]);

  const stats = [
    { label: "Events", count: events[0].count, href: "/admin/events" },
    { label: "Blog posts", count: posts[0].count, href: "/admin/blog" },
    { label: "Event registrations", count: registrations[0].count, href: "/admin/events" },
    { label: "Join submissions", count: participants[0].count, href: "/admin/account" },
  ];

  return (
    <AdminShell>
      <p className="vs-label mb-4">Dashboard</p>
      <h1 className="vs-title">Overview</h1>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href} className="vs-card block">
            <p className="vs-stat-value">{stat.count}</p>
            <p className="vs-stat-label mt-2">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-4">
        <Link href="/admin/events/new" className="vs-btn">
          New event
        </Link>
        <Link href="/admin/blog/new" className="vs-btn vs-btn-subtle">
          New blog post
        </Link>
        <Link href="/admin/founder" className="vs-btn vs-btn-subtle">
          Edit founder page
        </Link>
        <Link href="/admin/social-links" className="vs-btn vs-btn-subtle">
          Manage social links
        </Link>
      </div>
    </AdminShell>
  );
}
