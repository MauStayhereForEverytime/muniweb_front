# Plan de sesión — Modernización de la página de Integridad (`src/components/header/integridad.jsx`)

**Fecha:** 24 ago 2026
**Alcance:** Rediseño visual de la página pública de Integridad Institucional migrando de Bulma + estilos inline a Tailwind con la paleta institucional (`maynas-*`) y el patrón de la Home. Sin cambios funcionales (datos, PDFs, lógica de filtros y modal intactos).

---

## 1. Contexto y petición del usuario

Modernizar `src/components/header/integridad.jsx` usando:

1. La **skill global de diseño** del sistema (`frontend-design`) como guía de dirección visual.
2. `src/pages/Home.jsx` como **ejemplo de estructura y sistema de diseño** para reestructurar los apartados, mejorando la visibilidad y **manteniendo los colores de la Home**.

Decisión del usuario (consultada): el **hero contenido como el Home** (slider dentro de `max-w-7xl` con bordes redondeados y altura fija), no full-width.

---

## 2. Diagnóstico del estado actual

| Aspecto | Antes |
|---|---|
| Estilos | Bulma (`section`, `columns`, `column`, `title`, `table`, `input`, `select`) con `bulma-scoped.css` + `integridad.css` |
| Estilos inline | Cientos, con hacks de márgenes negativos (`marginTop: -100`, `marginTop: "-60px"`) |
| Hero | Slider 100vh con gradiente + título desplazado con `marginRight: 60%` |
| Secciones | Columnas Bulma con separador gris (`borderRight: 1px solid #ccc`), poco jerarquizadas |
| Modal | Estilo propio, sin cierre por `Escape` |
| Enlace fuera de paleta | Links "Material informativo" en amarillo sobre banda azul |

---

## 3. Sistema de diseño (derivado de la Home)

| Token | Valor | Uso |
|---|---|---|
| Fondo | `bg-maynas-paper` `#F8F9FA` | Fondo de página |
| Primario | `maynas-navy` `#23355B` | Títulos, bandas, botones, card destacada |
| Acento | `maynas-red` `#AB0A0A` | Eyebrows, bordes, hover, badges, checks |
| Tarjetas | `bg-white rounded-xl ring-1 ring-gray-200 shadow-sm hover:shadow-lg` | Patrón de cards del Home |
| Tipografía | Archivo (`font-display`, extrabold uppercase) + Public Sans (`font-sans`) | Títulos / cuerpo |

Estructura base replicada de `Home.jsx`:

```
<div className="bg-maynas-paper min-h-screen flex flex-col">
  <Header />
  <main className="flex-grow pt-20 md:pt-36">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      ... secciones ...
    </div>
  </main>
  <Footer />
</div>
```

Encabezado de sección reutilizando `SectionHeader` (`eyebrow` rojo uppercase + título navy extrabold + borde inferior rojo 3px).

---

## 4. Reestructuración de apartados

1. **Hero** — slider react-slick contenido en `max-w-7xl rounded-xl h-[420px] sm:h-[480px] md:h-[560px] lg:h-[640px]`, título "Integridad Institucional" en badge `bg-maynas-navy/85 backdrop-blur-sm` abajo-izquierda (patrón `Carrousel.jsx`). Se eliminan 100vh y márgenes negativos.

2. **Integridad pública** — `SectionHeader` "Marco institucional" / "Integridad pública". Grid `lg:grid-cols-5`:
   - Card blanca (col-span-3) "Función de integridad": párrafos + 3 bullets.
   - Card navy (col-span-2) "Objetivos": checklist en 2 columnas con checks rojos.

3. **Conceptos clave** — `SectionHeader` "Conceptos clave" / "El modelo en 4 ideas". Grid `md:grid-cols-2` de cards blancas con `border-t-2 border-maynas-red` (patrón `Vistos.jsx`): Cultura de integridad · Índice de capacidad preventiva · Enfoque de integridad · Programa de integridad.

4. **Difusiones y noticias** — `SectionHeader` "Actualidad" / "Difusiones y noticias". Cards de noticias patrón Home: destacada navy + grid de secundarias, "Ver más →" rojo. Modal estilo Home (overlay `bg-black/70`, cierre con `Escape` y click fuera, `rounded-lg`).

5. **UFII — Funciones** — `SectionHeader` "UFII" / "Unidad Funcional de Integridad". Grid `md:grid-cols-2 lg:grid-cols-3` con las 13 funciones numeradas. **Elemento signature**: numerales Archivo extrabold grandes en rojo — la numeración es genuina (enumeración legal), no decorativa.

6. **Normativas** — `SectionHeader` "Marco legal" / "Normativas". Card blanca con barra de filtros (input detalle + selects mes/año/categoría en Tailwind). Tabla rediseñada: `thead` navy, badge de categoría (rojo = Nacional / navy = Institucional), botón "Ver PDF" navy `hover:bg-maynas-red`, contador de resultados. Misma lógica de filtros y array `data`.

7. **Programa de integridad** — banda full-width `bg-maynas-navy` con texto blanco: "Programa de integridad", "Componentes del modelo de integridad", "Material informativo" como botones outline blancos (se elimina el amarillo, fuera de paleta). Imagen del modelo en card blanca.

---

## 5. Reglas de implementación

- **Cero Bulma, cero estilos inline, cero márgenes negativos** — solo clases Tailwind con paleta `maynas-*` y fuentes `font-display` / `font-sans`.
- Contenido textual, array `data`, `noticias`, imports de PDF, lógica de filtros y modal: **sin cambios funcionales**.
- Responsive: grids colapsan a 1 columna en móvil; foco de teclado visible en botones/enlaces.
- Mantener `sliderImages` y `settings` del slider (react-slick).

---

## 6. Archivos a modificar

| Archivo | Repo | Acción | Motivo |
|---|---|---|---|
| `src/components/header/integridad.jsx` | front | modificado | Reescritura del JSX/estilos a Tailwind (misma data/lógica). |
| `src/components/css/integridad.css` | front | eliminado | Queda huérfano tras quitar su import; `bulma-scoped.css` NO se toca (lo usa `boletin.jsx`). |

---

## 7. Verificación

- `pnpm run build` → confirmar que compila sin el CSS eliminado.
- `pnpm run lint` → 0 errores nuevos en `integridad.jsx`.
- Revisión visual del hero contenido y de las secciones en desktop/móvil.

---

## 8. Lecciones / notas de diseño (frontend-design)

- **La numeración 01–13 de las UFII es genuina** (enumeración legal de funciones), por lo que un grid numerado con numerales grandes es estructural y no decorativo.
- **Boldness en un solo lugar**: el grid numerado de UFII es el elemento memorable; el resto se mantiene silencioso y disciplinado sobre la paleta de la Home.
- **Paleta respetada al 100%**: no se introducen colores externos (el amarillo del "Material informativo" se reemplaza por outline blanco/rojo).
- **Consistencia con la Home**: mismo esqueleto (`max-w-7xl`, `pt-20 md:pt-36`, `SectionHeader`, patrón de cards), lo que refuerza la identidad del portal.
