import { FaEdit, FaTrash } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import {
  fetchEventImages,
  addEventImage,
  editEventImage,
  deleteEventImage,
  fetchEventVisibility,
  updateEventVisibility,
  mediaUrl,
} from '../../../services/eventService';

const EventosAdmin = () => {
  const [images, setImages] = useState([]);
  const [visible, setVisible] = useState(true);
  const [newImage, setNewImage] = useState({
    ima_txt_name: '',
    ima_txt_description: '',
    ima_txt_urlpath: null,
    ima_txt_urlgob: '',
  });
  const [editImageData, setEditImageData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchEventImages().then(setImages);
    fetchEventVisibility().then(setVisible);
  }, []);

  const handleToggleVisibility = async (next) => {
    setVisible(next);
    try {
      await updateEventVisibility(next);
    } catch {
      setVisible(!next);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setNewImage({ ...newImage, ima_txt_urlpath: file });
  };

  const handleEditImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setEditImageData({ ...editImageData, ima_txt_urlpath: file });
  };

  const handleAddImage = async () => {
    const result = await addEventImage(newImage);
    if (result && result.ima_int_id) {
      setImages([...images, result]);
      setNewImage({ ima_txt_name: '', ima_txt_description: '', ima_txt_urlpath: null, ima_txt_urlgob: '' });
    }
  };

  const handleEditImage = async () => {
    if (!editImageData) return;
    const result = await editEventImage(editImageData.ima_int_id, editImageData);
    if (result && result.ima_int_id) {
      setImages(images.map((image) => (image.ima_int_id === editImageData.ima_int_id ? result : image)));
      setEditImageData(null);
      setIsModalOpen(false);
    }
  };

  const handleDeleteImage = async (id) => {
    if (!window.confirm('¿Eliminar este evento?')) return;
    const result = await deleteEventImage(id);
    if (result) setImages(images.filter((image) => image.ima_int_id !== id));
  };

  return (
    <div className="bg-white-100 p-6 overflow-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Administrar Eventos</h1>

      <div className="bg-white shadow-xl border-2 border-gray-400 rounded-lg p-4 w-full max-w-2xl mb-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Visibilidad de la sección</h3>
        <label className="flex items-center gap-2 mb-3 cursor-pointer">
          <input
            type="checkbox"
            checked={visible}
            onChange={(e) => handleToggleVisibility(e.target.checked)}
            className="w-4 h-4 accent-blue-600"
          />
          <span className="text-sm text-gray-700">
            Mostrar la sección de eventos en la página principal
          </span>
        </label>
        <p className="text-xs text-gray-500">
          Si desactivas esta opción, la sección de eventos (y el mensaje &quot;No hay eventos disponibles&quot;) se ocultará.
        </p>
      </div>

      <div className="bg-white shadow-xl border-2 border-gray-400 rounded-lg p-4 w-full max-w-2xl mb-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Agregar Evento</h3>
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
          type="text"
          placeholder="URL del evento (Gob) — opcional"
          value={newImage.ima_txt_urlgob}
          onChange={(e) => setNewImage({ ...newImage, ima_txt_urlgob: e.target.value })}
        />
        <input
          className="w-full p-2 mb-2 border rounded"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
          onClick={handleAddImage}
          disabled={!newImage.ima_txt_urlpath}
        >
          Agregar Evento
        </button>
      </div>

      <h2 className="text-lg font-semibold mb-3 text-gray-700">
        Eventos publicados ({images.length})
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image) => (
          <div
            key={image.ima_int_id}
            className="bg-white shadow-xl border-2 border-gray-300 rounded-lg overflow-hidden flex flex-col"
          >
            <div className="relative w-full aspect-video bg-gray-100">
              {image.ima_txt_urlpath && (
                <img
                  src={mediaUrl(image.ima_txt_urlpath)}
                  alt={image.ima_txt_name}
                  className="w-full h-full object-cover object-center"
                />
              )}
            </div>
            <div className="p-4 flex-1">
              <h4 className="font-semibold text-gray-800 mb-1 line-clamp-2">
                {image.ima_txt_name}
              </h4>
              {image.ima_txt_description && (
                <p className="text-sm text-gray-600 line-clamp-3">{image.ima_txt_description}</p>
              )}
              {image.ima_txt_urlgob && (
                <p className="text-xs text-blue-600 mt-1 line-clamp-1 break-all">{image.ima_txt_urlgob}</p>
              )}
            </div>
            <div className="px-4 pb-3 flex gap-2 justify-end flex-wrap">
              <button
                type="button"
                className="flex items-center gap-1 bg-yellow-500 text-white px-3 py-1.5 rounded hover:bg-yellow-600 transition duration-150"
                onClick={() => {
                  setEditImageData({ ...image, ima_txt_urlpath: null });
                  setIsModalOpen(true);
                }}
              >
                <FaEdit /> Editar
              </button>
              <button
                type="button"
                className="flex items-center gap-1 bg-red-500 text-white px-3 py-1.5 rounded hover:bg-red-600 transition duration-150"
                onClick={() => handleDeleteImage(image.ima_int_id)}
              >
                <FaTrash /> Eliminar
              </button>
            </div>
          </div>
        ))}
        {images.length === 0 && (
          <p className="text-gray-500 col-span-full text-center py-8">
            No hay eventos todavía. Agrega el primero usando el formulario.
          </p>
        )}
      </div>

      {isModalOpen && editImageData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-3">Editar Evento</h3>
            <input
              className="w-full p-2 mb-2 border rounded"
              type="text"
              placeholder="Nombre"
              value={editImageData.ima_txt_name || ''}
              onChange={(e) => setEditImageData({ ...editImageData, ima_txt_name: e.target.value })}
            />
            <input
              className="w-full p-2 mb-2 border rounded"
              type="text"
              placeholder="Descripción"
              value={editImageData.ima_txt_description || ''}
              onChange={(e) => setEditImageData({ ...editImageData, ima_txt_description: e.target.value })}
            />
            <input
              className="w-full p-2 mb-2 border rounded"
              type="text"
              placeholder="URL del evento (Gob) — opcional"
              value={editImageData.ima_txt_urlgob || ''}
              onChange={(e) => setEditImageData({ ...editImageData, ima_txt_urlgob: e.target.value })}
            />
            <input
              className="w-full p-2 mb-2 border rounded"
              type="file"
              accept="image/*"
              onChange={handleEditImageUpload}
            />
            <p className="text-xs text-gray-500 mb-2">
              Si no subes imagen nueva, se mantiene la actual.
            </p>
            {editImageData.ima_txt_urlpath && (
              <img
                src={mediaUrl(editImageData.ima_txt_urlpath)}
                alt="Actual"
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

export default EventosAdmin;
