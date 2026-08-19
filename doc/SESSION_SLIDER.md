# Resumen de sesión — Slider del Home + migración a `/media/`

**Fecha:** 18-19 ago 2026
**Alcance:** Slider del Home público + panel admin (carrusel/modal) + migración global de imágenes a archivos en disco en todo el backend.

---

## 1. Slider del Home público (`Carrousel.jsx`)

### Problema inicial
- Slider muy pequeño (`h-64` en placeholder, sin altura definida con datos).
- Aparecía full-bleed y se deformaba en pantallas grandes.
- Permitía editar/agregar/eliminar imágenes desde el Home público (no deseado).
- Movimiento visual con apilamiento vertical (slides stackeadas en vez de horizontal).
- Estilo "boletín" (`border-radius`, `border`, `box-shadow` en `.slick-slide img`) filtrado desde `boletin.css` global.
- Caption (`ima_txt_name`) cortado/pegado al fondo sin legibilidad.

### Cambios aplicados
- **`Carrousel.jsx`**:
  - Wrapper con `max-w-7xl mx-auto h-[420px] sm:h-[480px] md:h-[560px] lg:h-[640px] overflow-hidden bg-gray-200 rounded-xl`.
  - Eliminados botones `Agregar / Editar / Eliminar` del Home público (solo lectura).
  - Removidas dependencias `AddImageModal`, `EditImageModal`, `handleDelete`, `handleEdit`, `refreshImages` (CRUD vive solo en el panel admin).
  - Slider configurado explícitamente horizontal: `vertical: false`, `verticalSwiping: false`, `rtl: false`, `fade: false`, `autoplay: true (5s)`, `pauseOnHover: true`, `pauseOnFocus: true`, `cssEase: 'ease-in-out'`.
  - Flechas personalizadas `<PrevArrow />` / `<NextArrow />` con `FaChevronLeft/Right` para confirmar flujo L→R.
  - Caption mejorado: `from-maynas-navy via-maynas-navy/85 to-maynas-navy/0`, `pb-10 md:pb-14 pt-24 md:pt-32`, `text-xl md:text-2xl lg:text-3xl`, `drop-shadow-lg`, `line-clamp-2`, `max-w-3xl`.
  - `src` de la imagen: `mediaUrl(image.ima_txt_urlpath)` (URL absoluta del backend) en vez de `data:image/jpeg;base64,...`.
  - Quitado `import React` innecesario (lint).

- **`home-carousel.css` (nuevo)** — clase scope `.home-carousel-scope`:
  - `width: 100%` en wrapper.
  - `.slick-slider / .slick-list / .slick-track / .slick-slide { height: 100% }` (fuerza cadena de alturas; antes colapsaba y producía stack vertical).
  - `.slick-list { overflow: hidden; border-radius: 0.75rem }`.
  - `.slick-slide { width: 100%; display: block }` (evita wrapping).
  - `.slick-slide img { width:100% !important; height:100% !important; object-fit:cover !important; border:none !important; border-radius:0 !important; box-shadow:none !important }` (override del bleed de `boletin.css`).
  - `.slick-dots` styling con dots blancos sobre el carrusel.

---

## 2. Panel admin — nueva sección "Carrusel"

### Problema
- `Dashboard.jsx > Imágenes` solo tenía "Modal de Inicio".
- El carrusel solo se podía gestionar desde el Home público (botones cuando `localStorage.getItem('id') != null`).

### Cambios aplicados
- **Nuevo componente `src/components/administrable/imagenes/CarruselImages.jsx`** (clona patrón de `Modal1.jsx`):
  - Lista todas las imágenes del carrusel con preview (`mediaUrl`).
  - Formulario "Agregar Imagen" SIEMPRE visible (no condicionado a `images.length === 0` como en `Modal1`).
  - Modal de edición con preview del archivo seleccionado.
  - Validación de dimensiones al subir (lee `naturalWidth/Height` con `Image()`):
    - **Recomendado**: `1920×720 px` (ratio 2.67:1)
    - **Mínimo**: `1600×600 px`
    - **Máximo**: `2560×1080 px`
    - **Peso máximo**: `3 MB`
  - Aviso visual verde (adecuado) o rojo (menor al mínimo / excede máximo / pesa mucho) con texto específico.

- **`src/pages/Dashboard.jsx`** — menú lateral:
  - Submenú "Imágenes" ahora con dos ítems: **Carrusel** (primero) y Modal de Inicio.
  - Registrado import `import CarruselImages from '../components/administrable/imagenes/CarruselImages';`.
  - Removido `import Home` sin usar (fix lint).

---

## 3. Migración global de imágenes a `/media/` (backend + frontend)

### Problema raíz
- `muniweb_images.ima_txt_urlpath`, `muniweb_news.new_txt_urlimage`, `muniweb_innovation.inn_txt_image` eran `TextField` que guardaban **base64** completo en la DB.
- Imágenes de ~300 KB → ~400 KB de texto en DB → JSON responses pesados, no cacheables, sin CDN.

### Cambios backend (`muniweb_back`)

- **`settings.py`**: agregados
  ```python
  MEDIA_URL = '/media/'
  MEDIA_ROOT = BASE_DIR / 'media'
  ```

- **`urls.py`**: servir archivos subidos solo en DEBUG:
  ```python
  if settings.DEBUG:
      urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
  ```

- **`models.py`**: 3 campos migrados de `TextField` (base64) a `FileField`:
  - `Image.ima_txt_urlpath` → `FileField(upload_to='images/')`
  - `News.new_txt_urlimage` → `FileField(upload_to='news/')`
  - `Innovation.inn_txt_image` → `FileField(upload_to='innovation/')`

- **`views.py`**: agregados parsers multipart a TODOS los endpoints que reciben archivos:
  ```python
  from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
  from rest_framework.decorators import api_view, parser_classes

  @parser_classes([MultiPartParser, FormParser, JSONParser])
  def add_carrousel_image(request): ...
  ```
  Endpoints afectados: `add_carrousel_image`, `edit_carrousel_image`, `add_modal_image`, `edit_modal_image`, `add_event_image`, `edit_event_image`, `add_news`, `update_news`, `add_blog`, `update_blog`, `add_innovation`, `update_innovation`.

  Refactorizado `add_modal_image` (antes creaba el objeto manualmente con base64) para usar `ImageSerializer`.

- **Migración Django**: generada y aplicada.
  ```bash
  python manage.py makemigrations
  # 0003_alter_image_ima_txt_urlpath_and_more
  python manage.py migrate  # OK
  python manage.py check     # 0 issues
  ```

- **Limpieza de datos viejos (base64)**: ejecutado
  ```bash
  python manage.py shell -c "from muniweb_backend.models import Image, News, Innovation; Image.objects.all().delete(); News.objects.all().delete(); Innovation.objects.all().delete()"
  # Image: 2 → 0, News: 0 → 0, Innovation: 0 → 0
  ```

### Cambios frontend (`muniweb_front`)

**Servicios** — ahora envían `FormData` con el archivo real (no base64):
- `src/services/carrouselService.js`: exporta `mediaUrl(path)` helper; `addImage`/`editImage` construyen `FormData` con `ima_txt_urlpath: File`.
- `src/services/newsService.js`: helper `mediaUrl`; `createNews`/`updateNews` usan `FormData`.
- `src/services/innovationService.js`: helper `mediaUrl`; `createInnovation`/`updateInnovation` usan `FormData`.
- `src/services/eventService.js`: helper `mediaUrl`; `addEventImage`/`editEventImage` usan `FormData`.
- `src/services/blogService.js`: `createBlog`/`updateBlog` usan `FormData`.

**Componentes actualizados** (todos usan `mediaUrl()` para `src` y `File` para upload, previews con `URL.createObjectURL`):

Público Home:
- `src/components/home/carrousel/Carrousel.jsx`
- `src/components/home/eventos/Eventos.jsx`
- `src/components/home/eventos/EventosInfo.jsx`
- `src/components/home/eventos/EventosTodos.jsx`
- `src/components/home/Modal.jsx`

Admin:
- `src/components/administrable/imagenes/CarruselImages.jsx` (nuevo)
- `src/components/administrable/imagenes/Modal1.jsx`
- `src/components/home/eventos/AddEventImageModal.jsx`
- `src/components/home/eventos/EditEventImageModal.jsx`

Noticias / Innovación / Blog:
- `src/pages/Home.jsx` (`getImageSrc` ahora usa `mediaUrl`)
- `src/pages/Innovation.jsx`, `src/pages/Blog.jsx`
- `src/components/noticias/NewsList.jsx`, `NewsInfo.jsx`, `NewsItem.jsx`
- `src/components/Innovacion/InnovationList.jsx`, `InnovationInfo.jsx`
- `src/components/blog/BlogList.jsx`, `BlogInfo.jsx`

**Cambios en payloads**: el frontend ya no envía `fields: {...}` anidado para carrusel/modal/eventos (que Django extraía manualmente). Ahora envía el objeto plano con el `File` directo, y el `ImageSerializer` se encarga.

---

## 4. Recomendaciones de tamaño de imagen

| Uso              | Tamaño óptimo | Mínimo aceptable | Máximo | Peso máx |
|------------------|---------------|------------------|--------|----------|
| Slider carrusel  | 1920×720 px (ratio 2.67:1) | 1600×600 px | 2560×1080 | 3 MB |
| Modal de inicio  | 800×600 px   | 600×400 px       | 1920×1080 | 3 MB |
| Noticias         | 1200×675 px (16:9) | 800×450 px | 1920×1080 | 3 MB |
| Innovación       | 800×800 px (cuadrada) | 600×600 | 1200×1200 | 3 MB |

Imágenes detectadas actualmente en `media/images/`:
- `serey-kim-xjrvTc52xYc-unsplash.jpg` → **7708×3036 px, ratio 2.54:1, 2.8 MB** ← excede máximo en dimensiones (2560×1080), **redimensionar**.
- `ChatGPT_Image_18_ago_2026_13_50_40.png` → **1717×916 px, ratio 1.87:1, 2.3 MB** ← dentro de los límites.

---

## 5. Verificación

- `pnpm run lint`: warnings pre-existentes en archivos no tocados; los archivos modificados no introdujeron errores nuevos.
- `pnpm run build`: ✓ built in ~4.2s
- `python manage.py check`: ✓ System check identified no issues
- `python manage.py migrate`: ✓ OK

## 6. Próximos pasos sugeridos

1. **Redimensionar** la imagen de Unsplash (`7708×3036`) a `1920×720` con ImageMagick:
   `convert input.jpg -resize 1920x720^ -gravity center -crop 1920x720+0+0 +repage output.jpg`
2. Limpiar archivos físicos en `media/` después de borrar y volver a subir.
3. Considerar agregar `Pillow` (PIL) en el backend para auto-redimensionar imágenes al subir (opcional, ahorra ancho de banda del usuario).
4. Configurar `nginx` para servir `/media/` directamente en producción (fuera de DEBUG de Django).
5. Considerar usar `django-storages` + S3/CDN para producción.

---

## 7. Título fijo del slider + flag `showtitle` (19 ago 2026)

### Problema
- El caption ("test") se salía del marco del slider porque estaba dentro de cada `<div>` de slide que no propagaba la altura del contenedor.
- Caption dependía de la imagen activa (cambiaba con el slide).
- No había forma de ocultar el título para imágenes donde no aporta valor (banners decorativos).

### Cambios aplicados

**`Carrousel.jsx` (público)**:
- Caption **extraído del slide** → ahora es un **overlay fijo** sobre todo el slider (mismo caption aunque cambien las imágenes).
- Posición: `absolute left-4 md:left-6 lg:left-8 bottom-16 md:bottom-20` (esquina inferior izquierda, siempre visible).
- Estilo: `bg-maynas-navy/85 backdrop-blur-sm px-4 md:px-6 py-2 md:py-3 rounded-lg shadow-lg` — caja con fondo oscuro semi-transparente + blur, garantiza legibilidad sobre cualquier imagen.
- Tipografía: `text-lg md:text-xl lg:text-2xl`, `line-clamp-2`, `drop-shadow`, `max-w-[60%] md:max-w-[50%]`.
- `home-carousel.css`: dots centrados con `left: 50%; transform: translateX(-50%)` para no solapar con el título.

### Backend: flag por imagen

- **`models.py`**: nuevo campo en `Image`:
  ```python
  ima_boo_showtitle = models.BooleanField(default=True)
  ```
- **Migración `0004_image_ima_boo_showtitle`** generada y aplicada.
- `ImageSerializer` (`fields = '__all__'`) expone el campo automáticamente.

### Frontend: checkbox "Mostrar título en el slider"

- **`CarruselImages.jsx`** (admin):
  - State inicial `newImage`: `ima_boo_showtitle: true`.
  - Checkbox `<input type="checkbox">` con label **"Mostrar título en el slider"** debajo del input de descripción (formulario principal y modal de edición).
  - Reset a `true` después de guardar.
  - Checkbox de edición usa `editImageData.ima_boo_showtitle !== false` (compatibilidad con imágenes que aún no tengan el campo).

- **`Carrusel.jsx` (público)**: condiciona el render del caption:
  ```jsx
  const showTitle = currentImage && currentImage.ima_txt_name && currentImage.ima_boo_showtitle !== false;
  ```

### Fix: `The submitted data was not a file`

**Problema**: al editar sin subir archivo nuevo, `editImageData.ima_txt_urlpath` mantenía la URL string de la imagen existente. El FormData enviaba ese string al backend `FileField`, que lo rechazaba con `The submitted data was not a file`.

**Solución** (defensa en dos capas):

1. **`CarruselImages.jsx`** y **`Modal1.jsx`**:
   - Al abrir el modal: `setEditImage({ ...image, ima_txt_urlpath: null })`.
   - `setEditImagePreview(image.ima_txt_urlpath || null)` para mostrar preview de la imagen actual sin enviar el string.

2. **Servicios** — agregado `instanceof File` como guarda:
   - `carrouselService.js`: `if (imageData.ima_txt_urlpath instanceof File) fd.append(...)`.
   - `eventService.js`, `newsService.js`, `innovationService.js`, `blogService.js`: misma guarda con el campo correspondiente.

   Esto garantiza que **solo** se envíe el campo cuando es un archivo real; cualquier string (URL existente) se omite y el backend con `partial=True` mantiene la imagen anterior.

---

## 8. Resumen de archivos modificados en esta sesión

### Backend
- `muniweb_back/muniweb_backend/settings.py` — `MEDIA_URL`, `MEDIA_ROOT`.
- `muniweb_back/muniweb_backend/urls.py` — servir `/media/` en DEBUG.
- `muniweb_back/muniweb_backend/models.py` — 3 `TextField`→`FileField` + `ima_boo_showtitle`.
- `muniweb_back/muniweb_backend/views.py` — `@parser_classes([MultiPartParser, FormParser, JSONParser])` en CRUDs.
- `muniweb_back/muniweb_backend/migrations/0003_*` — migración a FileField.
- `muniweb_back/muniweb_backend/migrations/0004_*` — migración campo `ima_boo_showtitle`.

### Frontend
- `muniweb_front/src/components/home/carrousel/Carrousel.jsx` — slider público (wrapper max-w, caption fijo izquierdo).
- `muniweb_front/src/components/home/carrousel/home-carousel.css` — scope CSS + dots centrados.
- `muniweb_front/src/components/administrable/imagenes/CarruselImages.jsx` — admin carrusel (nuevo).
- `muniweb_front/src/components/administrable/imagenes/Modal1.jsx` — limpia urlpath al editar.
- `muniweb_front/src/pages/Dashboard.jsx` — submenú Carrusel + Modal.
- `muniweb_front/src/components/home/Modal.jsx`, `Eventos.jsx`, `EventosInfo.jsx`, `EventosTodos.jsx` — `mediaUrl()`.
- `muniweb_front/src/pages/Home.jsx`, `Innovation.jsx`, `Blog.jsx` — `mediaUrl()` + FormData.
- `muniweb_front/src/components/noticias/News*.jsx`, `Innovacion/Innovation*.jsx`, `blog/Blog*.jsx` — `mediaUrl()`.
- `muniweb_front/src/components/home/eventos/AddEventImageModal.jsx`, `EditEventImageModal.jsx` — FormData.
- `muniweb_front/src/services/*.js` (5 archivos) — `FormData` con `instanceof File` guarda.

### Verificación final
- `python manage.py check`: ✓ 0 issues
- `pnpm run lint`: warnings pre-existentes; archivos modificados sin nuevos errores
- `pnpm run build`: ✓ ~4.2s