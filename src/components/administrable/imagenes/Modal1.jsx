import { FaEdit, FaTrash } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Modal1 = () => {
  const [images, setImages] = useState([]);
  const [newImage, setNewImage] = useState({ ima_txt_name: '', ima_txt_description: '', ima_txt_urlpath: '' });
  const [editImage, setEditImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(apiUrl + 'modal-images')
      .then((response) => setImages(response.data))
      .catch((error) => console.error('Error al obtener las imágenes:', error));
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewImage({ ...newImage, ima_txt_urlpath: reader.result });
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleEditImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditImage({ ...editImage, ima_txt_urlpath: reader.result });
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleAddImage = () => {
    axios.post(apiUrl + 'modal-images/add', newImage)
      .then((response) => {
        setImages([...images, response.data]);
        setNewImage({ ima_txt_name: '', ima_txt_description: '', ima_txt_urlpath: '' });
      })
      .catch((error) => console.error('Error al agregar la imagen:', error));
  };

  const handleEditImage = () => {
    if (editImage) {
      axios.put(`${apiUrl}modal-images/edit/${editImage.ima_int_id}`, editImage)
        .then((response) => {
          setImages(images.map((image) =>
            image.ima_int_id === editImage.ima_int_id ? response.data : image
          ));
          setEditImage(null);
          setIsModalOpen(false);
        })
        .catch((error) => console.error('Error al editar la imagen:', error));
    }
  };

  const handleDeleteImage = (id) => {
    axios.delete(`${apiUrl}modal-images/delete/${id}`)
      .then(() => setImages(images.filter((image) => image.ima_int_id !== id)))
      .catch((error) => console.error('Error al eliminar la imagen:', error));
  };

  return (
    <div className="bg-white-100 p-6 overflow-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Administrar imágenes del Modal</h1>

      <div className="flex gap-6 w-full max-w-4xl">
        {/* Sección de agregar imagen (solo si no hay imágenes) */}
        {images.length === 0 && (
          <div className="bg-white shadow-xl border-2 border-gray-400 rounded-lg p-4 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">Agregar Imagen</h3>
            <input
              className="w-full p-2 mb-2 border rounded"
              type="text"
              placeholder="Nombre"
              value={newImage.ima_txt_name}
              onChange={(e) => setNewImage({ ...newImage, ima_txt_name: e.target.value })}
            />
            <input
              className="w-full p-2 mb-2 border rounded"
              type="text"
              placeholder="Descripción"
              value={newImage.ima_txt_description}
              onChange={(e) => setNewImage({ ...newImage, ima_txt_description: e.target.value })}
            />
            <input
              className="w-full p-2 mb-2 border rounded"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
            {newImage.ima_txt_urlpath && (
              <img
                src={newImage.ima_txt_urlpath}
                alt="Previsualización"
                className="w-20 h-20 object-cover rounded mb-2"
              />
            )}
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full transition duration-200"
              onClick={handleAddImage}
            >
              Agregar Imagen
            </button>
          </div>
        )}

        {/* Lista de Imágenes con botones más bonitos */}
        {images.map((image) => (
          <div
            key={image.ima_int_id}
            className="bg-white shadow-xl border-2 border-gray-300 rounded-lg p-4 w-full max-w-md flex flex-col items-center"
          >
            <h4 className="font-semibold text-gray-800">{image.ima_txt_name}</h4>
            <img
              src={image.ima_txt_urlpath}
              alt={image.ima_txt_name}
              className="w-20 h-20 object-cover rounded my-2 border"
            />
            <p className="text-sm text-gray-600 text-center">{image.ima_txt_description}</p>
            <div className="mt-3 flex gap-3 justify-center">
              <button
                className="flex items-center gap-1 bg-yellow-500 text-white px-3 py-1.5 rounded hover:bg-yellow-600 transition duration-150"
                onClick={() => {
                  setEditImage(image);
                  setIsModalOpen(true);
                }}
              >
                <FaEdit /> Editar
              </button>
              <button
                className="flex items-center gap-1 bg-red-500 text-white px-3 py-1.5 rounded hover:bg-red-600 transition duration-150"
                onClick={() => handleDeleteImage(image.ima_int_id)}
              >
                <FaTrash /> Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para editar imagen */}
      {isModalOpen && editImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-3">Editar Imagen</h3>
            <input
              className="w-full p-2 mb-2 border rounded"
              type="text"
              placeholder="Nombre"
              value={editImage.ima_txt_name}
              onChange={(e) => setEditImage({ ...editImage, ima_txt_name: e.target.value })}
            />
            <input
              className="w-full p-2 mb-2 border rounded"
              type="text"
              placeholder="Descripción"
              value={editImage.ima_txt_description}
              onChange={(e) => setEditImage({ ...editImage, ima_txt_description: e.target.value })}
            />
            <input
              className="w-full p-2 mb-2 border rounded"
              type="file"
              accept="image/*"
              onChange={handleEditImageUpload}
            />
            {editImage.ima_txt_urlpath && (
              <img
                src={editImage.ima_txt_urlpath}
                alt="Previsualización"
                className="w-20 h-20 object-cover rounded mb-2"
              />
            )}
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                onClick={handleEditImage}
              >
                Guardar
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                onClick={() => setIsModalOpen(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal1;
