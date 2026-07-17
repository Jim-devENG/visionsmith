-- VisionSmith core schema. Applied once via scripts/migrate.ts against DATABASE_URL.

create extension if not exists pgcrypto;

-- ── Admins ──────────────────────────────────────────────
create table if not exists admins (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  password_hash text not null,
  created_at timestamptz not null default now()
);

-- ── Events ──────────────────────────────────────────────
create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  framing text not null,
  event_date date not null,
  event_time text not null,
  action_label text not null default 'Join VisionSmith to attend',
  status text not null default 'upcoming' check (status in ('upcoming', 'past')),
  is_featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists events_status_date_idx on events (status, event_date desc);

-- ── Event registrations ─────────────────────────────────
create table if not exists event_registrations (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references events(id) on delete cascade,
  full_name text not null,
  email text not null,
  note text,
  created_at timestamptz not null default now(),
  unique (event_id, email)
);
create index if not exists event_registrations_event_idx on event_registrations (event_id);

-- ── Blog posts ──────────────────────────────────────────
create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  cover_image_url text,
  body_html text not null default '',
  excerpt text,
  is_published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists blog_posts_published_idx on blog_posts (is_published, published_at desc);

-- ── Social links ────────────────────────────────────────
create table if not exists social_links (
  id uuid primary key default gen_random_uuid(),
  platform text not null unique,
  label text not null,
  url text not null,
  sort_order integer not null default 0,
  is_visible boolean not null default true
);

-- ── Founder page (single row) ───────────────────────────
create table if not exists founder_page (
  id integer primary key default 1 check (id = 1),
  name text not null default 'Founder',
  photo_url text,
  body_html text not null default '',
  updated_at timestamptz not null default now()
);
insert into founder_page (id) values (1) on conflict (id) do nothing;

-- ── Participants (replaces the broken Supabase-backed join flow) ──
create table if not exists participants (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null unique,
  intention text,
  source text not null default 'join',
  created_at timestamptz not null default now()
);
