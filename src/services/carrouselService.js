// src/services/carrouselService.js
const apiUrl = import.meta.env.VITE_API_URL;
const API_URL = apiUrl + 'carrousel-images';

// Construye la URL absoluta hacia el backend para servir archivos de /media/
export const mediaUrl = (path) => {
  if (!path) return '';
  const p = String(path);
  if (/^https?:\/\//i.test(p)) return p;
  const base = apiUrl.replace(/\/$/, '');
  if (p.startsWith('/media/')) return `${base}${p}`;
  return `${base}/media/${p.replace(/^\//, '')}`;
};

export const fetchImages = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
};

const buildFormData = (imageData) => {
  const fd = new FormData();
  if (imageData.ima_txt_name !== undefined) fd.append('ima_txt_name', imageData.ima_txt_name || '');
  if (imageData.ima_txt_description !== undefined) fd.append('ima_txt_description', imageData.ima_txt_description || '');
  // Solo enviar ima_txt_urlpath si es un File real (instancia de File/Blob).
  // Si es string (URL/ruta existente), omitir para que el backend mantenga la imagen anterior.
  if (imageData.ima_txt_urlpath instanceof File) {
    fd.append('ima_txt_urlpath', imageData.ima_txt_urlpath);
  }
  if (imageData.ima_boo_showtitle !== undefined) fd.append('ima_boo_showtitle', imageData.ima_boo_showtitle ? 'true' : 'false');
  return fd;
};

export const addImage = async (imageData) => {
  try {
    const response = await fetch(`${API_URL}/add`, {
      method: 'POST',
      body: buildFormData(imageData),
    });
    return await response.json();
  } catch (error) {
    console.error('Error adding image:', error);
  }
};

export const editImage = async (id, imageData) => {
  try {
    const response = await fetch(`${API_URL}/edit/${id}`, {
      method: 'PUT',
      body: buildFormData(imageData),
    });
    return await response.json();
  } catch (error) {
    console.error('Error updating image:', error);
  }
};

export const deleteImage = async (id) => {
  try {
    const response = await fetch(`${API_URL}/delete/${id}`, {
      method: 'DELETE',
    });
    return await response.json();
  } catch (error) {
    console.error('Error deleting image:', error);
  }
};