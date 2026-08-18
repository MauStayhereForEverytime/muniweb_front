# Changelog

Todos los cambios notables de este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/),
y este proyecto se adhiere a [Semantic Versioning](https://semver.org/lang/es/).

---

## [Unreleased] — Sesión de migración del VPS

### Added
- Migración del repositorio privado del VPS (`/home/munimaynas/muniweb.munimaynas.gob.pe/muniweb2025/`) al entorno local vía `git archive HEAD`.
- `pnpm-lock.yaml` como único lockfile (decisión: gestor `pnpm`).
- `node_modules/` local con 28 deps + 13 devDeps (`pnpm install --frozen-lockfile`).
- `.env.development` (trackeado) con `VITE_API_URL=http://127.0.0.1:8000/` apuntando al backend local.
- `.env.local` (gitignored) con overrides locales.
- `.env.example` (trackeado) con placeholders para dev y prod comentado.
- `.gitignore` limpio que ignora: `node_modules/`, `dist/`, `dist.zip`, `*.local`, `.env`, `.env.local`, `*.log`, `package-lock.json`, `yarn.lock`.
- `ErrorBoundary` global en `main.jsx` para capturar crashes y mostrarlos en pantalla.
- Logo `logo-maynas-sin-lema.png` copiado desde `/home/munimaynas/sgtd.munimaynas.gob.pe/frontend/sgtd/src/assets/` a `src/assets/img/`.
- Reemplazo del logo principal del Header (URL externa `iqtseg.munimaynas.gob.pe`) por el logo local.

### Changed
- `Carrousel.jsx`, `Eventos.jsx`, `Testimonios.jsx`: agregados guards para no renderizar `react-slick` con array vacío (evita loop infinito).
- `Modal.jsx`: agregada lógica `hasImages` para no mostrar overlay oscuro cuando no hay imágenes en backend.
- `Logos.jsx`: import del logo local (`logoMaynasSinLema`) en lugar de URL externa hardcoded.

### Fixed
- **Extracción incompleta**: pipe SSH + tar se cortaba por timeout después de 117 archivos. Solucionado extrayendo a tar file intermedio en `/tmp/` y luego `tar -x`.
- **Case mismatch en imports**: `git archive` extraía `src/components/innovacion/` (minúscula) pero el filesystem del VPS tiene `Innovacion/`. Renombrar dir manualmente.
- **Import roto en `src/pages/Innovation.jsx`**: importaba `../components/innovacion/InnovationList` (minúscula). Corregido a `Innovacion`.
- **`Carrousel.jsx` pantalla en blanco + "no responde"**: `carrouselService.fetchImages` devolvía `undefined` en error → `setImages(undefined)` → `images.length` crash → render loop. Cambiado a `return []` + `Array.isArray` check.
- **`Testimonios.jsx` pantalla en blanco**: `testimoniosService.js` apuntaba a `http://localhost:4000/api/testimonios` (puerto inexistente) y usaba `throw new Error` en catch. Reescrito a `VITE_API_URL` + `return []`.
- **Login devolvía "Usuario no encontrado"**: el frontend apuntaba a `https://api.muniweb.munimaynas.gob.pe/` (config en `.env.development` original) en lugar del backend local. Causa: orden de precedencia de Vite (`.env.[mode]` > `.env.local`). Fix: editar `.env.development` directamente.
- **Modal overlay oscuro vacío**: Modal abría siempre con `useState(true)` aunque no hubiera imágenes. Ahora `hasImages` decide si mostrar.

### Security
- Logo principal dejó de cargar de URL externa (`iqtseg.munimaynas.gob.pe`) → ahora es asset local.
- Ningún secret real expuesto (`.env.*` solo tienen URLs públicas).

### Deprecated
- `testimoniosService.js` URL hardcoded `http://localhost:4000` eliminada.

### Notes
- Build de producción: `pnpm run build` → 75 módulos, 4.15s, `dist/assets/index-*.js` ~2.3 MB minificado (739 KB gzip).
- Sin tests automatizados (no hay scripts `test` en `package.json`).
- ESLint muestra warnings pero no bloquea el build.
- `pnpm install` reporta "Ignored build scripts" para `@ckeditor/ckeditor5-react@5.1.0` y `esbuild@0.21.5` — funciona sin aprobar (esbuild tiene binarios precompilados, ckeditor se compila al cargar).

---

## [0.0.0] — Estado heredado del VPS

Código tal cual estaba en producción al momento de la migración inicial.
Sin historial de versiones dentro de este changelog (proviene del VPS, no se importó historial).
