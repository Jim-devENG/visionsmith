-- VisionSmith core schema. Applied once via scripts/migrate.ts against DATABASE_URL.

create extension if not exists pgcrypto;

-- ── Admins ──────────────────────────────────────────────
create table if not exists admins (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  password_hash text not null,
  created_at timestamptz not null default now(),
  failed_attempts integer not null default 0,
  locked_until timestamptz
);
alter table admins add column if not exists failed_attempts integer not null default 0;
alter table admins add column if not exists locked_until timestamptz;

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
  custom_questions jsonb not null default '[]',
  flyer_url text,
  redirect_label text,
  redirect_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists events_status_date_idx on events (status, event_date desc);
alter table events add column if not exists custom_questions jsonb not null default '[]';
alter table events add column if not exists flyer_url text;
alter table events add column if not exists redirect_label text;
alter table events add column if not exists redirect_url text;

-- ── Event registrations ─────────────────────────────────
create table if not exists event_registrations (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references events(id) on delete cascade,
  full_name text not null,
  email text not null,
  note text,
  custom_answers jsonb not null default '{}',
  created_at timestamptz not null default now(),
  unique (event_id, email)
);
create index if not exists event_registrations_event_idx on event_registrations (event_id);
alter table event_registrations add column if not exists custom_answers jsonb not null default '{}';

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
  source text not null default 'manual' check (source in ('manual', 'substack')),
  substack_guid text unique,
  substack_url text,
  author text,
  reading_time_minutes integer,
  tags jsonb not null default '[]',
  category text,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists blog_posts_published_idx on blog_posts (is_published, published_at desc);
alter table blog_posts add column if not exists source text not null default 'manual';
alter table blog_posts add column if not exists substack_guid text unique;
alter table blog_posts add column if not exists substack_url text;
alter table blog_posts add column if not exists author text;
alter table blog_posts add column if not exists reading_time_minutes integer;
alter table blog_posts add column if not exists tags jsonb not null default '[]';
alter table blog_posts add column if not exists category text;
alter table blog_posts add column if not exists seo_title text;
alter table blog_posts add column if not exists seo_description text;

-- ── Blog sync (Substack RSS import) ─────────────────────
create table if not exists blog_sync_settings (
  id integer primary key default 1 check (id = 1),
  provider text not null default 'substack',
  rss_feed_url text,
  auto_sync_enabled boolean not null default true,
  last_synced_at timestamptz,
  last_sync_status text not null default 'never' check (last_sync_status in ('never', 'success', 'error')),
  last_sync_error text,
  last_sync_imported_count integer not null default 0,
  last_sync_updated_count integer not null default 0,
  updated_at timestamptz not null default now()
);
insert into blog_sync_settings (id) values (1) on conflict (id) do nothing;

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

-- ── Site settings (single row) ──────────────────────────
create table if not exists site_settings (
  id integer primary key default 1 check (id = 1),
  contact_email text not null default 'entry@visionsmith.world',
  updated_at timestamptz not null default now()
);
insert into site_settings (id) values (1) on conflict (id) do nothing;

-- ── Strategic session (single private campaign page, not a listed entity) ──
create table if not exists strategic_sessions (
  id integer primary key default 1 check (id = 1),
  slug text not null unique default 'strategic-architecture-session',
  status text not null default 'draft' check (status in ('draft', 'open', 'closed')),
  hero_title text not null default 'Strategic Architecture Session',
  hero_subtitle text not null default 'Transform complexity into clarity.',
  hero_description text not null default 'A private one-on-one strategic thinking session for builders navigating complexity.',
  hero_image_url text,
  host_name text not null default 'Jimmydebillionaire',
  host_title text not null default 'Strategic Architect',
  session_start_date date,
  max_slots integer not null default 10,
  price_label text not null default 'Free',
  cta_label text not null default 'Request My Session',
  benefits jsonb not null default '["Greater clarity", "A strategic roadmap", "Prioritised next steps", "Better decision-making", "A practical execution plan", "Clearer thinking"]',
  target_audience jsonb not null default '["Have an idea but no clear direction", "Are overwhelmed by too many possibilities", "Are building a business", "Are launching a ministry", "Are creating a product", "Are growing a personal brand", "Are navigating a career transition", "Need strategic clarity before taking action"]',
  success_heading text not null default 'Your Request Has Been Received',
  success_message text not null default 'Thank you for taking the time to complete your application. Every request is reviewed carefully because each session is intentionally limited. If selected, you''ll receive an email with the next steps.',
  seo_title text,
  seo_description text,
  updated_at timestamptz not null default now()
);
insert into strategic_sessions (id) values (1) on conflict (id) do nothing;

create table if not exists strategic_session_applications (
  id uuid primary key default gen_random_uuid(),
  session_id integer not null references strategic_sessions(id) on delete cascade,
  full_name text not null,
  email text not null,
  whatsapp text not null,
  country text not null,
  linkedin text,
  category text not null,
  building_description text not null,
  biggest_challenge text not null,
  situation text not null,
  one_thing text not null,
  why_stuck text not null,
  success_outcome text not null,
  commitment text not null,
  why_selected text not null,
  status text not null default 'new' check (status in ('new', 'reviewed', 'selected', 'declined')),
  created_at timestamptz not null default now()
);
create index if not exists strategic_session_applications_created_idx on strategic_session_applications (created_at desc);

-- ── Participants (replaces the broken Supabase-backed join flow) ──
create table if not exists participants (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null unique,
  intention text,
  source text not null default 'join',
  created_at timestamptz not null default now()
);

-- ── Rate limiting (login attempts, public form spam) ────
create table if not exists rate_limit_hits (
  id bigserial primary key,
  bucket text not null,
  created_at timestamptz not null default now()
);
create index if not exists rate_limit_hits_bucket_idx on rate_limit_hits (bucket, created_at);
