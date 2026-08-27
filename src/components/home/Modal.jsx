import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Modal = ({ isOpen, closeModal }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasImages, setHasImages] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
const mediaUrl = (path) => {
  if (!path) return '';
  const p = String(path);
  if (/^https?:\/\//i.test(p)) return p;
  const base = apiUrl.replace(/\/$/, '');
  if (p.startsWith('/media/')) return `${base}${p}`;
  return `${base}/media/${p.replace(/^\//, '')}`;
};

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      axios
        .get(apiUrl + 'modal-images')
        .then((response) => {
          const list = Array.isArray(response.data) ? response.data : [];
          setImages(list);
          setHasImages(list.length > 0);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error al obtener las imágenes del modal:', error);
          setImages([]);
          setHasImages(false);
          setLoading(false);
        });
    }
  }, [isOpen]);

  // No abrir si no hay imágenes (evita overlay oscuro vacío)
  if (!isOpen || (!loading && !hasImages)) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
      onClick={closeModal}
    >
      <div
        className="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-transparent p-4 rounded-lg modal-zoom-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="absolute right-4 top-4 text-xl font-bold text-black" onClick={closeModal}>
          X
        </button>
        <div className="flex justify-center items-center">
          {loading ? (
            <div className="animate-spin h-14 w-14 border-8 border-white border-t-transparent rounded-full"></div>
          ) : (
            <div className="bg-white p-4 rounded-lg w-full">
              <img
                src={mediaUrl(images[0].ima_txt_urlpath)}
                alt={images[0].ima_txt_name}
                className="max-w-full h-auto rounded-md"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
