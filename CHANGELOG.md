# Changelog

Todos los cambios notables de este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/),
y este proyecto se adhiere a [Semantic Versioning](https://semver.org/lang/es/).

---

## [Unreleased] — Sesión Slider + migración a /media/

### Added
- Nueva sección **Carrusel** en el panel admin (`Dashboard > Imágenes > Carrusel`), con CRUD completo (agregar/editar/eliminar) y validación de dimensiones de imagen al subir.
- Validación de tamaño/peso en el admin del carrusel (`CarruselImages.jsx`): lee `naturalWidth/Height` con `Image()` y muestra aviso visual verde/rojo.
- **Checkbox "Mostrar título en el slider"** en admin carrusel (form agregar + modal editar), persistido en el backend como `Image.ima_boo_showtitle`.
- `src/components/administrable/imagenes/CarruselImages.jsx` (componente nuevo, clona patrón de `Modal1.jsx`).
- `src/components/home/carrousel/home-carousel.css` (CSS scope nuevo con overrides de `slick-carousel`).
- Helper `mediaUrl(path)` exportado desde `carrouselService.js`, `newsService.js`, `innovationService.js`, `eventService.js` (construye URL absoluta al backend).
- `doc/SESSION_SLIDER.md` con el resumen completo de los cambios de esta sesión.

### Changed
- **`Carrousel.jsx` (slider público del Home)**:
  - Wrapper `max-w-7xl mx-auto h-[420px] sm:h-[480px] md:h-[560px] lg:h-[640px] rounded-xl` (antes full-bleed deformado).
  - Eliminado CRUD inline (botones "Agregar/Editar/Eliminar" cuando había login). Solo lectura.
  - Slider explícitamente horizontal: `vertical:false`, `verticalSwiping:false`, `rtl:false`, `fade:false`, `autoplay:true (5s)`.
  - Flechas personalizadas `<PrevArrow />`/`<NextArrow />` con `FaChevronLeft/Right`.
  - **Título fijo** en esquina inferior izquierda del slider (overlay fuera de los slides): `bg-maynas-navy/85 backdrop-blur-sm rounded-lg shadow-lg`, no cambia con la imagen activa.
  - `src` ahora `mediaUrl(ima_txt_urlpath)` en vez de `data:image/jpeg;base64,...`.
- **`Dashboard.jsx`**: submenú "Imágenes" ahora tiene **Carrusel** + Modal de Inicio. Removido `import Home` sin usar.
- **`CarruselImages.jsx`**: formulario "Agregar Imagen" siempre visible (antes solo si `images.length === 0`).
- Servicios (`carrouselService`, `newsService`, `innovationService`, `eventService`, `blogService`): ahora envían `FormData` con el `File` real, no JSON con base64. **Guarda `instanceof File`** para no enviar strings cuando no hay archivo nuevo.
- **Componentes admin + público**: `CarruselImages.jsx`, `Modal1.jsx`, `Eventos.jsx`, `EventosInfo.jsx`, `EventosTodos.jsx`, `Modal.jsx`, `Home.jsx`, `NewsList.jsx`, `NewsInfo.jsx`, `NewsItem.jsx`, `Innovation.jsx`, `InnovationList.jsx`, `InnovationInfo.jsx`, `Blog.jsx`, `BlogList.jsx`, `BlogInfo.jsx`, `AddEventImageModal.jsx`, `EditEventImageModal.jsx`: ahora usan `mediaUrl()` para `src` y `File` para upload. Previews con `URL.createObjectURL`.
- Payloads: ya no se envía `fields: {...}` anidado para carrusel/modal/eventos; se envía objeto plano.

### Fixed
- **Slider deformado en pantalla completa**: el slider full-bleed estiraba la imagen. Ahora con `max-w-7xl` y `rounded-xl` mantiene proporción y se ve coherente con el resto del sitio.
- **Stack vertical de slides**: la cadena de alturas del slider colapsaba (sin `height: 100%` forzado en `.slick-list/track/slide`), produciendo que las imágenes se apilaran verticalmente. CSS scope nuevo lo corrige.
- **Caption cortado/pegado al borde**: el caption se veía mal en pantalla completa. Ahora título es overlay fijo a la izquierda con `backdrop-blur` + `bg-maynas-navy/85`.
- **Título saliéndose del marco**: el caption estaba dentro de cada `<div>` de slide sin altura → se posicionaba al fondo del viewport. Resuelto extrayéndolo del slide y poniéndolo como overlay sobre el contenedor del slider.
- **Estilo boletin filtrado al Home**: `boletin.css` global aplicaba `border-radius:20px; border:4px solid #fff; box-shadow` a `.slick-slide img`. CSS scope `.home-carousel-scope` sobreescribe con `!important`.
- **`The submitted data was not a file`** en edición de imágenes: `editImageData.ima_txt_urlpath` mantenía URL string de la imagen existente al abrir modal de edición, se enviaba al backend `FileField` que lo rechazaba. Fix: `setEditImage({ ...image, ima_txt_urlpath: null })` al abrir modal + guarda `instanceof File` en todos los servicios.

### Removed
- Botones de edición/CRUD del slider público del Home (movidos al panel admin).

### Deprecated
- Envío de imágenes como base64 en payloads JSON. Ahora siempre `multipart/form-data` con `File`.

### Security
- Imágenes ya no se almacenan como `TextField` con base64 en la DB, ahora son archivos en `MEDIA_ROOT` (`/media/{images,news,innovation}/`). Imposible inyectar HTML/scripts vía base64.

### Notes
- Recomendación de tamaño para imágenes del slider: **1920×720 px** (ratio 2.67:1), mínimo 1600×600, máximo 2560×1080, peso máx 3 MB.
- Campo nuevo `Image.ima_boo_showtitle` (default `True`): controla si el título se muestra en el slider público. Si `False`, el caption no se renderiza.
- Imágenes detectadas en `media/images/` actualmente:
  - `serey-kim-xjrvTc52xYc-unsplash.jpg` → **7708×3036 px, 2.8 MB** ← excede dimensiones, redimensionar.
  - `ChatGPT_Image_18_ago_2026_13_50_40.png` → **1717×916 px, 2.3 MB** ← OK.

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
