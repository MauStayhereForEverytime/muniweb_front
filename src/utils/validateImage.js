// Validación client-side de imágenes subidas (Fase 3, hallazgo A3).
// Es solo UX/feedback temprano: la validación REAL ocurre en el backend
// (muniweb_backend/validators.py). Mantenir ambos en sincronía.

export const MAX_UPLOAD_SIZE = 5 * 1024 * 1024; // 5 MB, igual que el back

const ALLOWED = {
  '.jpg': ['image/jpeg', 'image/jpg', 'image/pjpeg'],
  '.jpeg': ['image/jpeg', 'image/jpg', 'image/pjpeg'],
  '.png': ['image/png'],
  '.gif': ['image/gif'],
  '.webp': ['image/webp'],
};

// Devuelve un mensaje de error legible o null si el archivo es aceptable.
export function validateImageFile(file) {
  if (!file) return null;
  const name = (file.name || '').toLowerCase();
  const ext = name.slice(name.lastIndexOf('.'));
  if (!ALLOWED[ext]) {
    return `Tipo de archivo no permitido "${ext || '(sin extensión)'}". Solo se aceptan imágenes: ${Object.keys(ALLOWED).join(', ')}.`;
  }
  if (file.type && !ALLOWED[ext].includes(file.type)) {
    return `El tipo declarado (${file.type}) no corresponde a una imagen ${ext}.`;
  }
  if (file.size > MAX_UPLOAD_SIZE) {
    return `El archivo pesa ${(file.size / (1024 * 1024)).toFixed(1)} MB; el máximo permitido es ${MAX_UPLOAD_SIZE / (1024 * 1024)} MB.`;
  }
  return null;
}

// Para inputs type="file": devuelve el File válido o null (avisa y limpia el input si no).
export function pickValidImageFile(e) {
  const file = e.target.files && e.target.files[0];
  const error = validateImageFile(file);
  if (error) {
    alert(error);
    e.target.value = '';
    return null;
  }
  return file;
}
