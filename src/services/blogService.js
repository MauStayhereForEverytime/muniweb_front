import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

export const fetchBlogs = async () => {
  try {
    const response = await axios.get(apiUrl + 'api/blogs/');
    const data = JSON.parse(response.data);
    return data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
};

export const fetchBlogById = async (id) => {
  try {
    const response = await axios.get(apiUrl + `api/blogs/${id}`);
    const data = JSON.parse(response.data);
    return data;
  } catch (error) {
    console.error('Error fetching blog by ID:', error.response ? error.response.data : error.message);
    return null;
  }
};

const buildFormData = (payload) => {
  const fd = new FormData();
  if (payload.new_txt_tittle !== undefined) fd.append('new_txt_tittle', payload.new_txt_tittle || '');
  if (payload.new_txt_description !== undefined) fd.append('new_txt_description', payload.new_txt_description || '');
  if (payload.new_txt_content !== undefined) fd.append('new_txt_content', payload.new_txt_content || '');
  if (payload.new_txt_urlimage instanceof File) fd.append('new_txt_urlimage', payload.new_txt_urlimage);
  if (payload.new_txt_state !== undefined) fd.append('new_txt_state', payload.new_txt_state || 'ACTIVO');
  if (payload.ctn_int_id !== undefined) fd.append('ctn_int_id', payload.ctn_int_id);
  return fd;
};

export const createBlog = async (newBlog) => {
  try {
    const fd = buildFormData(newBlog);
    const response = await axios.post(apiUrl + 'blogs/add', fd);
    return response.data;
  } catch (error) {
    console.error('Error creating blog:', error);
    return null;
  }
};

export const deleteBlog = async (id) => {
  try {
    const response = await axios.delete(apiUrl + `blogs/${id}/delete/`);
    return response.status === 204;
  } catch (error) {
    console.error('Error deleting blog:', error);
    return false;
  }
};

export const updateBlog = async (id, updatedBlog) => {
  try {
    const fd = buildFormData(updatedBlog);
    const response = await axios.put(apiUrl + `blogs/${id}/edit/`, fd);
    return response.data;
  } catch (error) {
    console.error('Error updating blog:', error);
    return null;
  }
};