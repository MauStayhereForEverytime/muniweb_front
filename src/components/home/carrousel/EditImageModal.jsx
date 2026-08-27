import React, { useState } from 'react';
import { editImage } from '../../../services/carrouselService';

const EditImageModal = ({ imageId, closeModal, refreshImages, imageDataInitial }) => {
  const [imageData, setImageData] = useState({
    ima_txt_name: imageDataInitial?.ima_txt_name || '',
    ima_txt_urlpath: imageDataInitial?.ima_txt_urlpath || '',
    ima_txt_description: imageDataInitial?.ima_txt_description || '',
  });
  const [successMessage, setSuccessMessage] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      setImageData({ ...imageData, ima_txt_urlpath: files?.[0] || null });
    } else {
      setImageData({ ...imageData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage(true);  // Mostrar inmediatamente el mensaje de éxito

    try {
      const result = await editImage(imageId, imageData);
      if (result) {
        refreshImages();  // Refrescar las imágenes después de la edición
        // Retirar el mensaje de éxito después de un corto tiempo
        setTimeout(() => {
          setSuccessMessage(false);
          closeModal();  // Cerrar el modal después de mostrar el mensaje
        }, 1500);  // Mostrar el mensaje por 1.5 segundos
      } else {
        setSuccessMessage(false); // En caso de error, ocultar el mensaje
      }
    } catch (error) {
      console.error('Error updating image:', error);
      setSuccessMessage(false);  // Ocultar mensaje de éxito si hay error
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] mx-auto relative">
        <h3 className="text-2xl font-semibold text-center mb-4">Editar Imagen</h3>

        {successMessage && (
          <div className="text-center text-green-600 font-semibold bg-green-100 p-3 rounded-md mb-4">
            ¡Registro exitoso!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="ima_txt_name"
            value={imageData.ima_txt_name}
            onChange={handleChange}
            placeholder="Nombre de la Imagen"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="w-full p-3 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="ima_txt_description"
            value={imageData.ima_txt_description}
            onChange={handleChange}
            placeholder="Descripción"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-orange-400 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              Guardar Cambios
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Cerrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditImageModal;
