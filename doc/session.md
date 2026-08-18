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
