import { FaEdit, FaTrash } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;
const mediaUrl = (path) => (path ? `${apiUrl.replace(/\/$/, '')}${path}` : '');

const Modal1 = () => {
  const [images, setImages] = useState([]);
  const [newImage, setNewImage] = useState({ ima_txt_name: '', ima_txt_description: '', ima_txt_urlpath: null });
  const [newImagePreview, setNewImagePreview] = useState(null);
  const [editImage, setEditImage] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios.get(apiUrl + 'modal-images')
      .then((response) => setImages(response.data))
      .catch((error) => console.error('Error al obtener las imágenes:', error));
  }, []);

  const buildFormData = (data) => {
    const fd = new FormData();
    if (data.ima_txt_name !== undefined) fd.append('ima_txt_name', data.ima_txt_name || '');
    if (data.ima_txt_description !== undefined) fd.append('ima_txt_description', data.ima_txt_description || '');
    if (data.ima_txt_urlpath) fd.append('ima_txt_urlpath', data.ima_txt_urlpath);
    return fd;
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage({ ...newImage, ima_txt_urlpath: file });
      setNewImagePreview(URL.createObjectURL(file));
    }
  };

  const handleEditImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditImage({ ...editImage, ima_txt_urlpath: file });
      setEditImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAddImage = () => {
    axios.post(apiUrl + 'modal-images/add', buildFormData(newImage))
      .then((response) => {
        setImages([...images, response.data]);
        setNewImage({ ima_txt_name: '', ima_txt_description: '', ima_txt_urlpath: null });
        setNewImagePreview(null);
      })
      .catch((error) => console.error('Error al agregar la imagen:', error));
  };

  const handleEditImage = () => {
    if (editImage) {
      axios.put(`${apiUrl}modal-images/edit/${editImage.ima_int_id}`, buildFormData(editImage))
        .then((response) => {
          setImages(images.map((image) =>
            image.ima_int_id === editImage.ima_int_id ? response.data : image
          ));
          setEditImage(null);
          setEditImagePreview(null);
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

      <div className="flex gap-6 w-full max-w-4xl flex-wrap">
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
          {newImagePreview && (
            <img
              src={newImagePreview}
              alt="Previsualización"
              className="w-full h-32 object-cover rounded mb-2"
            />
          )}
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
            onClick={handleAddImage}
            disabled={!newImage.ima_txt_urlpath}
          >
            Agregar Imagen
          </button>
        </div>

        {images.map((image) => (
          <div
            key={image.ima_int_id}
            className="bg-white shadow-xl border-2 border-gray-300 rounded-lg p-4 w-full max-w-md flex flex-col items-center"
          >
            <h4 className="font-semibold text-gray-800">{image.ima_txt_name}</h4>
            <img
              src={mediaUrl(image.ima_txt_urlpath)}
              alt={image.ima_txt_name}
              className="w-full h-32 object-cover rounded my-2 border"
            />
            <p className="text-sm text-gray-600 text-center">{image.ima_txt_description}</p>
            <div className="mt-3 flex gap-3 justify-center">
              <button
                className="flex items-center gap-1 bg-yellow-500 text-white px-3 py-1.5 rounded hover:bg-yellow-600 transition duration-150"
                onClick={() => {
                  setEditImage({ ...image, ima_txt_urlpath: null });
                  setEditImagePreview(image.ima_txt_urlpath || null);
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

      {isModalOpen && editImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-3">Editar Imagen</h3>
            <input
              className="w-full p-2 mb-2 border rounded"
              type="text"
              placeholder="Nombre"
              value={editImage.ima_txt_name || ''}
              onChange={(e) => setEditImage({ ...editImage, ima_txt_name: e.target.value })}
            />
            <input
              className="w-full p-2 mb-2 border rounded"
              type="text"
              placeholder="Descripción"
              value={editImage.ima_txt_description || ''}
              onChange={(e) => setEditImage({ ...editImage, ima_txt_description: e.target.value })}
            />
            <input
              className="w-full p-2 mb-2 border rounded"
              type="file"
              accept="image/*"
              onChange={handleEditImageUpload}
            />
            {(editImagePreview || editImage.ima_txt_urlpath) && (
              <img
                src={editImagePreview || mediaUrl(editImage.ima_txt_urlpath)}
                alt="Previsualización"
                className="w-full h-32 object-cover rounded mb-2"
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