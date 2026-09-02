import { FaEdit, FaTrash } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { fetchImages, addImage, editImage, deleteImage, mediaUrl } from '../../../services/carrouselService';
import { pickValidImageFile } from '../../../utils/validateImage';

const RECOMMENDED = { width: 1920, height: 720 };
const MIN = { width: 1600, height: 600 };
const MAX = { width: 2560, height: 1080 };
const MAX_SIZE_KB = 3072;

const readDims = (file) =>
  new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
        sizeKb: Math.round(file.size / 1024),
      });
      URL.revokeObjectURL(img.src);
    };
    img.onerror = () => resolve(null);
    img.src = URL.createObjectURL(file);
  });

const CarruselImages = () => {
  const [images, setImages] = useState([]);
  const [newImage, setNewImage] = useState({ ima_txt_name: '', ima_txt_description: '', ima_txt_urlpath: null, ima_boo_showtitle: true });
  const [newImagePreview, setNewImagePreview] = useState(null);
  const [newImageDims, setNewImageDims] = useState(null);
  const [editImageData, setEditImageData] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState(null);
  const [editImageDims, setEditImageDims] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchImages().then(setImages);
  }, []);

  const handleImageUpload = async (e) => {
    const file = pickValidImageFile(e);
    if (file) {
      setNewImage({ ...newImage, ima_txt_urlpath: file });
      setNewImagePreview(URL.createObjectURL(file));
      const dims = await readDims(file);
      setNewImageDims(dims);
    }
  };

  const handleEditImageUpload = async (e) => {
    const file = pickValidImageFile(e);
    if (file) {
      setEditImageData({ ...editImageData, ima_txt_urlpath: file });
      setEditImagePreview(URL.createObjectURL(file));
      const dims = await readDims(file);
      setEditImageDims(dims);
    }
  };

  const handleAddImage = async () => {
    const result = await addImage(newImage);
    if (result && result.ima_int_id) {
      setImages([...images, result]);
      setNewImage({ ima_txt_name: '', ima_txt_description: '', ima_txt_urlpath: null, ima_boo_showtitle: true });
      setNewImagePreview(null);
      setNewImageDims(null);
    }
  };

  const handleEditImage = async () => {
    if (editImageData) {
      const result = await editImage(editImageData.ima_int_id, editImageData);
      if (result && result.ima_int_id) {
        setImages(images.map((image) =>
          image.ima_int_id === editImageData.ima_int_id ? result : image
        ));
        setEditImageData(null);
        setEditImagePreview(null);
        setEditImageDims(null);
        setIsModalOpen(false);
      }
    }
  };

  const handleDeleteImage = async (id) => {
    const result = await deleteImage(id);
    if (result) {
      setImages(images.filter((image) => image.ima_int_id !== id));
    }
  };

  return (
    <div className="bg-white-100 p-6 overflow-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Administrar imágenes del Carrusel</h1>

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
          <label className="flex items-center gap-2 mb-3 cursor-pointer">
            <input
              type="checkbox"
              checked={newImage.ima_boo_showtitle}
              onChange={(e) => setNewImage({ ...newImage, ima_boo_showtitle: e.target.checked })}
              className="w-4 h-4 accent-blue-600"
            />
            <span className="text-sm text-gray-700">Mostrar título en el slider</span>
          </label>
          <input
            className="w-full p-2 mb-2 border rounded"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
          <p className="text-xs text-gray-500 mb-2">
            Recomendado: <strong>{RECOMMENDED.width}×{RECOMMENDED.height} px</strong>, máx. {MAX.width}×{MAX.height}, &lt; {MAX_SIZE_KB / 1024} MB.
          </p>
          {newImageDims && (
            <div
              className={`text-xs mb-2 px-2 py-1 rounded ${
                newImageDims.width < MIN.width ||
                newImageDims.height < MIN.height ||
                newImageDims.width > MAX.width ||
                newImageDims.height > MAX.height ||
                newImageDims.sizeKb > MAX_SIZE_KB
                  ? 'bg-red-100 text-red-700'
                  : 'bg-green-100 text-green-700'
              }`}
            >
              Detectado: {newImageDims.width}×{newImageDims.height} px, {(newImageDims.sizeKb / 1024).toFixed(2)} MB
              {newImageDims.width < MIN.width || newImageDims.height < MIN.height
                ? ` — menor al mínimo (${MIN.width}×${MIN.height}). Se verá pixelada.`
                : newImageDims.width > MAX.width || newImageDims.height > MAX.height
                ? ` — excede el máximo (${MAX.width}×${MAX.height}). Redimensiona para mejor rendimiento.`
                : newImageDims.sizeKb > MAX_SIZE_KB
                ? ` — peso alto (${(newImageDims.sizeKb / 1024).toFixed(2)} MB > ${MAX_SIZE_KB / 1024} MB). Optimiza la imagen.`
                : ' — tamaño adecuado.'}
            </div>
          )}
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
                  setEditImageData({ ...image, ima_txt_urlpath: null });
                  setEditImagePreview(image.ima_txt_urlpath || null);
                  setEditImageDims(null);
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

      {isModalOpen && editImageData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-3">Editar Imagen</h3>
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
            <label className="flex items-center gap-2 mb-3 cursor-pointer">
              <input
                type="checkbox"
                checked={editImageData.ima_boo_showtitle !== false}
                onChange={(e) => setEditImageData({ ...editImageData, ima_boo_showtitle: e.target.checked })}
                className="w-4 h-4 accent-blue-600"
              />
              <span className="text-sm text-gray-700">Mostrar título en el slider</span>
            </label>
            <input
              className="w-full p-2 mb-2 border rounded"
              type="file"
              accept="image/*"
              onChange={handleEditImageUpload}
            />
            <p className="text-xs text-gray-500 mb-2">
              Recomendado: <strong>{RECOMMENDED.width}×{RECOMMENDED.height} px</strong>, máx. {MAX.width}×{MAX.height}, &lt; {MAX_SIZE_KB / 1024} MB.
            </p>
            {editImageDims && (
              <div
                className={`text-xs mb-2 px-2 py-1 rounded ${
                  editImageDims.width < MIN.width ||
                  editImageDims.height < MIN.height ||
                  editImageDims.width > MAX.width ||
                  editImageDims.height > MAX.height ||
                  editImageDims.sizeKb > MAX_SIZE_KB
                    ? 'bg-red-100 text-red-700'
                    : 'bg-green-100 text-green-700'
                }`}
              >
                Detectado: {editImageDims.width}×{editImageDims.height} px, {(editImageDims.sizeKb / 1024).toFixed(2)} MB
                {editImageDims.width < MIN.width || editImageDims.height < MIN.height
                  ? ` — menor al mínimo (${MIN.width}×${MIN.height}).`
                  : editImageDims.width > MAX.width || editImageDims.height > MAX.height
                  ? ` — excede el máximo. Redimensiona.`
                  : editImageDims.sizeKb > MAX_SIZE_KB
                  ? ` — peso alto (${(editImageDims.sizeKb / 1024).toFixed(2)} MB > ${MAX_SIZE_KB / 1024} MB). Optimiza.`
                  : ' — tamaño adecuado.'}
              </div>
            )}
            {(editImagePreview || editImageData.ima_txt_urlpath) && (
              <img
                src={editImagePreview || mediaUrl(editImageData.ima_txt_urlpath)}
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

export default CarruselImages;