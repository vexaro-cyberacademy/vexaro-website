# VEXARO Cyber Academy — Static Website Starter

A responsive, animated, dark-cinematic website based on the supplied VEXARO visual references.

## Included
- Home, About, Academy, Events, Community, Resources and Contact sections
- Responsive desktop/tablet/mobile navigation
- Electric-blue visual system, animated ambient lighting, ticker, orbital hero, reveal-on-scroll motion
- Supplied VEXARO artwork optimised to WebP in `assets/`
- Frontend preview interfaces for registration/login and learning progress
- Course cards, webinar interest interaction, resource links and contact form scaffold

## Important functionality note
This is a **static frontend starter**. The login/register UI is a non-persistent preview and does not create accounts. The progress dashboard is illustrative. CTF, certificates, instructor tools, secure authentication, saved course progress and actual form submission require a backend. Do not collect real passwords or student data until authentication and database services have been configured and tested.

## Deploy to Cloudflare Pages
1. Upload the contents of this folder to the root of your GitHub repository `vexaro-website`.
2. In Cloudflare, choose **Workers & Pages → Create application → Pages → Connect to Git**. If the interface shows Workers setup, choose the legacy/Pages workflow.
3. Select `vexaro-website` and production branch `main`.
4. Framework preset: `None`.
5. Build command: leave blank.
6. Build output directory: `/` (the repository root).
7. Deploy. Cloudflare will assign a `*.pages.dev` address.
8. Test all sections on mobile and desktop.

## Local preview
Open `index.html` in a browser, or run a simple local server:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000`.

## Before public launch
- Replace `REPLACE_WITH_VEXARO_CONTACT_EMAIL` in `app.js` with the official monitored contact email.
- Add verified community/social links.
- Review all course descriptions, dates and claims.
- Add a privacy notice and terms before collecting visitor/student information.
- Configure real authentication, database, access policies and server-side validation before activating accounts.

## Suggested next backend phase
Supabase Auth + PostgreSQL + Storage with row-level security. Build student, instructor and admin roles; course/module/lesson tables; enrolments and progress; CTF challenge records; certificate issuance and public verification. Keep privileged service keys server-side only.
