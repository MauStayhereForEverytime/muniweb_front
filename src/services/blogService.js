import axios from 'axios';

// Función para obtener todos los blogs

const apiUrl = import.meta.env.VITE_API_URL;

export const fetchBlogs = async () => {
  try {
    const response = await axios.get(apiUrl+'api/blogs/');
    const data = JSON.parse(response.data);  // Parseamos el string JSON para convertirlo en un array
    console.log("Data parsed:", data);  // Asegúrate de que el resultado después de parsear sea un array
    return data;  // Ahora deberíamos tener un array de objetos
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];  // En caso de error, devolvemos un array vacío
  }
};

// Función para obtener un blog por su ID
export const fetchBlogById = async (id) => {
  try {
    console.log(`Fetching blog with ID: ${id}`);
    const response = await axios.get(apiUrl+`api/blogs/${id}`);
    console.log("Response received:", response);
    const data = JSON.parse(response.data);
    console.log("Parsed data:", data);
    return data;
  } catch (error) {
    console.error('Error fetching blog by ID:', error.response ? error.response.data : error.message);
    return null;
  }
};

// **Función para crear un nuevo blog**
export const createBlog = async (newBlog) => {
  try {
    const response = await axios.post(apiUrl+'blogs/add', newBlog);
    console.log("New blog added:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating blog:', error);
    return null;
  }
};

// **Función para eliminar un blog**
export const deleteBlog = async (id) => {
  try {
    const response = await axios.delete(apiUrl+`blogs/${id}/delete/`);
    console.log("Blog deleted:", response.data);
    return response.status === 204;  // Retorna true si la eliminación fue exitosa
  } catch (error) {
    console.error('Error deleting blog:', error);
    return false;
  }
};

// **Función para editar un blog**
export const updateBlog = async (id, updatedBlog) => {
  try {
    const response = await axios.put(apiUrl+`blogs/${id}/edit/`, updatedBlog);
    console.log("Blog updated:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating blog:', error);
    return null;
  }
};
