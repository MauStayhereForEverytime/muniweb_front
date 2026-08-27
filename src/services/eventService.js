import axios from 'axios';
import apiClient from '../api/api';

const apiUrl = import.meta.env.VITE_API_URL;
const API_URL = apiUrl + 'event-images';

export const mediaUrl = (path) => {
  if (!path) return '';
  const p = String(path);
  if (/^https?:\/\//i.test(p)) return p;
  const base = apiUrl.replace(/\/$/, '');
  if (p.startsWith('/media/')) return `${base}${p}`;
  return `${base}/media/${p.replace(/^\//, '')}`;
};

export const fetchEventImages = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching event images:', error);
    return [];
  }
};

export const fetchEventVisibility = async () => {
  try {
    const response = await axios.get(`${apiUrl}event-visibility`);
    return response.data?.visible !== false;
  } catch (error) {
    console.error('Error fetching event visibility:', error);
    return true;
  }
};

export const updateEventVisibility = async (visible) => {
  try {
    const response = await apiClient.put(
      `${apiUrl}event-visibility/update`,
      { visible },
      { requiresAuth: true }
    );
    return response.data?.visible ?? visible;
  } catch (error) {
    console.error('Error updating event visibility:', error);
    throw error;
  }
};

const buildFormData = (imageData) => {
  const fd = new FormData();
  if (imageData.ima_txt_name !== undefined) fd.append('ima_txt_name', imageData.ima_txt_name || '');
  if (imageData.ima_txt_description !== undefined) fd.append('ima_txt_description', imageData.ima_txt_description || '');
  if (imageData.ima_txt_urlgob !== undefined) fd.append('ima_txt_urlgob', imageData.ima_txt_urlgob || '');
  if (imageData.ima_txt_urlpath instanceof File) fd.append('ima_txt_urlpath', imageData.ima_txt_urlpath);
  return fd;
};

export const addEventImage = async (imageData) => {
  try {
    const response = await apiClient.post(`${API_URL}/add`, buildFormData(imageData), { requiresAuth: true });
    return response.data;
  } catch (error) {
    console.error('Error adding event image:', error);
    throw error;
  }
};

export const editEventImage = async (id, updatedData) => {
  try {
    const response = await apiClient.put(`${API_URL}/edit/${id}`, buildFormData(updatedData), { requiresAuth: true });
    return response.data;
  } catch (error) {
    console.error('Error editing event image:', error);
    throw error;
  }
};

export const deleteEventImage = async (id) => {
  try {
    const response = await apiClient.delete(`${API_URL}/delete/${id}`, { requiresAuth: true });
    return response.data;
  } catch (error) {
    console.error('Error deleting event image:', error);
    throw error;
  }
};

export const fetchEventImageById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    const data = JSON.parse(response.data);
    return data[0];
  } catch (error) {
    console.error('Error fetching event image by ID:', error);
    return null;
  }
};