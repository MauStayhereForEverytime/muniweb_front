# SESSION_SEGURIDAD_DEPS.md — Remediación de vulnerabilidades npm (frontend)

> Sesión 2 de seguridad, parte frontend. Fecha: 2026-08-27.
> Plan completo (frontend + backend) y hallazgos del backend: `muniweb_back/docs/sessions/SESSION_SEGURIDAD.md` §7-§8.
> Estado: **PENDIENTE DE EJECUTAR**.

---

## 1. Diagnóstico — `pnpm audit`: 91 vulnerabilidades

**1 crítica · 42 altas · 44 moderadas · 4 bajas** (resumen: `Severity: 4 low | 44 moderate | 42 high | 1 critical`)

### 1.1 Vulnerabilidades que afectan al bundle/runtime

| Severidad | Paquete | Vuln | Versión actual | Fix | ¿En uso? |
|---|---|---|---|---|---|
| **CRÍTICA** | `swiper` | Prototype pollution | 11.2.10 | >=12.1.2 | **NO** → eliminar |
| ALTA | `axios` | ~11 advisories: DoS `formDataToJSON`/`formToJSON` recursión, header injection cloud metadata, prototype pollution en merge/read-side gadgets, null byte injection (low) | 1.11.0 | **>=1.18.0** (última 1.20.0) | SÍ → actualizar |
| ALTA | `react-router` | Open redirect protocol-relative `//` (GHSA-2j2x-hqr9-3h42) | 6.30.1 | 6.30.4 / v7 | SÍ → migrar a v7 |
| ALTA | `@remix-run/router` (transitiva) | Ídem | <=1.23.1 | >=1.23.2 | con react-router-dom |
| MODERADA | `react-router` | Constructor injection SSR hydration (no aplica: sin SSR) y backslash open-redirect bypass | 6.x | >=7.18.0 | con la migración v7 |
| ALTA | `lodash` (transitiva de `react-quill`) | Prototype pollution `_.unset`/`_.omit` | <=4.17.23 | >=4.18.0 | transitiva → override |
| ALTA | `lodash-es` (transitiva de `@ckeditor/ckeditor5-build-classic`) | Ídem | <=4.17.22 | >=4.17.23 | transitiva → update/override |
| ALTA | `form-data` (transitiva de axios) | CRLF | <4.0.6 | >=4.0.6 | se corrige con axios |

### 1.2 Solo desarrollo (build/lint)

`vite` 5.4.19 (2 lows → 5.4.20; 1 moderada launch-editor NTLM solo Windows → 6.4.3+), `postcss` (<8.5.23), `rollup`, `@babel/core`, `glob`, `minimatch`, `brace-expansion`, `js-yaml`, `picomatch`, `flatted`, `nanoid` (stack eslint/vite).

## 2. Análisis de uso real de dependencias (verificado con rg sobre src/ + index.html)

**EN USO (se conservan):**

| Paquete | Dónde |
|---|---|
| react, react-dom, react-router-dom | global |
| axios | `src/api/api.js` + servicios |
| react-quill | `src/components/noticias/QuillEditor.jsx` |
| @ckeditor/ckeditor5-react + @ckeditor/ckeditor5-build-classic | `src/pages/Blog.jsx` |
| react-pro-sidebar | `src/pages/Dashboard.jsx` |
| react-slick + slick-carousel | Carrousel.jsx, boletin.jsx, integridad.jsx |
| leaflet + react-leaflet + react-leaflet-google-layer | Ciudad.jsx, Geovisor.jsx |
| react-icons, @heroicons/react | global / BlogList.jsx |
| bulma | boletin.jsx, integridad-bulma.css |
| tailwindcss (dev) | global |

**SIN USO (15, se eliminan):** `swiper`, `jquery`, `datatables.net`, `datatables.net-dt`, `slate`,
`slate-history`, `slate-hyperscript`, `slate-react`, `@mui/material`, `@emotion/react`,
`@emotion/styled`, `react-data-table-component`, `chart.js`, `react-chartjs-2`,
`ckeditor5-react` (entrada `link:ckeditor\ckeditor5-react` rota, apunta a ruta Windows).

## 3. Plan aprobado (Bloque A del plan general)

Decisiones: eliminar las 15 deps sin uso · migrar react-router-dom a **v7** · subir **vite a v6**.

| # | Acción | Comando / detalle |
|---|---|---|
| A1 | Eliminar deps sin uso | `pnpm remove swiper jquery datatables.net datatables.net-dt slate slate-history slate-hyperscript slate-react @mui/material @emotion/react @emotion/styled react-data-table-component chart.js react-chartjs-2 ckeditor5-react` — mata la CRÍTICA y varias altas con riesgo funcional cero (0 imports) |
| A2 | Migrar react-router-dom a v7 | `pnpm add react-router-dom@^7.18` — v7 es re-export de `react-router`; el código usa solo `BrowserRouter`/`Routes`/`Route` + PrivateRoute (sin data routers/loaders/fetchers) → API compatible. 15 archivos importan de 'react-router-dom'. Ojo: future flags de v6 pasan a default (v7_startTransition, v7_relativeSplatPath, v7_normalizeFormMethod) |
| A3 | axios + vite | `pnpm add axios@^1.20` · `pnpm add -D vite@^6` (`@vitejs/plugin-react` 4.7 es peer-compatible; Node v24 OK) |
| A4 | Update en rango + overrides | `pnpm update` (postcss, autoprefixer, react-slick, react-quill, react-icons, stack eslint); si `pnpm audit` sigue reportando transitivas, añadir a package.json: `"pnpm": { "overrides": { "lodash": "^4.18.0", "lodash-es": "^4.17.26", "form-data": "^4.0.6" } }` |
| A5 | Verificación | 1) `pnpm audit` → objetivo 0 críticas/altas runtime (solo dev moderadas aceptables) · 2) `pnpm run build` · 3) `pnpm run lint` sin errores NUEVOS (baseline ~118 preexistentes en otros archivos) · 4) prueba manual de rutas: home, login, dashboard, news/:id, innovation/:id, eventos/edit/:id · 5) `pnpm run dev` con vite 6 |

**Nota B6 (backend, toca el front):** cuando el backend implemente el endpoint `POST /logout/`
con blacklist, el logout del `Dashboard.jsx`/`api.js` debe llamarlo con el refresh token ANTES
de limpiar `localStorage` (hoy solo limpia storage). Se coordina en la misma sesión (plan §8.2 B6).

## 4. Riesgos

1. **react-router v7**: cambios de comportamiento de future flags → probar navegación completa (públicas, PrivateRoute, redirecciones login/logout).
2. **vite 6**: config 5.x mayormente compatible → probar dev server y build.
3. **lint baseline**: el proyecto arrastra ~118 errores preexistentes; comparar antes/después para no atribuirlos al cambio.

## 5. Fuera de alcance de esta sesión (frontend)

- Fase 2 (C3): DOMPurify en los 7 `dangerouslySetInnerHTML` (NewsInfo 117, Home 193, BlogInfo 149, NewsList 314, EventosInfo 43, InnovationInfo 146, NewsAdmin 450) — junto con nh3/bleach server-side.
- Fase 6 (M2): agregar dominio productivo a CORS del backend (`https://muniweb.munimaynas.gob.pe` por confirmar).
