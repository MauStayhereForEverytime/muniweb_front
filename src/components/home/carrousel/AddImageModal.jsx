import React, { useState } from 'react';
import { addImage } from '../../../services/carrouselService';

const AddImageModal = ({ closeModal, refreshImages }) => {
  const [imageData, setImageData] = useState({
    ima_txt_name: '',
    ima_txt_urlpath: '',
    ima_txt_description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setImageData({ ...imageData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await addImage(imageData);
      if (result) {
        await refreshImages();  // Asegúrate de llamar a refreshImages después de agregar la imagen
        closeModal();  // Cierra el modal si se agregó la imagen correctamente
      }
    } catch (error) {
      console.error('Error adding image:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] mx-auto">
      <h3 className="text-2xl font-semibold text-center mb-4">Agregar Imagen</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="ima_txt_name"
          value={imageData.ima_txt_name}
          onChange={handleChange}
          placeholder="Nombre de la Imagen"
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        {/* <input
          type="text"
          name="ima_txt_urlpath"
          value={imageData.ima_txt_urlpath}
          onChange={handleChange}
          placeholder="URL de la Imagen"
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        /> */}
        <input type="file" accept="image/*"onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = (event) => {
                const base64String = event.target.result.split(',')[1]; // Obtener solo el Base64
                handleChange({
                  target: {
                    name: 'ima_txt_urlpath',
                    value: base64String,
                  },
                });
              };
              reader.readAsDataURL(file);
            }
          }}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
          Agregar Imagen
          </button>
          
          <button
            type="button"
            onClick={closeModal}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Cerrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddImageModal;
