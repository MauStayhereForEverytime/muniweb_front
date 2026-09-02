# AGENTS.md — muniweb_front

Instrucciones para agentes IA trabajando en este repositorio.

## Proyecto

Frontend del portal municipal de Maynas. React 18.3 + Vite 5.4 + TailwindCSS 3.4 + react-router-dom 6.26 + axios. Gestor: **pnpm**.

## Comandos

```bash
pnpm run dev      # http://localhost:5173
pnpm run build    # dist/
pnpm run lint     # eslint 9.x — correr tras cada cambio
```

- Backend asociado: `/home/mauri12/projects/muniweb_back` (Django, venv propio).

## Estructura

- `src/main.jsx` → `App.jsx` → `routes.jsx` (rutas; PrivateRoute solo client-side)
- `src/pages/*.jsx` (Home, Dashboard, Login, Geovisor...)
- `src/components/<dominio>/` (admin, home, noticias, administrable, ...)
- `src/services/*Service.js` — un servicio por entidad
- `src/api/api.js` — `apiClient` axios con interceptores JWT

## Convenciones críticas

- Servicios usan `VITE_API_URL` (.env.development/.env.production; no hay secretos en el front).
- Exportar helper `mediaUrl(path)` de cada servicio para imágenes; maneja URL absoluta, path `/media/` y path bare.
- Uploads SIEMPRE vía FormData con objeto `File` (nunca base64); guardar con `instanceof File` antes de append; campo `null` al editar sin nueva imagen. Todo `input type="file"` de imagen DEBE pasar por `pickValidImageFile(e)` de `src/utils/validateImage.js` (pre-check extensión/tipo/tamaño; el back valida de verdad con `validate_image_file`).
- **Auth JWT**: tokens en localStorage (`accessToken`, `refreshToken`, `id`). Escrituras DEBEN usar `apiClient` con `{ requiresAuth: true }` para que el interceptor renueve el token en 401 y redirija a login.
- Contenido HTML del backend se renderiza con `dangerouslySetInnerHTML` (react-quill). **SIEMPRE envolver en `sanitizeHtml()` de `src/utils/sanitize.js`** (DOMPurify). El backend además sanitiza al grabar (`nh3`). No introducir `dangerouslySetInnerHTML` sin `sanitizeHtml`. Ver `muniweb_back/docs/sessions/SESSION_SEGURIDAD.md` §10.
- Imagen slider recomendada 1920×720 px, máx 3 MB.

## Seguridad

Hallazgos de la auditoría y plan fase por fase: ver **`docs/sessions/SESSION_SEGURIDAD.md`** en el repo del backend (`muniweb_back`). No introducir nuevos usos de `dangerouslySetInnerHTML` sin sanitización ni llamadas de escritura sin token.

## Documentación

- Sesiones de trabajo: `docs/sessions/`
- Historial: `CHANGELOG.md` (formato Keep a Changelog es-ES)
