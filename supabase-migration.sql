-- ============================================================
-- Oasis IMG Ministries Ghana — Supabase Database Migration
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor)
-- ============================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─── Content Tables ───────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.gallery (
    id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    title       TEXT        NOT NULL DEFAULT '',
    description TEXT,
    image_url   TEXT,
    category    TEXT,
    upload_date TIMESTAMPTZ DEFAULT NOW(),
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.ministries (
    id          UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
    name        TEXT    NOT NULL,
    description TEXT,
    image       TEXT,
    sort_order  INTEGER DEFAULT 0,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.leadership (
    id          UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
    name        TEXT    NOT NULL,
    title       TEXT,
    position    TEXT,
    bio         TEXT,
    image       TEXT,
    image_url   TEXT,
    category    TEXT,   -- 'senior' | 'board' | 'ministry'
    social      JSONB   DEFAULT '{}',
    sort_order  INTEGER DEFAULT 0,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.news (
    id           UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
    title        TEXT    NOT NULL,
    content      TEXT,
    excerpt      TEXT,
    image        TEXT,
    category     TEXT,
    published    BOOLEAN DEFAULT TRUE,
    published_at TIMESTAMPTZ DEFAULT NOW(),
    created_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.events (
    id          UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
    title       TEXT    NOT NULL,
    description TEXT,
    date        DATE,
    time        TEXT,
    location    TEXT,
    image       TEXT,
    category    TEXT,
    featured    BOOLEAN DEFAULT FALSE,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.statistics (
    id               UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
    lives_impacted   INTEGER DEFAULT 0,
    ministries       INTEGER DEFAULT 0,
    students_trained INTEGER DEFAULT 0,
    years_of_service INTEGER DEFAULT 0,
    updated_at       TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default stats row (update values as needed)
INSERT INTO public.statistics (lives_impacted, ministries, students_trained, years_of_service)
VALUES (1000, 5, 200, 15)
ON CONFLICT DO NOTHING;

CREATE TABLE IF NOT EXISTS public.courses (
    id          UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
    title       TEXT    NOT NULL,
    description TEXT,
    duration    TEXT,
    sort_order  INTEGER DEFAULT 0,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.students (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id      TEXT UNIQUE,
    full_name       TEXT,
    email           TEXT,
    phone           TEXT,
    program         TEXT,
    course_id       UUID REFERENCES public.courses(id) ON DELETE SET NULL,
    status          TEXT DEFAULT 'active',
    enrollment_date DATE,
    notes           TEXT,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Form Submission Tables ───────────────────────────────────

CREATE TABLE IF NOT EXISTS public.contacts (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name       TEXT,
    email      TEXT,
    phone      TEXT,
    subject    TEXT,
    message    TEXT,
    status     TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Credential applications (camelCase form-field names preserved via JSONB)
CREATE TABLE IF NOT EXISTS public.credentials (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name  TEXT,
    email      TEXT,
    phone      TEXT,
    status     TEXT DEFAULT 'pending',
    data       JSONB NOT NULL DEFAULT '{}',  -- full form payload
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sponsorship applications
CREATE TABLE IF NOT EXISTS public.sponsors (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name  TEXT,
    email      TEXT,
    phone      TEXT,
    level      TEXT,
    status     TEXT DEFAULT 'pending',
    data       JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ministry training admissions (admissions.html — root-level page)
CREATE TABLE IF NOT EXISTS public.admissions (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name  TEXT,
    email      TEXT,
    phone      TEXT,
    status     TEXT DEFAULT 'pending',
    data       JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- OBI (Bible Institute) student applications
CREATE TABLE IF NOT EXISTS public.obi_applications (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name         TEXT,
    email        TEXT,
    phone        TEXT,
    status       TEXT DEFAULT 'pending',
    data         JSONB NOT NULL DEFAULT '{}',
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Admin / Auth Tables ─────────────────────────────────────

-- Admin users — links to Supabase Auth users
CREATE TABLE IF NOT EXISTS public.admin_users (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_id      UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    email        TEXT NOT NULL,
    display_name TEXT,
    role         TEXT NOT NULL DEFAULT 'admin',
    active       BOOLEAN DEFAULT TRUE,
    created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- General user profiles
CREATE TABLE IF NOT EXISTS public.users (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_id    UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    name       TEXT,
    email      TEXT,
    role       TEXT DEFAULT 'user',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Site Settings ────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.site_settings (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key        TEXT UNIQUE NOT NULL,
    value      JSONB,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default site images config
INSERT INTO public.site_settings (key, value)
VALUES ('images', '{
    "logo":       "assets/images/logo.jpg",
    "cert":       "assets/images/cert.jpg",
    "students":   "assets/images/students.jpg",
    "building":   "assets/images/building.jpg",
    "class":      "assets/images/class.jpg",
    "leadership": "assets/images/leadership.jpg",
    "abt":        "assets/images/abt.jpg",
    "story":      "assets/images/story.jpg"
}')
ON CONFLICT (key) DO NOTHING;

CREATE TABLE IF NOT EXISTS public.site_images (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        TEXT NOT NULL,
    url         TEXT NOT NULL,
    description TEXT,
    uploaded_at TIMESTAMPTZ DEFAULT NOW(),
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Row Level Security (RLS) ─────────────────────────────────
-- Public read access for content tables; insert for form tables.
-- Admin write access is controlled via Supabase Dashboard or service-role key.

ALTER TABLE public.gallery          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ministries       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leadership       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.statistics       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credentials      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sponsors         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admissions       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.obi_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_images      ENABLE ROW LEVEL SECURITY;

-- Public SELECT on content tables (anyone can read)
CREATE POLICY "Public read gallery"       ON public.gallery       FOR SELECT USING (true);
CREATE POLICY "Public read ministries"    ON public.ministries    FOR SELECT USING (true);
CREATE POLICY "Public read leadership"    ON public.leadership    FOR SELECT USING (true);
CREATE POLICY "Public read news"          ON public.news          FOR SELECT USING (published = true);
CREATE POLICY "Public read events"        ON public.events        FOR SELECT USING (true);
CREATE POLICY "Public read statistics"    ON public.statistics    FOR SELECT USING (true);
CREATE POLICY "Public read courses"       ON public.courses       FOR SELECT USING (true);
CREATE POLICY "Public read site_settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Public read site_images"   ON public.site_images   FOR SELECT USING (true);

-- Public INSERT on form submission tables (anyone can submit a form)
CREATE POLICY "Public insert contacts"    ON public.contacts         FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert credentials" ON public.credentials       FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert sponsors"    ON public.sponsors          FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert admissions"  ON public.admissions        FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert obi_apps"    ON public.obi_applications  FOR INSERT WITH CHECK (true);
