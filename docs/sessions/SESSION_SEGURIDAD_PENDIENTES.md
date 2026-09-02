# SESSION_SEGURIDAD_PENDIENTES.md — Estado de la seguridad y pendientes (cargar en contexto)

> **Documento de estado** de la auditoría de seguridad multi-repo. Autocontenido: cargar este archivo en contexto para retomar el trabajo sin releer las sesiones completas.
> Fecha de última actualización: **2026-09-02**.
> Fuentes: `muniweb_back/docs/sessions/SESSION_SEGURIDAD.md` (auditorías + plan + ejecución §9) · este repo `docs/sessions/SESSION_SEGURIDAD_DEPS.md` (detalle del Bloque A).

---

## 1. Estado general

| Fase | Hallazgos | Estado |
|---|---|---|
| 1 — JWT en toda la API (default `IsAuthenticated` + `AllowAny` en GETs públicos de landing, `/usuarios/` privado, throttle login 10/min) | C1, C2, C4 | ✅ EJECUTADA 2026-08-24 |
| B — Quick wins backend (login genérico A1, SECRET_KEY fail-fast A2, email unique M5, logout con blacklist M4, prints M3, updates pip) | A1, A2, M3, M4, M5 | ✅ EJECUTADO 2026-09-02 (17 tests OK en back) |
| **A — Vulnerabilidades npm frontend** | A5 (1 crítica + 42 altas) | ✅ EJECUTADO (verificado 2026-09-02: `pnpm audit` → 0 críticas/altas) |
| 2 — Sanitización XSS | C3 | ✅ EJECUTADO 2026-09-02 (nh3 en `save()` back + DOMPurify en 7 archivos front; 23 tests OK) |
| 3 — Validación de uploads | A3 | ✅ EJECUTADO 2026-09-02 (validador nh3-imagen en back + pre-check en front; 33 tests OK) |
| 6 — Headers de producción + CORS/CSRF prod | M1, M2 | ❌ Pendiente (requiere confirmar dominio prod) |
| 5 restante — Credenciales en docs | C5 | ❌ Pendiente |
| 10 — Roles por `rol_int_id` | — | ❌ Pendiente (negocio lo defina) |

---

## 2. BLOQUE A — EJECUTADO (este repo)

Detalle operativo en `SESSION_SEGURIDAD_DEPS.md`. Estado verificado 2026-09-02 contra `package.json` + `pnpm audit`:

| # | Acción | Estado |
|---|---|---|
| A1 | `pnpm remove` de 15 deps **sin uso** (swiper, jquery, datatables.net*, slate*, @mui/material, @emotion/*, react-data-table-component, chart.js, react-chartjs-2, ckeditor5-react) | ✅ fuera de `package.json`; crítica de swiper muerta |
| A2 | `react-router-dom` → `^7.18` | ✅ `^7.18.2` |
| A3 | `axios` → `^1.20`, `vite` → `^6` | ✅ `^1.20.0` / `^6.4.3` |
| A4 | `pnpm update` + `pnpm.overrides` para transitivas | ⚠️ overrides NO aplicados, pero ya no hacen falta: audit limpio de lodash/form-data |
| A5 | Verificación | ✅ `pnpm audit`: **0 críticas, 0 altas**, quedan **3 moderadas**: `ckeditor5` (GHSA-jrqm-vmqc-gm93, vía `@ckeditor/ckeditor5-build-classic` 35.3.0 → fixed en >=47.6.0) y `yaml` (vía tailwindcss>postcss-load-config → fixed en >=2.8.3) |

### Residuo opcional (moderadas)
1. Subir `@ckeditor/ckeditor5-build-classic` (+5.x→nuevo `@ckeditor/ckeditor5-react`) para cerrar GHSA-jrqm-vmqc-gm93 — es cambio mayor (v35→v47), evaluar si vale la pena ahora que el login está protegido.
2. `yaml` es dev-only (build time, no afecta al bundle de producción) — ignorable o `pnpm.overrides`.

### Riesgos ya cubiertos
- `logout()` de `src/api/api.js` quedó **async** (llama `POST /logout/` back antes de limpiar) — verificado en build; probar el flujo real en dashboard.

---

## 3. FASE 2: XSS (C3) — EJECUTADA 2026-09-02 (doble capa front + back)

- **Back**: `muniweb_backend/sanitize.py` (nh3 0.3.7, en requirements.txt) con allow-list de etiquetas/atributos que usan Quill/CKEditor; se aplica en `save()` de `News` (`new_txt_content` + `new_txt_description`), `Innovation` (`inn_txt_description`) e `Image` (`ima_txt_description` — eventos/carrusel/modal). Cubre API, Django admin y shell. `javascript:`/`data:`/`<script>`/`<iframe>`/event handlers eliminados; `target=_blank` fuerza `rel=noopener noreferrer`.
- **Front**: `src/utils/sanitize.js` exporta `sanitizeHtml()` (DOMPurify) aplicada en los 7 `dangerouslySetInnerHTML`: `NewsInfo.jsx`, `Home.jsx`, `BlogInfo.jsx`, `NewsList.jsx`, `EventosInfo.jsx`, `InnovationInfo.jsx`, `NewsAdmin.jsx`.
- **Tests**: +6 en back (`XssSanitizationTests`) → **23 OK**. Build front OK; lint sin errores nuevos.
- ⚠️ **Pendiente de decisión**: los registros YA guardados en BD conservan su HTML crudo (la sanitización corre al grabar, no retroactivamente). Opción: script de migración de datos que re-guardie los registros existentes, o confiar en la capa DOMPurify del front para el contenido viejo. Se recomienda correr el re-save una vez en prod.
- **Siguiente paso ahora**: Fase 3 (uploads, §4).

## 4. FASE 3: uploads (A3) — EJECUTADA 2026-09-02

- **Back** (`muniweb_backend/validators.py`, nuevo): `validate_image_file()` en los 3 `FileField` (`Image.ima_txt_urlpath`, `News.new_txt_urlimage`, `Innovation.inn_txt_image`) + `NewsSerializer` (campo explícito). Cuatro checks: extensión allow-list (jpg/jpeg/png/gif/webp — **no svg**), content-type coherente, **magic bytes** (rechaza polyglotos: `.png` con HTML dentro), tamaño ≤5 MB. Migración `0008` (solo estado, sin cambio de esquema) aplicada en dev.
- **Front**: `src/utils/validateImage.js` (nuevo) con `pickValidImageFile(e)` — valida extensión/tipo/tamaño antes de subir, alerta y limpia el input si no. Conectado en los **18** inputs `type="file"` de 14 componentes (Blog, Innovation, NewsList, NewsInfo, NewsAdmin, BlogInfo, InnovationInfo, CarruselImages, Modal1, EventosAdmin, Add/EditImageModal, Add/EditEventImageModal).
- **Tests back**: +10 (`UploadValidationTests`, incl. rechazo API de `.html`, `.svg`, polygloto `.png`+HTML y content-type mismatch) → **33 OK**.
- ⚠️ Prod: aplicar migración `0008` (no bloquea; solo registra validators en estado de modelos). Archivos YA subidos a `/media/` no se tocan — limpieza manual si se sospecha de alguno (la fase 1 ya exige auth para escribir).
- **Siguiente paso ahora**: Fase 6 (§5, requiere confirmar dominio prod) y C5 (§6).

## 5. PENDIENTE — Fase 6: endurecimiento de producción (back, requiere datos del usuario)

- `SECURE_HSTS_SECONDS`, `SECURE_SSL_REDIRECT`, `SESSION_COOKIE_SECURE`, `CSRF_COOKIE_SECURE` (hoy nada en `settings.py`).
- `CORS_ORIGIN_WHITELIST`: falta `https://muniweb.munimaynas.gob.pe` (front prod) — **confirmar dominio exacto con el usuario**. `CORS_ALLOW_CREDENTIALS=True` es innecesario con JWT Bearer → quitar.
- **Deploy prod pendiente (back §9)**: en el VPS hace falta `DJANGO_SECRET_KEY` en el entorno (ahora es FAIL-FAST: sin ella y `DEBUG=False`, el proyecto no arranca), aplicar migraciones `0007` (email unique — **verificar duplicados en MySQL antes**: `SELECT use_txt_email, COUNT(*) FROM muniweb_users GROUP BY use_txt_email HAVING COUNT(*)>1`) y las de `token_blacklist`.

## 6. PENDIENTE — C5: credenciales documentadas

`mauri/admin123` (Django admin) y `admin@muniweb.local/admin123`: cambiar en BD y purgar de `muniweb_back/doc(s)/session.md` y del skill `muniweb_front/.opencode/skills/muniweb-fullstack/SKILL.md`.

---

## 7. Contexto técnico que conviene recordar

- **Contratos que NO se pueden romper**: GETs legados de contenido devuelven STRING JSON (`JSON.parse(response.data)` en el front); login responde `{access, refresh, success, user.id}`; refresh `/token/refresh/` `{refresh}` → `{access}`. El front usa cliente `apiClient` (`src/api/api.js`) con `{ requiresAuth: true }` en escrituras; tokens en localStorage (`accessToken`/`refreshToken`); interceptor renueva en 401.
- **Back**: User custom (`muniweb_users`, PK `use_int_id`) — por eso existen `CustomJWTAuthentication`, `CustomTokenObtainPairSerializer`, `CustomTokenRefreshSerializer` y `CustomTokenBlacklistView`. Login genérico: siempre `"Credenciales incorrectas."`; INACTIVO solo se revela tras contraseña válida. `POST /logout/` exige access token y blacklista el refresh (sin rotación de refresh a propósito).
- Tests back: `./venv/bin/python manage.py test muniweb_backend` → **17 OK**. Cualquier cambio en auth debe mantener verdes esos tests.
- Historial: auditorías §2 y §7 del doc del back; ejecución Bloque B documentada en §9 y en `muniweb_back/docs/CHANGELOG.md`.
