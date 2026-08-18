// src/services/carrouselService.js
const apiUrl = import.meta.env.VITE_API_URL;
const API_URL = apiUrl+'carrousel-images';

export const fetchImages = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
};


export const addImage = async (imageData) => {
  try {
    const response = await fetch(`${API_URL}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(imageData),
    });
    return await response.json();
  } catch (error) {
    console.error("Error adding image:", error);
  }
};




export const editImage = async (id, imageData) => {
  try {
    const response = await fetch(`${API_URL}/edit/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(imageData),
    });
    return await response.json();
  } catch (error) {
    console.error("Error editing image:", error);
  }
};


export const deleteImage = async (id) => {
  try {
    const response = await fetch(`${API_URL}/delete/${id}`, {
      method: 'DELETE',
    });
    return await response.json();
  } catch (error) {
    console.error("Error deleting image:", error);
  }
};
