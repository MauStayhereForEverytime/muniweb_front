import apiClient from '../api/api';

// Obtener todos los usuarios (protegido: expone datos personales)
export const fetchUsuarios = async () => {
  try {
    const response = await apiClient.get('usuarios/', { requiresAuth: true });
    const data = response.data; // ✅ sin parse
    console.log("Usuarios obtenidos:", data);
    return data;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return [];
  }
};

// Obtener un usuario por ID (protegido)
export const fetchUsuarioById = async (id) => {
  try {
    const response = await apiClient.get(`usuarios/${id}/`, { requiresAuth: true });
    const data = response.data;
    console.log("Usuario obtenido:", data);
    return data;
  } catch (error) {
    console.error('Error al obtener usuario:', error.response ? error.response.data : error.message);
    return null;
  }
};

// Crear un nuevo usuario (protegido)
export const createUsuario = async (newUser) => {
  try {
    const response = await apiClient.post('usuarios/', newUser, { requiresAuth: true });
    console.log("Usuario creado:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error al crear usuario:', error);
    return null;
  }
};

// Actualizar un usuario existente (protegido)
export const updateUsuario = async (id, updatedUser) => {
  try {
    const response = await apiClient.put(`usuarios/${id}/`, updatedUser, { requiresAuth: true });
    console.log("Usuario actualizado:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    return null;
  }
};

// Eliminar un usuario (protegido)
export const deleteUsuario = async (id) => {
  try {
    const response = await apiClient.delete(`usuarios/${id}/`, { requiresAuth: true });
    console.log("Usuario eliminado:", response.data);
    return response.status === 204;
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    return false;
  }
};
