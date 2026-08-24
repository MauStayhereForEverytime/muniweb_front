# Resumen de sesión — Banner de noticias en Eventos + Admin de Eventos con toggle de visibilidad

**Fecha:** 24 ago 2026
**Alcance:** Sección de eventos de la página principal (`src/components/home/eventos/Eventos.jsx`) y nueva página admin de eventos (`src/components/administrable/eventos/EventosAdmin.jsx`), con un toggle de visibilidad persistido en el backend. Cambios fullstack (front + back).

---

## 1. Contexto y petición del usuario

1. **Agregar un enlace a las noticias de gob.pe** (`https://www.gob.pe/institucion/munimaynas/noticias`) dentro de la sección de **Eventos** de la Home, con una imagen para que el ciudadano pueda ingresar a las noticias.
2. Al agregar el banner, el usuario notó que seguía apareciendo el placeholder **"No hay eventos disponibles"** cuando no había eventos cargados.
3. Solicitud final: tener **una página más en el Dashboard** para usar la API de eventos, con un **checkbox** que habilite/deshabilite la vista de los eventos para poder desactivar ese placeholder.
4. Comportamiento final aclarado por el usuario: cuando los eventos están **desactivados**, la sección debe mostrar **solo el banner con la URL de noticias** (sin el placeholder ni las tarjetas de eventos).

---

## 2. Frontend — Banner de noticias (`src/components/home/eventos/Eventos.jsx`)

### Cambios aplicados
- Import de imagen local `conferencia` desde `../../../assets/img/conferencia.jpg` y constante `NEWS_URL = 'https://www.gob.pe/institucion/munimaynas/noticias'`.
- Banner full-width (`<a target="_blank" rel="noopener noreferrer">`) encima de la grilla de eventos:
  - Imagen de fondo con `object-cover` y zoom en hover (`group-hover:scale-110`).
  - Overlay con gradiente `from-maynas-navy/90` y texto "Noticias de la Municipalidad de Maynas" + "Ver noticias →".
- La grilla de eventos (tarjetas + placeholder) quedó envuelta en `{visible && (...)}`, de modo que:
  - **Visibilidad activada** → se muestran las tarjetas de eventos, o el placeholder si no hay ninguno.
  - **Visibilidad desactivada** → solo queda el banner de noticias (sin placeholder).

### Detalle de las tarjetas de eventos (comportamiento preexistente, sin cambios)
- Cada evento con `ima_txt_urlgob` enlaza externamente (`target="_blank"`); si no tiene URL, enlaza internamente a `/eventos/edit/:id`.

---

## 3. Frontend — Nueva página admin de Eventos (`src/components/administrable/eventos/EventosAdmin.jsx`)

### Creación
- Nueva página `EventosAdmin` con:
  - **Checkbox de visibilidad**: "Mostrar la sección de eventos en la página principal". Llama a `updateEventVisibility` (PUT) y hace rollback del estado local si falla.
  - **Formulario "Agregar Evento"**: nombre, descripción, URL del evento (Gob, opcional) e imagen obligatoria (File).
  - **Grid de eventos publicados** con imagen, nombre, descripción y URL, con botones **Editar** (modal) y **Eliminar** (con `window.confirm`).
  - **Modal de edición**: permite cambiar nombre/descripción/URL/imagen; si no se sube imagen nueva se mantiene la actual.

### Registro en el menú
- `src/pages/Dashboard.jsx`: import `EventosAdmin` y nuevo `MenuItem` "Eventos" (icono `FaCalendarAlt`) entre "Últimas Noticias" y "Usuarios".

---

## 4. Frontend — Servicio `src/services/eventService.js`

### Agregado
- `fetchEventVisibility()` → GET `event-visibility`, devuelve `true` por defecto si falla.
- `updateEventVisibility(visible)` → PUT `event-visibility/update` con `apiClient` y `{ requiresAuth: true }`.

### Corregido
- `buildFormData` ahora **sí envía `ima_txt_urlgob`** (antes se perdía el campo, por lo que los eventos nunca guardaban su URL de Gob).

---

## 5. Backend (`muniweb_back`)

### Modelo (`models.py`)
- Campo `cai_boo_visible = models.BooleanField(default=True)` en `CategoryImage`.
- Migración generada y aplicada: `0006_categoryimage_cai_boo_visible.py`.

### Vistas (`views.py`)
- `get_event_visibility` (GET, `AllowAny`): devuelve `{ "visible": bool }` de la categoría de eventos (`cai_int_id=2`). Si la categoría no existe, devuelve `true`.
- `update_event_visibility` (PUT): actualiza `cai_boo_visible` aceptando `bool` o string (`"true"`, `"1"`, `"on"`, `"yes"`).

### URLs (`urls.py`)
- `event-visibility` → GET
- `event-visibility/update` → PUT

---

## 6. Verificación

- `manage.py check` → 0 issues.
- `manage.py makemigrations` + `migrate` → `0006_categoryimage_cai_boo_visible` aplicada OK.
- `pnpm run build` → OK (~3.8s).
- `pnpm run lint` → 0 errores en los archivos nuevos/tocados (`EventosAdmin.jsx`, `eventService.js`, `Eventos.jsx`). Los errores restantes del repo son preexistentes (archivos legacy no relacionados).

---

## 7. Archivos modificados / creados

| Archivo | Repo | Acción | Motivo |
|---|---|---|---|
| `src/components/home/eventos/Eventos.jsx` | front | modificado | Banner de noticias + toggle de visibilidad (ocultar grilla/placeholder). |
| `src/components/administrable/eventos/EventosAdmin.jsx` | front | creado | Página admin de eventos con CRUD + checkbox de visibilidad. |
| `src/pages/Dashboard.jsx` | front | modificado | Menú "Eventos" en el sidebar. |
| `src/services/eventService.js` | front | modificado | `fetchEventVisibility`/`updateEventVisibility` + fix de `ima_txt_urlgob`. |
| `muniweb_backend/models.py` | back | modificado | Campo `cai_boo_visible` en `CategoryImage`. |
| `muniweb_backend/views.py` | back | modificado | Endpoints de visibilidad de eventos. |
| `muniweb_backend/urls.py` | back | modificado | Rutas `/event-visibility` y `/event-visibility/update`. |
| `muniweb_backend/migrations/0006_categoryimage_cai_boo_visible.py` | back | creado | Migración del nuevo campo. |

---

## 8. Lecciones técnicas

| Tema | Aprendizaje |
|---|---|
| **Toggle de visibilidad persistido** | La opción de ocultar una sección debe guardarse en el backend (no en localStorage), porque afecta a la landing pública y la administran usuarios distintos. Se reutilizó la fila de categoría de eventos (`CategoryImage cai_int_id=2`) para no crear una tabla de settings nueva. |
| **Campo perdido en FormData** | `ima_txt_urlgob` se definía en los modales de eventos (`AddEventImageModal`/`EditEventImageModal`) pero `buildFormData` nunca lo agregaba al `FormData`, por lo que el backend nunca lo recibía. |
| **GET público vs PUT autenticado** | El GET de visibilidad es `AllowAny` (la landing lo necesita), mientras que el PUT usa `apiClient` con `{ requiresAuth: true }` para renovar token en 401. |
| **Misma categoría, dos flags** | La categoría de eventos ya tenía un `cai_txt_state` (string) sin usar para esto; se optó por un `BooleanField` dedicado (`cai_boo_visible`) por claridad semántica. |
