// src/services/carrouselService.js
import apiClient from '../api/api';

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
    const response = await apiClient.get(API_URL);
    return Array.isArray(response.data) ? response.data : [];
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
    const response = await apiClient.post(`${API_URL}/add`, buildFormData(imageData), { requiresAuth: true });
    return response.data;
  } catch (error) {
    console.error('Error adding image:', error);
  }
};

export const editImage = async (id, imageData) => {
  try {
    const response = await apiClient.put(`${API_URL}/edit/${id}`, buildFormData(imageData), { requiresAuth: true });
    return response.data;
  } catch (error) {
    console.error('Error updating image:', error);
  }
};

export const deleteImage = async (id) => {
  try {
    const response = await apiClient.delete(`${API_URL}/delete/${id}`, { requiresAuth: true });
    return response.data;
  } catch (error) {
    console.error('Error deleting image:', error);
  }
};