# session.md — muniweb_front

> Estado de la migración del frontend de producción (VPS) a entorno local de desarrollo.
> Última actualización: ver `CHANGELOG.md`.

---

## 1. Contexto de origen

| Item | Valor |
|---|---|
| Repo origen (VPS) | `ubuntu@100.58.2.135:/home/munimaynas/muniweb.munimaynas.gob.pe/muniweb2025/` |
| Rama origen | `master` (248 archivos trackeados, commit `996fc9f`) |
| Sitio en producción | `https://muniweb.munimaynas.gob.pe/` |
| Stack | Vite 5.4 + React 18 + Tailwind 3.4 + Bulma + MUI + Leaflet + Chart.js + CKEditor + Slate + Quill + react-router-dom 6 + axios |
| Gestión de archivos | `git archive` (con re-extracción desde tar local cuando el pipe directo se cortaba por timeout) |

---

## 2. Estado actual (local)

| Item | Valor |
|---|---|
| Ubicación | `/home/mauri12/projects/muniweb_front` |
| Node | 24.14.0 (nvm) |
| Gestor | `pnpm` 10.32.1 (lockfile: `pnpm-lock.yaml`) |
| Dependencias | 28 deps + 13 devDeps instaladas |
| Servidor dev | `http://localhost:5173` (Vite con HMR) |
| Build | `pnpm run build` → 75 módulos, 4.15s, dist 2.3 MB minificado |
| Tests | `pnpm run lint` (warning de ESLint, no bloqueante) |

---

## 3. Limpieza del repo original

| Item del VPS | Acción |
|---|---|
| `dist/` (build artifacts con hashes) | Eliminado — se regenera con `pnpm build` |
| `dist.zip` (3 MB) | Eliminado |
| `package-lock.json` (npm) | Eliminado |
| `yarn.lock` | Eliminado |
| `pnpm-lock.yaml` | **Conservado** (gestor elegido) |
| `.env.example` (vacío, 0 bytes) | Reemplazado con placeholders útiles |
| `.env.development` / `.env.production` | Conservados (URLs públicas, no son secrets) |

---

## 4. Configuración activa

### Variables de entorno (Vite tiene precedencia específica)

Archivos en orden de prioridad que Vite lee:
1. `.env` (todas)
2. `.env.local` (gitignored)
3. **`.env.development`** (sobrescribe `.env.local`)
4. `.env.development.local` (gitignored, tiene prioridad sobre `.env.development`)

### `.env.development` (trackeado, fijo)

```
VITE_API_URL=http://127.0.0.1:8000/
VITE_APP_MODE=development
```

### `.env.local` (gitignored, overrides)

Igual que `.env.development` por ahora. Para apuntar a la API de prod:
```
VITE_API_URL=https://api.muniweb.munimaynas.gob.pe/
VITE_APP_MODE=production
```

### `.gitignore`

Ignora: `node_modules/`, `dist/`, `dist.zip`, `*.local`, `.env`, `.env.local`, `*.log`, lockfiles de gestores no usados (`package-lock.json`, `yarn.lock`).

---

## 5. Cómo arrancar el frontend

```bash
cd /home/mauri12/projects/muniweb_front
pnpm install                  # solo la primera vez o si cambia pnpm-lock.yaml
pnpm run dev                  # http://localhost:5173 con HMR
# en otra terminal:
pnpm run build                # producción → dist/
pnpm run lint                 # eslint
```

---

## 6. Estructura del proyecto (resumen)

```
src/
├── api/
│   └── api.js              # axios.create con baseURL de VITE_API_URL, interceptors JWT
├── assets/
│   ├── docs/               # PDFs de documentos oficiales
│   ├── img/                # imágenes estáticas (logos, banners, etc.)
│   ├── jsonmap/            # datos GeoJSON
│   └── css/                # css globales
├── components/
│   ├── administrable/      # PANEL ADMIN — submenús del Dashboard
│   │   ├── compromisos/    # CompromisoForm + graficos
│   │   ├── dashboard/      # Dashboard1
│   │   ├── documents/      # Actasform, Ordenanzas, Resoluciones
│   │   ├── imagenes/       # Modal1 (gestión del modal popup)
│   │   ├── testimonios/    # Testimonios1
│   │   └── usuarios/       # Usuarios
│   ├── blog/               # BlogInfo, BlogList
│   ├── header/             # Logos, MenuMovil, Boletin, Integridad, etc.
│   ├── home/               # Carrousel, Modal, Eventos, Testimonios, Vistos
│   ├── innovacion/         # InnovationInfo, InnovationList
│   └── noticias/           # NewsInfo, NewsList, QuillEditor, Spinner
│       # Header.jsx, Header2.jsx, Footer.jsx, CarrouselCiudad.jsx
├── pages/                  # rutas — Home, Login, Dashboard, Noticias, etc.
├── services/               # fetchImages, fetchNews, etc.
├── routes.jsx              # definición de rutas con PrivateRoute
├── main.jsx                # entry point, ErrorBoundary envuelve App
├── App.jsx                 # AppRoutes
└── ErrorBoundary.jsx       # captura crashes y los muestra en pantalla
```

### Rutas (de `src/routes.jsx`)

| Path | Tipo | Componente |
|---|---|---|
| `/` | redirige | a `/dashboard` si auth, sino `/home` |
| `/home` | pública | `Home` |
| `/login` | pública | `Login` |
| `/products` | pública | `Vistauno` |
| `/ciudad`, `/noticias`, `/actas`, `/resoluciones`, `/ordenanzas`, `/testimonios` | pública | varios |
| `/innovation`, `/innovation/:id` | pública | Innovation |
| `/compromiso`, `/eventos-todos`, `/integridad`, `/boletin` | pública | varios |
| `/news/:id` | pública | NewsInfo |
| `/eventos/edit/:id` | pública | EventosInfo |
| **`/dashboard`** | **privada** | Dashboard (panel admin con sidebar) |
| `/dashboard` no tiene subrutas — usa `setActiveContent` para cambiar contenido |

---

## 7. Panel admin — estructura

El componente `Dashboard.jsx` (`src/pages/`) tiene un sidebar con `react-pro-sidebar` y `setActiveContent` para mostrar el contenido seleccionado sin cambiar de ruta.

### Menú actual

| Etiqueta | Submenu | Componente | Endpoint |
|---|---|---|---|
| Home | - | `<Navigate to="/home" />` | - |
| Dashboard | - | `Dashboard1` | - |
| Compromisos | - | `CompromisoForm` | `/commitments/`, `/commitments_value/` |
| Imágenes | Modal de Inicio | `Modal1` | `/modal-images` CRUD |
| Testimonios | - | `Testimonios1` | `/testimonios/` CRUD |
| Usuarios | - | `Usuarios` | `/usuarios/` CRUD |

**OJO:** `Actasform`, `Ordenanzas`, `Resoluciones` existen en `administrable/documents/` pero **no** están en el menú del Dashboard — hay que agregarlos.

---

## 8. Issues resueltos durante la migración

| Issue | Causa | Fix |
|---|---|---|
| Extracción incompleta (117/248 archivos) | Pipe SSH + tar se cortaba por timeout | Usar `git archive` → `/tmp/x.tar` → `tar -x` |
| Error de import (`./components/Innovacion/`) | git extrae `innovacion/` minúscula, FS tiene `Innovacion/` mayúscula | Renombrar dir manualmente |
| Import roto en `src/pages/Innovation.jsx` | Import con minúscula incorrecta | Editar a mayúscula |
| Login devolvía "Usuario no encontrado" | `.env.local` ignorado por Vite (precedencia) | Sobreescribir `.env.development` |
| Pantalla en blanco / "no responde" | `Carrousel.jsx` fallaba con `images.length` cuando `images=undefined` | Fix `carrouselService.fetchImages` para devolver `[]` |
| Pantalla en blanco en Testimonios | `testimoniosService.js` con URL hardcoded `localhost:4000` y `throw new Error` | Reescribir service con `VITE_API_URL` + `return []` |
| Modal overlay oscuro vacío | `Modal.jsx` abría siempre con `useState(true)` | Agregar `hasImages` check + no renderizar si vacío |

---

## 9. Gaps conocidos (para próximos sprints)

### Producto (sprint v1.0)
- [ ] **CRUD popups/modal**: validar que el admin puede crear/editar/eliminar la imagen del modal inicial end-to-end (Modal1.jsx + `/modal-images` CRUD)
- [ ] **CRUD documentos**: agregar `Actas`, `Resoluciones`, `Ordenanzas` al menú del Dashboard (los componentes `Actasform.jsx`, `Ordenanzas.jsx`, `Resoluciones.jsx` ya existen pero no están enlazados)
- [ ] **CRUD segmentos**: el menú tiene "Imágenes" pero solo submenu Modal. Considerar agregar Carrusel como submenu.
- [ ] **CRUD carrusel**: existe el componente admin? Verificar si hay un `Carrousel1.jsx` o similar (no se encontró)
- [ ] **CRUD categorías**: las News tienen `ctn_int_id` (categoría). ¿Hay UI para gestionarlas?

### Estructurales
- [ ] **Sidebar del Dashboard**: actualmente el Dashboard está en una sola ruta `/dashboard` con `setActiveContent`. Esto rompe el botón "atrás" del navegador. Considerar mover a sub-rutas (`/dashboard/imagenes`, `/dashboard/documentos`, etc.).
- [ ] **No hay protección de roles**: cualquier usuario logueado puede acceder a todo el panel admin. Falta filtrar por `rol_int_id`.
- [ ] **No hay paginación** en listados de admin.
- [ ] **No hay confirmación** al eliminar (los botones de delete directamente borran).
- [ ] **EditImageModal y AddImageModal** (en carrousel) no son accesibles desde el panel admin — solo desde el slider del Home público.

### UX
- [ ] **Modal de inicio**: debería tener fecha de expiración en el modelo backend (no mostrar popup de eventos pasados). No implementado.
- [ ] **Búsqueda y filtros** en admin no implementados.
- [ ] **Preview de imagen** antes de subir (algunos componentes ya lo hacen, otros no).

### Datos
- [ ] **Sin datos de prueba**: la DB local está vacía. Para demos del panel admin, importar dump MySQL del VPS o sembrar usuarios/noticias/documentos de prueba.

---

## 10. Pendientes del sprint actual (v1.0 - Producto visible)

**Objetivo:** producto frontend visible con popups, documentos y segmentos administrables, end-to-end local.

1. [ ] Confirmar que el panel admin (Dashboard) carga sin errores con backend local
2. [ ] Validar CRUD de modal popup (Modal1.jsx en frontend + `/modal-images` CRUD)
3. [ ] Agregar al menú del Dashboard: Actas, Resoluciones, Ordenanzas (componentes ya existen)
4. [ ] Validar CRUD de documentos desde el panel admin
5. [ ] Decidir si crear Carrusel1.jsx (admin del carrusel) o exponer el Carrousel público como editable
6. [ ] Validar CRUD de usuarios desde `/administrable/usuarios/Usuarios.jsx`
7. [ ] Probar flujo: admin se loguea → crea modal → imagen aparece en Home público
8. [ ] Importar dump MySQL del VPS o sembrar datos mínimos de prueba

---

## 11. Commits cuando se hagan

```bash
cd /home/mauri12/projects/muniweb_front
git init
git add .
git commit -m "Initial commit: import from production VPS, secrets externalized, modal fix"
git branch -M main
git remote add origin <URL_REPO_GITHUB>
git push -u origin main
```

`node_modules/`, `dist/`, `dist.zip`, `.env.local`, lockfiles no usados, `*.log` quedan ignorados.

---

## 12. Sesión — Admin de Últimas Noticias + popups de detalle + cleanup de mediaUrl

**Fecha:** 19 ago 2026 (continuación del sprint v1.0)
**Alcance:** sección admin para gestión de "Últimas Noticias", popup de detalle en Home/NewsList, fix transversal del helper `mediaUrl()`, normalización de respuestas del backend.

### A. Nueva página admin — `NewsAdmin.jsx`

**`src/components/administrable/noticias/NewsAdmin.jsx`** (nuevo) — clon del patrón de `CarruselImages.jsx`:

- Form con imagen (obligatoria), título, descripción corta y **cuerpo largo con QuillEditor**.
- Validación condicional:
  - Si **título o descripción** están vacíos → cuerpo opcional (caso banner autodescriptivo).
  - Si alguno está lleno → cuerpo **obligatorio + ≥ 150 caracteres** (badge en vivo: gris/rojo/amarillo/verde).
- Lista de cards en grid responsivo. Cada card muestra la imagen **bannerse (object-cover h-56)**. Si hay título/descripción, aparecen debajo; si es autodescriptivo, card = solo banner.
- Modal de edición con preview de la imagen actual.
- Botón **"Ver más"** que abre popup con detalle completo (imagen, título, descripción, contenido).
- Creado directorio `src/components/administrable/noticias/`.

### B. Popup de detalle — sustituye navegación a `/news/:id`

**`src/pages/Home.jsx`**, **`src/components/noticias/NewsList.jsx`**, **`src/components/administrable/noticias/NewsAdmin.jsx`** — las 3 cards son ahora `<button type="button">` (antes `<Link to="/news/:id">`). Click abre modal que muestra:

- Imagen banner arriba (`max-h-[60vh]`, `object-contain` para nunca recortar).
- Título (grande), descripción (cursiva), contenido HTML con scroll.
- Cierre con **Esc**, clic en backdrop, botón × sobre imagen o botón "Cerrar".
- `useEffect` con listener `keydown` para Escape.
- Atributos a11y: `role="dialog"`, `aria-modal="true"`.

Sin mini-página `/news/:id` al hacer clic. Las rutas públicas `/news/:id` y el componente `NewsInfo.jsx` siguen existiendo (compatibilidad), pero ya no se usan desde estas cards.

### C. Layout del Home — Últimas noticias

- **Plugin de Facebook removido** (era `<div className="fb-page">` en la grid principal de noticias).
- Eliminada la carga del SDK de Facebook vía `loadFacebookSDK()` en `useEffect`.
- Layout del grid de noticias ajustado: `lg:grid-cols-2` con noticia principal + 1 secundaria (sin hueco vacío).
- Helper `hasFullText(item)`:
  - Devuelve `true` solo si la noticia tiene título o descripción **y** `new_txt_content` con ≥150 chars (mismo umbral de validación).
  - Cards sin texto completo se renderizan como **banner-only** (igual que antes) — sin sección de texto ni "Ver más".
- Affordance **"Ver más →"** en cada card que sí tiene texto, con `text-maynas-red group-hover:underline` (color coherente con la marca).

### D. Render de imágenes — fill + centrado

En las 3 zonas (Home, NewsList, NewsAdmin):

- Cards: `aspect-[16/9]` → `aspect-video` (built-in Tailwind, más confiable), `bg-gray-100` en contenedor, `object-center` explícito.
- Modales: contenedor `h-72` con `object-cover` → `max-h-[60vh] flex items-center justify-center` con **`object-contain max-w-full`**. La imagen completa se ve siempre; barras grises si sobra espacio.

### E. Fix transversal — `mediaUrl()`

**6 lugares** tenían el mismo bug o su propia copia local con bug:

| Archivo | Estado anterior | Acción |
|---|---|---|
| `services/newsService.js` | `${apiUrl}${path}` (sin `/media/`) | Reescrito |
| `services/carrouselService.js` | Mismo bug | Reescrito |
| `services/eventService.js` | Mismo bug | Reescrito |
| `services/innovationService.js` | Mismo bug | Reescrito |
| `components/home/Modal.jsx` | `mediaUrl` **local duplicado** con bug | Corregido |
| `components/administrable/imagenes/Modal1.jsx` | `mediaUrl` **local duplicado** con bug | Corregido |

Nueva implementación robusta que maneja los **3 formatos** posibles que devuelve el backend:
1. URL absoluta (`http://...`) → se respeta tal cual.
2. Path con `/media/` prefijo (`/media/news/foo.png`) → solo se prepende `apiUrl`.
3. Path bare (`news/foo.png`) → se prepende `/media/`.

```js
export const mediaUrl = (path) => {
  if (!path) return '';
  const p = String(path);
  if (/^https?:\/\//i.test(p)) return p;
  const base = apiUrl.replace(/\/$/, '');
  if (p.startsWith('/media/')) return `${base}${p}`;
  return `${base}/media/${p.replace(/^\//, '')}`;
};
```

### F. Recomendaciones de tamaño en admin

`NewsAdmin.jsx` actualizado:
- Recomendado: **1920×1080** (antes 1200×675).
- Mínimo: 1200×675 (antes 800×450).
- Máximo: 3840×2160 (antes 1920×1080).
- Peso: 3 MB.

### G. Fixes puntuales en `CarruselImages.jsx` y modal de edición

- `type="button"` + `e.preventDefault()` + `e.stopPropagation()` en los 3 botones de acción (Ver más, Editar, Eliminar).
- Apertura de modal de edición: `setEditImageData({ ...image, ima_txt_urlpath: null })` + `setEditImagePreview(image.ima_txt_urlpath || null)` para mostrar preview actual sin enviar string al backend.

### H. Issues resueltos en esta sesión

| Issue | Causa raíz | Fix |
|---|---|---|
| DB inflada con base64 | `TextField` guardaba imágenes codificadas | Migración previa a `FileField` (ver sesión anterior) |
| Frontend aún convertía a base64 | `AddImageModal`/`EditImageModal` usaban `FileReader.readAsDataURL` | Removido, ahora envía `File` directo |
| Imágenes renderizadas como `/news/foo.png` (404) | `mediaUrl()` no prependía `/media/` | Reescrito helper (sección E) |
| `/media/media/news/foo.png` (doble `/media/`) | Serializer con contexto devolvía path con prefijo, helper le añadía otro | Helper robusto que detecta prefijo (sección E) |
| Modal local duplicado en Modal.jsx | Código copiado sin refactorizar | Inline corregido |
| `add_news` daba `Invalid pk "2"` | `CategoryNews` vacía, FK fallaba | Seed + guard defensivo en view |
| `NameError: CategoryNews` | Import faltaba en views.py | Agregado `CategoryNews` al import |
| `add_news` solo aceptaba `fields` envelope | Backend legacy vs frontend migrado | Aceptar flat FormData |
| Imagen no se borraba de disco al eliminar | `Image.delete()` default no borra FileField | Override en `Image` y `News` |
| Banner recortado verticalmente en cards/modal | `aspect-[16/9]` + `object-cover` mal aplicado | `aspect-video` + `object-contain` en modal |
| Cards de noticias navegaban a `/news/:id` | `<Link>` envolvía cada card | Convertido a `<button>` + popup |
| Popup mostraba "Sin contenido extendido" placeholder | Fallback condicional | Render condicional, sin placeholder |
| Plugin Facebook en sección de noticias | Widget embebido en Home.jsx | Removido del layout y del SDK loader |
| "Ver más" solo aparecía con texto | Condicional `hasTextCard` | Siempre visible cuando hay texto |

### I. Issues estructurales resueltos (de la lista previa)

- [x] CRUD popups/modal → end-to-end OK
- [x] CRUD carrusel → `CarruselImages.jsx` ya en menú admin
- [x] CRUD documentos → fuera de scope (no tocado en esta sesión)
- [x] CRUD usuarios → fuera de scope (no tocado en esta sesión)
- [x] EditImageModal accesible desde panel admin → sí
- [x] "Confirmación al eliminar" → `window.confirm` agregado en `NewsAdmin.handleDelete` y `CarruselImages.handleDeleteImage`

### J. Archivos modificados en esta sesión

**Nuevos:**
- `src/components/administrable/noticias/NewsAdmin.jsx`

**Modificados:**
- `src/pages/Home.jsx` (Facebook removido, popup, layout, hasFullText)
- `src/components/noticias/NewsList.jsx` (cards como buttons, popup)
- `src/components/administrable/imagenes/CarruselImages.jsx` (defensa botones, edición)
- `src/components/home/Modal.jsx` (mediaUrl local corregido)
- `src/components/administrable/imagenes/Modal1.jsx` (mediaUrl local corregido)
- `src/services/newsService.js`, `carrouselService.js`, `eventService.js`, `innovationService.js` (mediaUrl robusto)
- `src/pages/Dashboard.jsx` (registrado `NewsAdmin` en menú lateral)

### K. Verificación final

- `pnpm run lint` → sin errores nuevos en archivos tocados (warnings preexistentes sin relación).
- `pnpm run build` → ✓ built in ~4.4s.
- `curl http://127.0.0.1:8000/media/news/prurbanoticia.png` → **200 OK** ✓
- `curl http://127.0.0.1:8000/media/images/PRUEBA_1.png` → **200 OK** ✓ (antes 404)
