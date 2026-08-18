import axios from 'axios';

// Función para obtener todas las innovaciones
const apiUrl = import.meta.env.VITE_API_URL;
export const fetchInnovations = async () => {
  try {
    const response = await axios.get(apiUrl+'api/innovations/');
    const data = JSON.parse(response.data);  // Parseamos el string JSON para convertirlo en un array
    console.log("Innovations parsed:", data);  // Asegúrate de que el resultado después de parsear sea un array
    return data;  // Ahora deberíamos tener un array de objetos
  } catch (error) {
    console.error('Error fetching innovations:', error);
    return [];  // En caso de error, devolvemos un array vacío
  }
};

// Función para obtener una innovación por su ID
export const fetchInnovationById = async (id) => {
  try {
    console.log(`Fetching innovation with ID: ${id}`);
    const response = await axios.get(apiUrl+`api/innovations/${id}`);
    console.log("Response received:", response);
    const data = JSON.parse(response.data);
    console.log("Parsed data:", data);
    return data;
  } catch (error) {
    console.error('Error fetching innovation by ID:', error.response ? error.response.data : error.message);
    return null;
  }
};

// Función para crear una nueva innovación
export const createInnovation = async (newInnovation) => {
  try {
    const response = await axios.post(apiUrl+'innovations/add', newInnovation);
    console.log("New innovation added:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating innovation:', error);
    return null;
  }
};

// Función para eliminar una innovación
export const deleteInnovation = async (id) => {
  try {
    const response = await axios.delete(apiUrl+`innovations/${id}/delete/`);
    console.log("Innovation deleted:", response.data);
    return response.status === 204;  // Retorna true si la eliminación fue exitosa
  } catch (error) {
    console.error('Error deleting innovation:', error);
    return false;
  }
};

// Función para editar una innovación
export const updateInnovation = async (id, updatedInnovation) => {
  try {
    const response = await axios.put(apiUrl+`innovations/${id}/edit/`, updatedInnovation);
    console.log("Innovation updated:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating innovation:', error);
    return null;
  }
};
