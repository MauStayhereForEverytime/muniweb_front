import axios from 'axios';


let accessToken = null; // Access Token en memoria

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Esta es la URL base para todas las peticiones
  // Sin Content-Type por defecto: axios lo establece solo (application/json para
  // objetos y multipart/form-data con boundary para FormData). Si se fijara
  // application/json aquí, axios convertiría los FormData a JSON y rompería los uploads.
});

// Interceptor para agregar el Access Token solo si la solicitud lo requiere
apiClient.interceptors.request.use(
  (config) => {
    if (config.requiresAuth) { // Solo añade el Access Token si `requiresAuth` es `true`
      // Fallback a localStorage: tras un login el token aún no está en memoria
      if (!accessToken) {
        accessToken = localStorage.getItem('accessToken');
      }
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`; // Añadir el Access Token en los headers
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores 401 (token expirado) y renovar el token solo si la solicitud requiere autenticación
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && originalRequest.requiresAuth && !originalRequest._retry) {
      originalRequest._retry = true; // Evita que el interceptor lo intente múltiples veces

      try {
        // Llama a la función para renovar el token usando el Refresh Token
        const newAccessToken = await refreshToken();
        accessToken = newAccessToken; // Actualiza el Access Token en memoria
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`; // Añadir el nuevo token
        return apiClient(originalRequest); // Reintentar la solicitud original con el nuevo Access Token
      } catch (refreshError) {
        console.error('Error al intentar renovar el token:', refreshError);
        window.location.href = '/login'; // Si falla la renovación, redirige al login
      }
    }

    return Promise.reject(error); // Propaga otros errores que no sean 401
  }
);

// Función para solicitar un nuevo Access Token usando el Refresh Token
export const refreshToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken'); // Obtener el Refresh Token almacenado

  if (!refreshToken) {
    throw new Error('No se encontró el Refresh Token');
  }

  try {
    const response = await apiClient.post('/token/refresh/', {
      refresh: refreshToken, // Envía el Refresh Token al servidor
    });

    // Guardar el nuevo Access Token en memoria y en localStorage si se desea
    accessToken = response.data.access; // Almacenar temporalmente en memoria
    localStorage.setItem('accessToken', accessToken); // Almacenar en localStorage si se quiere persistirlo
    return response.data.access; // Retorna el nuevo Access Token
  } catch (error) {
    console.error('Error al renovar el token:', error);
    window.location.href = '/login'; // Si no puedes renovar el token, redirige al login
    throw error; // Propaga el error para que el interceptor no reintente con un token inválido
  }
};

// Función para cerrar sesión: revoca el refresh token en el servidor (blacklist)
// y luego limpia el estado local. La revocación es best-effort: si falla
// (offline/token expirado) se limpia igual y se prosigue al login.
export const logout = async () => {
  const refreshTokenValue = localStorage.getItem('refreshToken');
  if (refreshTokenValue) {
    try {
      await apiClient.post(
        '/logout/',
        { refresh: refreshTokenValue },
        { requiresAuth: true }
      );
    } catch (error) {
      console.warn('No se pudo revocar el token en el servidor:', error);
    }
  }
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('id');
  localStorage.removeItem('token');
  accessToken = null;
  window.location.href = '/login'; // Redirige al login después de cerrar sesión
};


// Ejemplo de una función de login
export const login = async (credentials) => {
  try {
    const response = await apiClient.post('/login/', credentials);
    return response.data;
  } catch (error) {
    console.error('Error en el login', error);
    throw error;
  }
};










export default apiClient;
