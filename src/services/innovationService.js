import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

export const mediaUrl = (path) => (path ? `${apiUrl.replace(/\/$/, '')}${path}` : '');

export const fetchInnovations = async () => {
  try {
    const response = await axios.get(apiUrl + 'api/innovations/');
    const data = JSON.parse(response.data);
    return data;
  } catch (error) {
    console.error('Error fetching innovations:', error);
    return [];
  }
};

export const fetchInnovationById = async (id) => {
  try {
    const response = await axios.get(apiUrl + `api/innovations/${id}`);
    const data = JSON.parse(response.data);
    return data;
  } catch (error) {
    console.error('Error fetching innovation by ID:', error.response ? error.response.data : error.message);
    return null;
  }
};

const buildFormData = (payload) => {
  const fd = new FormData();
  if (payload.inn_txt_tittle !== undefined) fd.append('inn_txt_tittle', payload.inn_txt_tittle || '');
  if (payload.inn_txt_description !== undefined) fd.append('inn_txt_description', payload.inn_txt_description || '');
  if (payload.inn_txt_image instanceof File) fd.append('inn_txt_image', payload.inn_txt_image);
  return fd;
};

export const createInnovation = async (newInnovation) => {
  try {
    const fd = buildFormData(newInnovation);
    const response = await axios.post(apiUrl + 'innovations/add', fd);
    return response.data;
  } catch (error) {
    console.error('Error creating innovation:', error);
    return null;
  }
};

export const deleteInnovation = async (id) => {
  try {
    const response = await axios.delete(apiUrl + `innovations/${id}/delete/`);
    return response.status === 204;
  } catch (error) {
    console.error('Error deleting innovation:', error);
    return false;
  }
};

export const updateInnovation = async (id, updatedInnovation) => {
  try {
    const fd = buildFormData(updatedInnovation);
    const response = await axios.put(apiUrl + `innovations/${id}/edit/`, fd);
    return response.data;
  } catch (error) {
    console.error('Error updating innovation:', error);
    return null;
  }
};