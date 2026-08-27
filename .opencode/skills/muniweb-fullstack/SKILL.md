---
name: muniweb-fullstack
description: Activate when the user wants to work on BOTH the muniweb_front (React/Vite frontend) and muniweb_back (Django/DRF backend) repositories together, or says things like "trabaja con ambos repos", "trabajo fullstack muniweb", "necesito el front y el back", "ambos proyectos muniweb". Loads context for both repos in a single session so the user doesn't need to paste paths manually.
---

# Muniweb Fullstack Skill

Activates when the user is working on **both** the frontend (`muniweb_front`) and backend (`muniweb_back`) of the Muniweb Maynas municipal portal.

When activated, this skill loads the absolute paths, the tech stack of each repo, how they communicate, and the most common cross-cutting commands so you can immediately work across both without asking for paths.

## Repository paths

- **Frontend:** `/home/mauri12/projects/muniweb_front`
- **Backend:** `/home/mauri12/projects/muniweb_back`

Always use these absolute paths. Do NOT ask the user for them when this skill is active.

## Project context

**Muniweb Maynas** is the municipal web portal for the Municipalidad Provincial de Maynas (Iquitos, Peru). It has a public-facing site with news, events, slider, testimonials, innovation, blog and an admin panel for managing all of that.

### Frontend (`muniweb_front`)

- **Stack:** React 18.3.1 + Vite 5.4 + TailwindCSS 3.4 + react-slick (slider) + chart.js + leaflet (geovisor) + react-quill (news/blog editor) + axios + react-router-dom 6.26
- **Package manager:** pnpm (see `pnpm-lock.yaml`)
- **Dev server:** `pnpm run dev` → `http://localhost:5173`
- **Build:** `pnpm run build` → `dist/`
- **Lint:** `pnpm run lint` (eslint 9.x)
- **Entry:** `src/main.jsx` → `src/App.jsx` → routes in `src/routes.jsx`
- **Pages:** `src/pages/*.jsx` (Home, Noticias, Blog, Innovation, Login, Dashboard, Ciudad, Compromiso, Geovisor, Forociudadano, Testimonios, Vistauno)
- **Components:** organized in `src/components/<domain>/` (admin, blog, header, home, Innovacion, noticias, administrable, css, etc.)
- **Services:** `src/services/<entity>Service.js` — all use `VITE_API_URL` from env
- **Env files:** `.env.development` (`VITE_API_URL=http://127.0.0.1:8000/`), `.env.production` (`VITE_API_URL=https://api.muniweb.munimaynas.gob.pe/`)
- **Media images are referenced via `mediaUrl(path)` helper** exported from each service (builds absolute URL from backend)

### Backend (`muniweb_back`)

- **Stack:** Django 5.2.15 + Django REST Framework 3.17.1 + SimpleJWT 5.5.1 + django-cors-headers + SQLite (default) or MySQL via env vars + gunicorn for prod
- **Python:** 3.12 (use the local venv: `/home/mauri12/projects/muniweb_back/venv/bin/python`)
- **Django entry:** `muniweb_backend/` with `settings.py`, `urls.py`, `models.py`, `views.py`, `serializers.py`
- **DB:** SQLite at `db.sqlite3` (default for local dev), MySQL via `DB_ENGINE=mysql` env vars
- **Dev server:** `cd muniweb_back && ../venv/bin/python manage.py runserver` → `http://127.0.0.1:8000`
- **Migrations:** `../venv/bin/python manage.py makemigrations && ../venv/bin/python manage.py migrate`
- **Django admin:** `http://127.0.0.1:8000/admin/`
- **Check:** `../venv/bin/python manage.py check`
- **Shell:** `../venv/bin/python manage.py shell`
- **Static files:** served at `/static/`; uploaded media at `/media/` (only in DEBUG; production uses nginx)
- **Env files:** `.env` (gitignored) + `.env.example` template

## How they communicate

- Frontend talks to backend via axios/fetch using `VITE_API_URL` + REST endpoints
- CORS: backend whitelist allows `http://localhost:5173`, `http://localhost:5174`, `http://127.0.0.1:5174`
- Auth: JWT via SimpleJWT (login at `/login/` returns access + refresh tokens; `/token/refresh/` for renewal)
- Images: backend stores files in `MEDIA_ROOT` (`/home/mauri12/projects/muniweb_back/media/{images,news,innovation}/`) as `FileField`; frontend accesses via `mediaUrl(path)` helper

## Common cross-cutting workflows

### Start both dev servers
```bash
# Terminal 1 (backend)
cd /home/mauri12/projects/muniweb_back
./venv/bin/python manage.py runserver

# Terminal 2 (frontend)
cd /home/mauri12/projects/muniweb_front
pnpm run dev
```

### After backend model changes
```bash
cd /home/mauri12/projects/muniweb_back
./venv/bin/python manage.py makemigrations
./venv/bin/python manage.py migrate
```

### Add a new API endpoint
1. Add view in `muniweb_backend/views.py`
2. Register URL in `muniweb_backend/urls.py`
3. If it accepts files: add `@parser_classes([MultiPartParser, FormParser, JSONParser])`
4. Test with curl: `curl http://127.0.0.1:8000/<endpoint>`
5. Add/extend service in `muniweb_front/src/services/<entity>Service.js` exporting `mediaUrl` helper
6. Use `mediaUrl(path)` in components for image src, never base64

### Add a new admin section
1. Create component in `src/components/administrable/<area>/<Component>.jsx`
2. Register in `src/pages/Dashboard.jsx` `menuData` array
3. Add backend CRUD if needed (or reuse existing endpoints)

## Key endpoints (backend)

- `/admin/` — Django admin (user: `mauri`, password: `admin123`)
- `/login/` — JWT login
- `/api/news/`, `/api/news/<id>/` — News
- `/api/blogs/`, `/api/blogs/<id>/` — Blogs
- `/api/innovations/`, `/api/innovations/<id>/` — Innovation
- `/api/testimonios/` — Active testimonies
- `/carrousel-images` (GET/POST/PUT/DELETE) — Carrusel
- `/modal-images` (GET/POST/PUT/DELETE) — Modal de Inicio
- `/event-images` — Eventos
- `/commitments/`, `/commitments_value/` — Compromisos
- `/usuarios/` — Usuarios
- `/media/<path>` — uploaded media (only DEBUG)

## Image upload rules

- All image fields are now `FileField` (no more base64 in DB)
- Frontend uploads via `FormData` with `File` object (never base64 strings)
- Services guard with `instanceof File` before appending to FormData
- When editing without uploading a new file, the field is `null` in FormData so backend keeps the previous image
- Recommended slider image: **1920×720 px** (ratio 2.67:1), max 3 MB, max dims 2560×1080

## Session context

When this skill is active, the user expects you to:
- Read/edit files across BOTH repos without asking "which project are we in?"
- Run Django commands using the local venv directly (no need to specify full path each time)
- Run frontend commands via `pnpm` from the frontend root
- Coordinate changes: if a backend field changes, update the frontend service/component in the same session
- Reference `docs/sessions/SESSION_SLIDER.md` (front) / `docs/sessions/` (back) and CHANGELOG.md in both repos for historical context

## Quick verification commands

```bash
# Backend OK?
/home/mauri12/projects/muniweb_back/venv/bin/python /home/mauri12/projects/muniweb_back/manage.py check

# Frontend builds OK?
cd /home/mauri12/projects/muniweb_front && pnpm run build

# Lint OK?
cd /home/mauri12/projects/muniweb_front && pnpm run lint

# Backend running?
curl -s http://127.0.0.1:8000/carrousel-images | head -c 100

# Frontend running?
curl -s -o /dev/null -w "%{http_code}" http://localhost:5173
```
