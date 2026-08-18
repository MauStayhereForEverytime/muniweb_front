import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;
const API_URL = apiUrl+'event-images';  // Ruta para las imágenes de eventos

// Obtener imágenes de eventos
export const fetchEventImages = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching event images:', error);
    return [];
  }
};

// Agregar una nueva imagen de evento
export const addEventImage = async (imageData) => {
  try {
    const response = await axios.post(`${API_URL}/add`, imageData);
    return response.data;
  } catch (error) {
    console.error('Error adding event image:', error);
    throw error;
  }
};

// Editar imagen de evento
export const editEventImage = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/edit/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error editing event image:', error);
    throw error;
  }
};

// Eliminar imagen de evento
export const deleteEventImage = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting event image:', error);
    throw error;
  }
};

// Función para obtener una imagen específica por ID
export const fetchEventImageById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    
    // Parsear el string JSON a un objeto
    const data = JSON.parse(response.data); // Aquí parseamos la respuesta
    return data[0]; // Retorna el primer elemento del array

  } catch (error) {
    console.error('Error fetching event image by ID:', error);
    return null;
  }
};