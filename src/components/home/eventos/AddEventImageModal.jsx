import React, { useState } from 'react';
import { addEventImage } from '../../../services/eventService';

const AddEventImageModal = ({ closeModal, refreshImages }) => {
  const [newImage, setNewImage] = useState({
    ima_txt_name: '',
    ima_txt_description: '',
    ima_txt_urlpath: '',
    ima_txt_urlgob: ''  // URL de redirección
  });

  const handleAddImage = async () => {
    try {
      const addedImage = await addEventImage(newImage);
      refreshImages();  // Refrescar las imágenes después de agregar
      closeModal();  // Cerrar el modal
    } catch (error) {
      console.error('Error adding event image:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] mx-auto">
      <h3 className="text-2xl font-semibold text-center mb-4">Agregar Imagen de Evento</h3>
      
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Nombre de la Imagen"
          value={newImage.ima_txt_name}
          onChange={(e) => setNewImage({ ...newImage, ima_txt_name: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <input
          type="text"
          placeholder="Descripción"
          value={newImage.ima_txt_description}
          onChange={(e) => setNewImage({ ...newImage, ima_txt_description: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        {/* <input
          type="text"
          placeholder="URL de la Imagen"
          value={newImage.ima_txt_urlpath}
          onChange={(e) => setNewImage({ ...newImage, ima_txt_urlpath: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        /> */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = (event) => {
                setNewImage({ ...newImage, ima_txt_urlpath: event.target.result.split(',')[1] }); // Guardamos solo el Base64
              };
              reader.readAsDataURL(file);
            }
          }}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />


        {/* Nuevo campo URL de gob */}
        <input
          type="text"
          placeholder="URL del Evento (Gob)"
          value={newImage.ima_txt_urlgob}
          onChange={(e) => setNewImage({ ...newImage, ima_txt_urlgob: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={handleAddImage}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Agregar
        </button>
        <button
          onClick={closeModal}
          className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default AddEventImageModal;
