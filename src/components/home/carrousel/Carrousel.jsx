import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";  
import { fetchImages, deleteImage } from '../../../services/carrouselService';
import AddImageModal from './AddImageModal';
import EditImageModal from './EditImageModal';

const Carrousel = () => {
  const [images, setImages] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [selectedImageData, setSelectedImageData] = useState(null);

  useEffect(() => {
    const getImages = async () => {
      const data = await fetchImages();
      setImages(data);
    };
    getImages();
  }, []);

  const handleDelete = async (id) => {
    try {
      const result = await deleteImage(id);
      if (result && result.detail === 'Image deleted successfully') {
        setImages(images.filter(image => image.ima_int_id !== id));
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const handleEdit = (id) => {
    const imageToEdit = images.find(image => image.ima_int_id === id);
    if (imageToEdit) {
      setSelectedImageId(id);
      setSelectedImageData(imageToEdit);
      setIsEditModalOpen(true);
    }
  };

  const refreshImages = async () => {
    const data = await fetchImages();
    setImages(data);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      {images.length > 0 ? (
        <Slider {...settings}>
          {images.map((image) => (
            <div key={image.ima_int_id} className="relative">
              <img
                src={`data:image/jpeg;base64,${image.ima_txt_urlpath}`}
                alt={image.ima_txt_name}
                className="w-full object-cover"
              />

              {image.ima_txt_name && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-maynas-navy/85 to-transparent px-6 pb-9 pt-20">
                  <p className="font-display text-lg md:text-xl font-bold text-white">
                    {image.ima_txt_name}
                  </p>
                </div>
              )}

              {localStorage.getItem('id') != null && (
                <div className="absolute top-3 right-3 flex gap-2">
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="p-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition duration-300"
                  >
                    Agregar Imagen
                  </button>
                  <button
                    onClick={() => handleEdit(image.ima_int_id)}
                    className="bg-yellow-500 text-white p-2 rounded-md shadow-md hover:bg-yellow-600 transition duration-300"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(image.ima_int_id)}
                    className="bg-red-500 text-white p-2 rounded-md shadow-md hover:bg-red-600 transition duration-300"
                  >
                    Eliminar
                  </button>
                </div>
              )}
            </div>
          ))}
        </Slider>
      ) : (
        <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500">
          No hay imágenes en el carrusel
        </div>
      )}

      {/* Modal para agregar imagen */}
      {isAddModalOpen && <AddImageModal closeModal={() => setIsAddModalOpen(false)} refreshImages={refreshImages} />}

      {/* Modal para editar imagen */}
      {isEditModalOpen && selectedImageData && (
        <EditImageModal
          imageId={selectedImageId}
          closeModal={() => setIsEditModalOpen(false)}
          refreshImages={refreshImages}
          imageDataInitial={selectedImageData}
        />
      )}
    </div>
  );
};

export default Carrousel;
