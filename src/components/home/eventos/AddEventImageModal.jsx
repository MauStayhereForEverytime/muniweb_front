import { useState } from 'react';
import { pickValidImageFile } from '../../../utils/validateImage';
import { addEventImage } from '../../../services/eventService';

const AddEventImageModal = ({ closeModal, refreshImages }) => {
  const [newImage, setNewImage] = useState({
    ima_txt_name: '',
    ima_txt_description: '',
    ima_txt_urlpath: null,
    ima_txt_urlgob: ''
  });

  const handleAddImage = async () => {
    try {
      await addEventImage(newImage);
      refreshImages();
      closeModal();
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

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = pickValidImageFile(e);
            if (file) setNewImage({ ...newImage, ima_txt_urlpath: file });
          }}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

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
          disabled={!newImage.ima_txt_urlpath}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
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
