import axios from 'axios';

// Función para obtener todas las noticias

const apiUrl = import.meta.env.VITE_API_URL;
export const fetchNews = async () => {
  try {
    const response = await axios.get(apiUrl+'api/news');
    const data = JSON.parse(response.data);  // Parseamos el string JSON para convertirlo en un array
    console.log("Data parsed:", data);  // Asegúrate de que el resultado después de parsear sea un array
    return data;  // Ahora deberíamos tener un array de objetos
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];  // En caso de error, devolvemos un array vacío
  }
};

// Función para obtener una noticia por su ID
export const fetchNewsById = async (id) => {
  try {
    console.log(`Fetching news with ID: ${id}`);  // Log para verificar el ID que se está solicitando
    const response = await axios.get(apiUrl+`api/news/${id}`);
    console.log("Response received:", response);  // Verifica la respuesta completa
    const data = JSON.parse(response.data);  // Si es necesario, parsear el JSON
    console.log("Parsed data:", data);  // Verifica los datos después de parsearlos
    return data;
  } catch (error) {
    console.error('Error fetching news by ID:', error.response ? error.response.data : error.message);
    return null;
  }
};

// **Función para crear una nueva noticia**
export const createNews = async (newNews) => {
  try {
    const response = await axios.post(apiUrl+'news/add', newNews);
    console.log("New news added:", response.data);  // Log para verificar la respuesta de la creación
    return response.data;
  } catch (error) {
    console.error('Error creating news:', error);
    return null;  // Si ocurre un error, devuelve null
  }
};

// **Función para eliminar una noticia**
export const deleteNews = async (id) => {
  try {
    const response = await axios.delete(apiUrl+`news/${id}/delete/`);
    console.log("News deleted:", response.data);  // Log para verificar la respuesta de la eliminación
    return response.status === 204;  // Retorna true si la respuesta es 204 No Content (eliminación exitosa)
  } catch (error) {
    console.error('Error deleting news:', error);
    return false;  // Si ocurre un error, devuelve false
  }
};


// **Función para editar una noticia**
export const updateNews = async (id, updatedNews) => {
  try {
    const response = await axios.put(apiUrl+`news/${id}/edit/`, updatedNews);
    console.log("News updated:", response.data);  // Log para verificar la respuesta de la actualización
    return response.data;  // Retorna los datos actualizados de la noticia
  } catch (error) {
    console.error('Error updating news:', error);
    return null;  // Si ocurre un error, devuelve null
  }
};
