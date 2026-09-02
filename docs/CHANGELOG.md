# Changelog

Todos los cambios notables de este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/),
y este proyecto se adhiere a [Semantic Versioning](https://semver.org/lang/es/).

---

## [Unreleased] — Seguridad Fase 3: validación de imágenes subidas (A3)

**Fecha: 2026-09-02. Ver `docs/sessions/SESSION_SEGURIDAD_PENDIENTES.md` §4 y `muniweb_back/docs/sessions/SESSION_SEGURIDAD.md` §11.**

### Added
- **`src/utils/validateImage.js`**: `validateImageFile(file)` + `pickValidImageFile(e)` — pre-check client-side de extensión (jpg/jpeg/png/gif/webp), content-type y tamaño (≤5 MB, mismos criterios que `muniweb_backend/validators.py`); si falla, alerta, limpia el input y devuelve `null`.

### Changed
- Los **18** `input type="file"` de imagen ahora usan `pickValidImageFile(e)`: `Blog`, `Innovation`, `NewsList`, `NewsInfo`, `NewsAdmin`, `BlogInfo`, `InnovationInfo`, `CarruselImages`, `Modal1`, `EventosAdmin`, `Add/EditImageModal` (carrousel) y `Add/EditEventImageModal`.

### Notes
- Pre-check de UX únicamente — la garantía real es la validación server-side del back (400 con magic bytes, polyglotos y tamaño).
- `pnpm run build` ✓; eslint en los archivos tocados: solo errores preexistentes (`React` sin usar, `prop-types`), ninguno nuevo.

---

## [Unreleased] — Seguridad Fase 2: sanitización XSS en el render (C3)

**Fecha: 2026-09-02. Ver `docs/sessions/SESSION_SEGURIDAD_PENDIENTES.md` §3 y `muniweb_back/docs/sessions/SESSION_SEGURIDAD.md` §10.**

### Added
- **`dompurify`** a dependencias y nuevo **`src/utils/sanitize.js`** que exporta `sanitizeHtml()` (perfil `html`, hook que fuerza `rel=noopener noreferrer` en enlaces `target="_blank"`, `FORBID_TAGS` de refuerzo).
- **Sanitización en los 7 renderizados con `dangerouslySetInnerHTML`**: `NewsInfo`, `Home`, `BlogInfo`, `NewsList`, `EventosInfo`, `InnovationInfo`, `NewsAdmin` — ahora envueltos en `sanitizeHtml(...)`.

### Notes
- Capa cliente complementaria de la sanitización server-side (`nh3` en `save()`) del backend.
- `pnpm run build` ✓; `pnpm run lint` sin errores nuevos en los archivos tocados (los de `Home.jsx` — `React` y `hasFullText` sin usar — son preexistentes).

---

## [Unreleased] — Modernización de la página de Integridad a Tailwind

### Changed
- **`src/components/header/integridad.jsx` reescrito de Bulma + estilos inline a Tailwind** con la paleta institucional (`maynas-*`) y el patrón de la Home: hero contenido con badge de título, cards blancas/navy, banda full-width navy para "Programa de integridad". Cero Bulma, cero estilos inline, cero márgenes negativos.
- **Secciones reestructuradas**: Integridad pública (card blanca + card navy con checklist), Conceptos clave (cards patrón Vistos), Difusiones y noticias (destacada navy + secundarias patrón Home), UFII (grid de 13 funciones numeradas con numerales grandes en rojo), Normativas (filtros Tailwind, `thead` navy, badges de categoría, contador de resultados).
- **Modal de noticias** rediseñado al estilo Home: overlay `bg-black/70`, cierre con `Escape`, click en backdrop y botón ×.
- **Rendimiento**: arrays estáticos (`data`, `noticias`, `ufiiFunciones`, etc.) movidos a ámbito de módulo y `filteredData` envuelto en `useMemo`.

### Removed
- `src/components/css/integridad.css` (quedaba huérfano tras quitar su import). `bulma-scoped.css` no se tocó (lo usa `boletin.jsx`).

### Notes
- Sin cambios funcionales: contenido, array `data`, PDFs, lógica de filtros y modal intactos.
- `pnpm run build` ✓; `pnpm run lint` sin errores nuevos en `integridad.jsx` (el resto son preexistentes).
- Resumen de sesión: `docs/sessions/SESSION_INTEGRIDAD_RESULTADOS.md` (plan original: `SESSION_INTEGRIDAD_MODERNIZACION.md`).

---

## [Unreleased] — Banner de noticias en Eventos + Admin de Eventos con toggle de visibilidad

### Added
- **Banner de noticias** en la sección de Eventos (`src/components/home/eventos/Eventos.jsx`): enlace full-width con imagen a `https://www.gob.pe/institucion/munimaynas/noticias` (abre en nueva pestaña).
- **Nueva página admin "Eventos"** (`src/components/administrable/eventos/EventosAdmin.jsx`) registrada en el sidebar del Dashboard: CRUD de eventos (agregar/editar/eliminar) + **checkbox de visibilidad** que habilita/deshabilita la sección de eventos en la Home.
- **Servicio de visibilidad** en `eventService.js`: `fetchEventVisibility()` (GET) y `updateEventVisibility(visible)` (PUT con `requiresAuth: true`).
- Resumen de sesión: `docs/sessions/SESSION_EVENTOS_NOTICIAS.md`.

### Changed
- **`Eventos.jsx`**: la grilla de eventos (tarjetas + placeholder "No hay eventos disponibles") se envuelve en `{visible && ...}`. Con visibilidad desactivada solo se muestra el banner de noticias; con visibilidad activada se muestran las tarjetas o el placeholder si no hay eventos.

### Fixed
- **`ima_txt_urlgob` no se guardaba**: `buildFormData` en `eventService.js` nunca agregaba el campo al `FormData`, por lo que los eventos perdían su URL de Gob al crear/editar. Ahora se envía correctamente.

### Notes
- El toggle de visibilidad se persiste en el backend (campo `cai_boo_visible` de `CategoryImage`, categoría de eventos `cai_int_id=2`), no en localStorage, porque afecta a la landing pública.
- `pnpm run build` ✓; `pnpm run lint` sin errores nuevos en los archivos tocados. Errores de lint restantes son preexistentes.
- Referencia cruzada: migración y endpoints en el CHANGELOG de `muniweb_back`.

---

## [Unreleased] — Auditoría de seguridad (hallazgos frontend)

### Added
- **Reorganización documental**: sesiones movidas de `doc/` a `docs/sessions/` (convención estándar del proyecto).
- **`AGENTS.md`** en la raíz con instrucciones para agentes IA.
- Auditoría de seguridad de ambos repos documentada en `muniweb_back/docs/sessions/SESSION_SEGURIDAD.md` (referencia cruzada).

### Security
Hallazgos del frontend (pendientes de remediación):
- **ALTO**: 91 vulnerabilidades npm (1 crítica: swiper prototype pollution; 42 altas: axios <1.16 con ~11 advisories, form-data CRLF, lodash, minimatch...). Remediar con `pnpm update axios swiper && pnpm audit fix`.
- **ALTO**: tokens JWT en localStorage (`Login.jsx`) — robables vía XSS.
- **CRÍTICO combinado**: 7 usos de `dangerouslySetInnerHTML` con HTML sin sanitizar (`NewsInfo`, `Home`, `BlogInfo`, `NewsList`, `EventosInfo`, `InnovationInfo`, `NewsAdmin`) + backend sin auth en escrituras = XSS almacenado explotable por anónimos.
- Los servicios (`src/services/*.js`) llaman a axios crudo sin header `Authorization` — el flujo JWT existente en `api/api.js` es código muerto.
- `Geovisor.jsx`, `Forociudadano.jsx`, `Vistauno.jsx` guardan `'dummy-token'` en localStorage.
- `logout()` en `api.js` redirige a URL relativa rota (`muniweb/login`).

### Notes
- Decisión de negocio: fase 1 = migrar las llamadas de escritura a `apiClient` con `requiresAuth: true` (renovación automática de token en 401). Archivos afectados listados en SESSION_SEGURIDAD.md §3.3.

---

## [Unreleased] — Admin Últimas Noticias + popups de detalle + fix mediaUrl

### Added
- **Nueva página admin "Últimas Noticias"** en el sidebar del Dashboard (`src/components/administrable/noticias/NewsAdmin.jsx`) — CRUD completo (agregar/editar/eliminar) con validación de dimensiones y peso, formulario con título + descripción + cuerpo largo (QuillEditor) + imagen obligatoria.
- **Validación condicional de contenido**: si la noticia tiene título o descripción, el cuerpo (`new_txt_content`) es obligatorio con mínimo **150 caracteres** (badge en vivo: gris/rojo/amarillo/verde). Si no tiene texto, la card se renderiza como banner puro (autodescriptiva).
- **Popup de detalle** en `Home.jsx`, `NewsList.jsx` y `NewsAdmin.jsx`: al hacer clic en una card, se abre modal con imagen banner + título + descripción + contenido HTML (scroll interno). Cierre con `Esc`, clic en backdrop, botón × sobre la imagen o botón "Cerrar".
- **Affordance "Ver más →"** en las cards de noticias de Home (color `text-maynas-red`, hover underline).
- Helper `hasFullText(item)` para distinguir cards con texto completo (título/desc + ≥150 chars de contenido) vs banner puro.
- Nuevo directorio `src/components/administrable/noticias/`.

### Changed
- **`Home.jsx`**:
  - Cards de noticias convertidas de `<Link to="/news/:id">` a `<button type="button">` que abren popup. **No más navegación a mini-páginas**.
  - Plugin de **Facebook removido** de la sección de noticias (incluyendo `loadFacebookSDK()` del `useEffect`).
  - Layout del grid de noticias ajustado a `lg:grid-cols-2` con noticia principal + 1 secundaria (sin hueco vacío dejado por el Facebook plugin).
  - Cards usan `aspect-video` (built-in Tailwind) en vez de `aspect-[16/9]` + `bg-gray-100` + `object-center` explícito.
- **`NewsList.jsx`** (página pública de noticias): cards convertidas de `<Link>` a `<button>`, modal popup añadido con el mismo patrón que Home.
- **`NewsAdmin.jsx`**: modal popup con el mismo patrón. Variable muerta `newsItems` removida (lint).
- **`mediaUrl()` reescrito y robustecido** en 6 lugares:
  - 4 servicios: `newsService.js`, `carrouselService.js`, `eventService.js`, `innovationService.js`.
  - 2 copias locales duplicadas: `Modal.jsx`, `Modal1.jsx`.
  - Nueva implementación maneja los 3 formatos que puede devolver el backend (URL absoluta, path con `/media/`, path bare).
- **Modales (Home/NewsList/NewsAdmin)**: contenedor de imagen cambia de `h-72 object-cover` a `max-h-[60vh] flex items-center justify-center object-contain max-w-full`. La imagen completa se ve siempre; barras grises si sobra espacio.
- **Recomendaciones de tamaño en `NewsAdmin`**:
  - Recomendado: **1920×1080 px** (antes 1200×675).
  - Mínimo: 1200×675 (antes 800×450).
  - Máximo: 3840×2160 (antes 1920×1080).
  - Peso: 3 MB.
- **`CarruselImages.jsx`**: `type="button"` + `e.preventDefault()` + `e.stopPropagation()` en los 3 botones de acción (Ver más, Editar, Eliminar) para evitar submits accidentales.

### Fixed
- **Imágenes devolvían 404 en frontend** (`http://127.0.0.1:8000/news/foo.png`): el helper `mediaUrl()` no prependía `/media/`. Reescrito para incluirlo consistentemente.
- **`/media/media/...` (doble `/media/`)**: el serializer devolvía path con prefijo `/media/` cuando no había contexto de request, y el helper añadía otro prefijo. Helper robusto que detecta el formato.
- **`Modal.jsx` y `Modal1.jsx`**: copias locales del helper `mediaUrl` con el mismo bug que los servicios (resueltas al reescribir todos los 6 lugares).
- **Cards de noticias navegaban a `/news/:id`**: convertidas a `<button>` que abre popup, eliminando la mini-página que aparecía al hacer clic.
- **Banner recortado verticalmente en cards/modal**: `aspect-video` + `object-cover object-center` en cards, `object-contain` en modal — la imagen completa o recortada centrada, no por un lado.
- **Popup mostraba "Sin contenido extendido" placeholder**: eliminado; el `<div>` de contenido se renderiza solo si existe.
- **Plugin de Facebook visible en sección de noticias**: removido del Home.jsx (incluyendo SDK loader).
- **`NewsAdmin.handleDelete` y `CarruselImages.handleDeleteImage`**: agregada confirmación `window.confirm` antes de eliminar.
- **`NewsAdmin.openEdit`**: `setEditImageData({ ...image, ima_txt_urlpath: null })` + `setEditImagePreview(image.ima_txt_urlimage || null)` para mostrar preview actual sin enviar string al backend `FileField`.

### Removed
- Plugin de Facebook del layout del Home (incluyendo `loadFacebookSDK()` del `useEffect`).
- Placeholder "Sin contenido extendido" de los 3 modales (Home, NewsList, NewsAdmin).
- Variable muerta `newsItems` en `NewsList.jsx`.
- Atributo `use_url=True` por defecto en `NewsSerializer.new_txt_urlimage` (verificado: ahora `use_url=False`).

### Notes
- El comportamiento esperado del admin: si el usuario rellena título o descripción, debe escribir ≥150 caracteres de cuerpo (validado en frontend + bloqueante al guardar).
- Banner / imagen autodescriptiva: solo imagen, sin texto. La card se renderiza como banner puro y el clic abre popup mostrando la imagen más grande.
- Las rutas públicas `/news/:id` y el componente `NewsInfo.jsx` siguen existiendo (compatibilidad), pero ya no se usan desde las cards públicas.
- `pnpm run lint` sin errores nuevos en archivos tocados.
- `pnpm run build` ✓ built in ~4.4s.
- `curl http://127.0.0.1:8000/media/news/prurbanoticia.png` → 200 OK.
- `curl http://127.0.0.1:8000/media/images/PRUEBA_1.png` → 200 OK (antes 404).

---

## [Unreleased] — Sesión Slider + migración a /media/

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
