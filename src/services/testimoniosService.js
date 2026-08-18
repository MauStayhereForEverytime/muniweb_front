const apiUrl = import.meta.env.VITE_API_URL;

export const fetchTestimonios = async () => {
  try {
    const response = await fetch(apiUrl + 'api/testimonios/');
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error al cargar los testimonios:', error);
    return [];
  }
};