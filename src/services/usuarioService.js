import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

// Obtener todos los usuarios
export const fetchUsuarios = async () => {
  try {
    const response = await axios.get(`${apiUrl}usuarios/`);
    const data = response.data; // ✅ sin parse
    console.log("Usuarios obtenidos:", data);
    return data;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return [];
  }
};

// Obtener un usuario por ID
export const fetchUsuarioById = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}usuarios/${id}/`);
    const data = JSON.parse(response.data);  // Si es string JSON
    console.log("Usuario obtenido:", data);
    return data;
  } catch (error) {
    console.error('Error al obtener usuario:', error.response ? error.response.data : error.message);
    return null;
  }
};

// Crear un nuevo usuario
export const createUsuario = async (newUser) => {
  try {
    const response = await axios.post(`${apiUrl}usuarios/`, newUser);
    console.log("Usuario creado:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error al crear usuario:', error);
    return null;
  }
};

// Actualizar un usuario existente
export const updateUsuario = async (id, updatedUser) => {
  try {
    const response = await axios.put(`${apiUrl}usuarios/${id}/`, updatedUser);
    console.log("Usuario actualizado:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    return null;
  }
};

// Eliminar un usuario
export const deleteUsuario = async (id) => {
  try {
    const response = await axios.delete(`${apiUrl}usuarios/${id}/`);
    console.log("Usuario eliminado:", response.data);
    return response.status === 204;
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    return false;
  }
};
