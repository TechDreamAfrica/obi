# Oasis IMG Ministries Ghana Website

A modern, responsive website for Oasis IMG Ministries Ghana built with HTML5, Tailwind CSS, and Vanilla JavaScript — backed by **Supabase** (PostgreSQL + Auth).

## Features

### Main Website
- **Home Page**: Hero carousel, statistics counter, ministry highlights, leadership preview
- **About Us**: Mission, vision, core values, beliefs, and history
- **Admissions**: Program information, requirements, application process
- **Credential Application**: Form for ministry credential applications
- **Sponsor a Student**: Sponsorship tiers and donation forms
- **Ministries**: Complete ministry directory with detail pages
- **Leadership**: Team profiles and organisational structure
- **Contact**: Contact form with Google Maps integration
- **Gallery**: Photo gallery

### Oasis Bible Institute (OBI)
- OBI Home, Admissions, Events, News, News Detail pages

### Admin Dashboard
- Supabase Auth (Email/Password login)
- Manage: Admissions, Students, Courses, Events, News, Contacts, Gallery, Leadership, Ministries, Site Images

## Tech Stack

- **Frontend**: HTML5, Tailwind CSS v3
- **JavaScript**: Vanilla ES6 modules
- **Backend**: Supabase (PostgreSQL + Row Level Security + Auth)
- **Icons**: Font Awesome 6.4.0

## Setup

### 1. Supabase Configuration

Open `assets/js/supabase-config.js` and fill in your project values:

```js
const SUPABASE_URL      = 'https://YOUR_PROJECT.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY';
```

Find these in: Supabase Dashboard → Project Settings → API.

### 2. Database Setup

Run `supabase-migration.sql` once in the Supabase SQL Editor:

1. Supabase Dashboard → SQL Editor → New query
2. Paste the entire file contents
3. Click Run

This creates all 18 tables with RLS policies (public read on content, authenticated full access for admins).

### 3. Create Admin User

Supabase Dashboard → Authentication → Users → Invite user, then login at `/dashboard/login.html`.

### 4. Deploy

```bash
git add .
git commit -m "Deploy"
git push
```

Site is live at the domain in `CNAME`.

## Project Structure

```
oasis-img/
├── index.html
├── about.html
├── admissions.html
├── credential-application.html
├── sponsor-student.html
├── ministries.html / ministry-detail.html
├── leadership.html
├── contact.html / gallery.html
├── supabase-migration.sql      <- run once in Supabase SQL Editor
├── assets/
│   ├── css/style.css
│   ├── js/
│   │   ├── supabase-config.js  <- set URL + anon key here
│   │   ├── main.js
│   │   └── site-images.js
│   └── images/
├── obi/
│   ├── index.html / admissions.html
│   ├── events.html / news.html / news-item.html
└── dashboard/
    ├── login.html / index.html
    ├── admissions.html / students.html / courses.html
    ├── events.html / news.html / contacts.html
    ├── gallery.html / leadership.html / ministries.html
    ├── site-images.html
    └── assets/js/
        ├── supabase-config.js (points to ../../assets/js/supabase-config.js)
        ├── auth-service.js
        ├── data-service.js
        └── dashboard.js
```

## Security

- Supabase Row Level Security on all tables
- Public read for content tables; authenticated write for admins
- Public insert for contact/application form tables