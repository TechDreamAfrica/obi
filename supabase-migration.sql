-- ============================================================
-- Oasis IMG Ministries Ghana — Supabase Database Migration
-- Run in: Supabase Dashboard → SQL Editor → New query → Run
-- Safe to re-run: uses IF NOT EXISTS + DROP POLICY IF EXISTS
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─────────────────────────────────────────────────────────────
-- 1. GALLERY
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.gallery (
    id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    title       TEXT        NOT NULL DEFAULT '',
    category    TEXT,
    image_url   TEXT,
    description TEXT,
    source      TEXT,                          -- 'cloudinary' | 'google-drive' | 'external'
    upload_date TIMESTAMPTZ DEFAULT NOW(),
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────
-- 2. MINISTRIES
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.ministries (
    id               UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
    title            TEXT    NOT NULL DEFAULT '',
    description      TEXT,
    icon             TEXT,
    image_url        TEXT,
    leader           TEXT,
    full_description TEXT,
    meeting_time     TEXT,
    sort_order       INTEGER DEFAULT 0,
    created_at       TIMESTAMPTZ DEFAULT NOW(),
    updated_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────
-- 3. LEADERSHIP
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.leadership (
    id         UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
    name       TEXT    NOT NULL DEFAULT '',
    title      TEXT,
    position   TEXT,
    category   TEXT    DEFAULT 'ministry',    -- 'senior' | 'board' | 'ministry'
    bio        TEXT,
    image      TEXT,
    image_url  TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────
-- 4. NEWS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.news (
    id           UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
    title        TEXT    NOT NULL DEFAULT '',
    category     TEXT    DEFAULT 'General',
    author       TEXT    DEFAULT 'Admin',
    image        TEXT,
    excerpt      TEXT,
    content      TEXT,
    published    BOOLEAN DEFAULT TRUE,
    published_at TIMESTAMPTZ DEFAULT NOW(),
    created_at   TIMESTAMPTZ DEFAULT NOW(),
    updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────
-- 5. EVENTS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.events (
    id                    UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
    title                 TEXT    NOT NULL DEFAULT '',
    category              TEXT,
    location              TEXT,
    date                  DATE,
    time                  TEXT,
    description           TEXT,
    image                 TEXT,
    image_url             TEXT,
    speaker               TEXT,
    capacity              INTEGER,
    featured              BOOLEAN DEFAULT FALSE,
    registration_required BOOLEAN DEFAULT FALSE,
    created_at            TIMESTAMPTZ DEFAULT NOW(),
    updated_at            TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────
-- 6. STATISTICS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.statistics (
    id               UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
    lives_impacted   INTEGER DEFAULT 0,
    ministries       INTEGER DEFAULT 0,
    students_trained INTEGER DEFAULT 0,
    years_of_service INTEGER DEFAULT 0,
    updated_at       TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO public.statistics (lives_impacted, ministries, students_trained, years_of_service)
VALUES (1000, 5, 200, 15)
ON CONFLICT DO NOTHING;

-- ─────────────────────────────────────────────────────────────
-- 7. COURSES
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.courses (
    id               UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
    title            TEXT    NOT NULL DEFAULT '',
    code             TEXT,
    type             TEXT,                     -- Diploma | Certificate | Short Course | Ministry Training
    duration         TEXT,
    description      TEXT,
    fee              NUMERIC(10,2),
    credits          INTEGER,
    requirements     TEXT,
    subjects         TEXT,
    start_date       DATE,
    deadline         DATE,
    image_url        TEXT,
    active           BOOLEAN DEFAULT TRUE,
    enrollment_open  BOOLEAN DEFAULT TRUE,
    program          TEXT,
    instructor       TEXT,
    sort_order       INTEGER DEFAULT 0,
    created_at       TIMESTAMPTZ DEFAULT NOW(),
    updated_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────
-- 8. STUDENTS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.students (
    id              UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id      TEXT    UNIQUE,
    full_name       TEXT    NOT NULL DEFAULT '',
    email           TEXT,
    phone           TEXT,
    dob             DATE,
    gender          TEXT,
    program         TEXT,
    enrollment_date DATE,
    status          TEXT    DEFAULT 'active',  -- active | inactive | graduated
    church          TEXT,
    address         TEXT,
    notes           TEXT,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────
-- 9. CONTACTS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.contacts (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name       TEXT,
    email      TEXT,
    phone      TEXT,
    subject    TEXT,
    message    TEXT,
    status     TEXT DEFAULT 'unread',          -- unread | read
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────
-- 10. CREDENTIALS  (ministry credential applications)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.credentials (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name  TEXT,
    email      TEXT,
    phone      TEXT,
    status     TEXT DEFAULT 'pending',
    data       JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────
-- 11. SPONSORS  (sponsorship applications)
-- ─────────────────────────────────────────────────────────────
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

-- ─────────────────────────────────────────────────────────────
-- 12. ADMISSIONS  (root admissions.html form)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.admissions (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name  TEXT,
    email      TEXT,
    phone      TEXT,
    status     TEXT DEFAULT 'pending',
    data       JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────
-- 13. OBI_APPLICATIONS  (Oasis Bible Institute applications)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.obi_applications (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name            TEXT,
    email           TEXT,
    phone           TEXT,
    address         TEXT,
    city            TEXT,
    region          TEXT,
    dob             DATE,
    gender          TEXT,
    age             INTEGER,
    marital_status  TEXT,
    church          TEXT,
    qualification   TEXT,
    institution     TEXT,
    year            TEXT,
    experience      TEXT,
    position        TEXT,
    statement       TEXT,
    saved           TEXT,
    baptized        TEXT,
    holy_spirit     TEXT,
    ministry        TEXT,
    status          TEXT DEFAULT 'pending',    -- pending | admitted | approved | rejected
    data            JSONB DEFAULT '{}',
    submitted_at    TIMESTAMPTZ DEFAULT NOW(),
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────
-- 14. ADMIN_USERS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.admin_users (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_id      UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    email        TEXT NOT NULL,
    display_name TEXT,
    role         TEXT NOT NULL DEFAULT 'admin',
    active       BOOLEAN DEFAULT TRUE,
    created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────
-- 15. USERS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.users (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_id    UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    name       TEXT,
    email      TEXT,
    role       TEXT DEFAULT 'user',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────
-- 16. SITE_SETTINGS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.site_settings (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key        TEXT UNIQUE NOT NULL,
    value      JSONB,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

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

-- ─────────────────────────────────────────────────────────────
-- 17. SITE_IMAGES
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.site_images (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        TEXT NOT NULL,
    url         TEXT NOT NULL,
    description TEXT,
    uploaded_at TIMESTAMPTZ DEFAULT NOW(),
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────
-- 18. MINISTRY_SUPPORT  (ministry support / volunteer expressions)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.ministry_support (
    id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    ministry_id   UUID        REFERENCES public.ministries(id) ON DELETE SET NULL,
    ministry_name TEXT,
    full_name     TEXT        NOT NULL,
    email         TEXT        NOT NULL,
    phone         TEXT,
    support_type  TEXT        DEFAULT 'volunteer',  -- volunteer | prayer | financial | other
    message       TEXT,
    status        TEXT        DEFAULT 'pending',    -- pending | reviewed | contacted
    created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ═════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY
-- ═════════════════════════════════════════════════════════════

ALTER TABLE public.gallery          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ministries       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leadership       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.statistics       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credentials      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sponsors         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admissions       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.obi_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_images      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ministry_support ENABLE ROW LEVEL SECURITY;

-- ── Drop existing policies (makes script safe to re-run) ─────
DROP POLICY IF EXISTS "Public read gallery"              ON public.gallery;
DROP POLICY IF EXISTS "Public read ministries"           ON public.ministries;
DROP POLICY IF EXISTS "Public read leadership"           ON public.leadership;
DROP POLICY IF EXISTS "Public read news"                 ON public.news;
DROP POLICY IF EXISTS "Public read events"               ON public.events;
DROP POLICY IF EXISTS "Public read statistics"           ON public.statistics;
DROP POLICY IF EXISTS "Public read courses"              ON public.courses;
DROP POLICY IF EXISTS "Public read site_settings"        ON public.site_settings;
DROP POLICY IF EXISTS "Public read site_images"          ON public.site_images;
DROP POLICY IF EXISTS "Public insert contacts"           ON public.contacts;
DROP POLICY IF EXISTS "Public insert credentials"        ON public.credentials;
DROP POLICY IF EXISTS "Public insert sponsors"           ON public.sponsors;
DROP POLICY IF EXISTS "Public insert admissions"         ON public.admissions;
DROP POLICY IF EXISTS "Public insert obi_apps"           ON public.obi_applications;
DROP POLICY IF EXISTS "Admin full access gallery"        ON public.gallery;
DROP POLICY IF EXISTS "Admin full access ministries"     ON public.ministries;
DROP POLICY IF EXISTS "Admin full access leadership"     ON public.leadership;
DROP POLICY IF EXISTS "Admin full access news"           ON public.news;
DROP POLICY IF EXISTS "Admin full access events"         ON public.events;
DROP POLICY IF EXISTS "Admin full access statistics"     ON public.statistics;
DROP POLICY IF EXISTS "Admin full access courses"        ON public.courses;
DROP POLICY IF EXISTS "Admin full access contacts"       ON public.contacts;
DROP POLICY IF EXISTS "Admin full access credentials"    ON public.credentials;
DROP POLICY IF EXISTS "Admin full access sponsors"       ON public.sponsors;
DROP POLICY IF EXISTS "Admin full access admissions"     ON public.admissions;
DROP POLICY IF EXISTS "Admin full access obi_apps"       ON public.obi_applications;
DROP POLICY IF EXISTS "Admin full access students"       ON public.students;
DROP POLICY IF EXISTS "Admin full access admin_users"    ON public.admin_users;
DROP POLICY IF EXISTS "Admin full access users"          ON public.users;
DROP POLICY IF EXISTS "Admin full access site_settings"  ON public.site_settings;
DROP POLICY IF EXISTS "Admin full access site_images"    ON public.site_images;
DROP POLICY IF EXISTS "Public insert ministry_support"   ON public.ministry_support;
DROP POLICY IF EXISTS "Admin full access ministry_support" ON public.ministry_support;

-- ── Public read on content tables ────────────────────────────
CREATE POLICY "Public read gallery"       ON public.gallery       FOR SELECT USING (true);
CREATE POLICY "Public read ministries"    ON public.ministries    FOR SELECT USING (true);
CREATE POLICY "Public read leadership"    ON public.leadership    FOR SELECT USING (true);
CREATE POLICY "Public read news"          ON public.news          FOR SELECT USING (published = true);
CREATE POLICY "Public read events"        ON public.events        FOR SELECT USING (true);
CREATE POLICY "Public read statistics"    ON public.statistics    FOR SELECT USING (true);
CREATE POLICY "Public read courses"       ON public.courses       FOR SELECT USING (active = true);
CREATE POLICY "Public read site_settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Public read site_images"   ON public.site_images   FOR SELECT USING (true);

-- ── Public insert on form tables (anonymous visitors) ────────
CREATE POLICY "Public insert contacts"    ON public.contacts        FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert credentials" ON public.credentials      FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert sponsors"    ON public.sponsors         FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert admissions"  ON public.admissions       FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert obi_apps"    ON public.obi_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert ministry_support" ON public.ministry_support FOR INSERT WITH CHECK (true);

-- ── Authenticated users (admins) get full CRUD ───────────────
CREATE POLICY "Admin full access gallery"       ON public.gallery       FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access ministries"    ON public.ministries    FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access leadership"    ON public.leadership    FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access news"          ON public.news          FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access events"        ON public.events        FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access statistics"    ON public.statistics    FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access courses"       ON public.courses       FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access contacts"      ON public.contacts      FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access credentials"   ON public.credentials   FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access sponsors"      ON public.sponsors      FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access admissions"    ON public.admissions    FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access obi_apps"      ON public.obi_applications FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access students"      ON public.students      FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access admin_users"   ON public.admin_users   FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access users"         ON public.users         FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access site_settings" ON public.site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access site_images"   ON public.site_images   FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access ministry_support" ON public.ministry_support FOR ALL TO authenticated USING (true) WITH CHECK (true);