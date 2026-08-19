import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

export const mediaUrl = (path) => {
  if (!path) return '';
  const p = String(path);
  if (/^https?:\/\//i.test(p)) return p;
  const base = apiUrl.replace(/\/$/, '');
  if (p.startsWith('/media/')) return `${base}${p}`;
  return `${base}/media/${p.replace(/^\//, '')}`;
};

export const fetchNews = async () => {
  try {
    const response = await axios.get(apiUrl + 'api/news');
    const data = JSON.parse(response.data);
    return data;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};

export const fetchNewsById = async (id) => {
  try {
    const response = await axios.get(apiUrl + `api/news/${id}`);
    const data = JSON.parse(response.data);
    return data;
  } catch (error) {
    console.error('Error fetching news by ID:', error.response ? error.response.data : error.message);
    return null;
  }
};

const buildFormData = (payload) => {
  const fd = new FormData();
  if (payload.new_txt_tittle !== undefined) fd.append('new_txt_tittle', payload.new_txt_tittle || '');
  if (payload.new_txt_description !== undefined) fd.append('new_txt_description', payload.new_txt_description || '');
  if (payload.new_txt_content !== undefined) fd.append('new_txt_content', payload.new_txt_content || '');
  if (payload.new_txt_urlimage instanceof File) fd.append('new_txt_urlimage', payload.new_txt_urlimage);
  if (payload.ctn_int_id !== undefined) fd.append('ctn_int_id', payload.ctn_int_id);
  if (payload.new_txt_state !== undefined) fd.append('new_txt_state', payload.new_txt_state);
  return fd;
};

export const createNews = async (newNews) => {
  try {
    const fd = buildFormData(newNews);
    const response = await axios.post(apiUrl + 'news/add', fd);
    return response.data;
  } catch (error) {
    console.error('Error creating news:', error);
    return null;
  }
};

export const deleteNews = async (id) => {
  try {
    const response = await axios.delete(apiUrl + `news/${id}/delete/`);
    return response.status === 204;
  } catch (error) {
    console.error('Error deleting news:', error);
    return false;
  }
};

export const updateNews = async (id, updatedNews) => {
  try {
    const fd = buildFormData(updatedNews);
    const response = await axios.put(apiUrl + `news/${id}/edit/`, fd);
    return response.data;
  } catch (error) {
    console.error('Error updating news:', error);
    return null;
  }
};