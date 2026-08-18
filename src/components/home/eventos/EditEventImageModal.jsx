import React, { useState } from 'react';
import { editEventImage } from '../../../services/eventService';

const EditEventImageModal = ({ imageId, closeModal, refreshImages, imageDataInitial }) => {
  const [editedImage, setEditedImage] = useState(imageDataInitial);

  const handleEditImage = async () => {
    try {
      await editEventImage(imageId, editedImage);
      refreshImages();  // Refrescar las imágenes después de editar
      closeModal();  // Cerrar el modal
    } catch (error) {
      console.error('Error editing event image:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] mx-auto">
      <h3 className="text-2xl font-semibold text-center mb-4">Editar Imagen de Evento</h3>

      <div className="space-y-4">
        <input
          type="text"
          value={editedImage.ima_txt_name}
          onChange={(e) => setEditedImage({ ...editedImage, ima_txt_name: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <input
          type="text"
          value={editedImage.ima_txt_description}
          onChange={(e) => setEditedImage({ ...editedImage, ima_txt_description: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* <input
          type="text"
          value={editedImage.ima_txt_urlpath}
          onChange={(e) => setEditedImage({ ...editedImage, ima_txt_urlpath: e.target.value })}
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
                const base64String = event.target.result.split(',')[1]; // Obtener solo el Base64
                setEditedImage({ ...editedImage, ima_txt_urlpath: base64String });
              };
              reader.readAsDataURL(file);
            }
          }}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {/* Nuevo campo URL de gob */}
        <input
          type="text"
          value={editedImage.ima_txt_urlgob}
          onChange={(e) => setEditedImage({ ...editedImage, ima_txt_urlgob: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={handleEditImage}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Guardar Cambios
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

export default EditEventImageModal;
