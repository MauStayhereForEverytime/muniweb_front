import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import AddEventImageModal from './AddEventImageModal';
import EditEventImageModal from './EditEventImageModal';
import { fetchEventImages, deleteEventImage, mediaUrl } from '../../../services/eventService';

const EventosTodos = () => {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [selectedImageData, setSelectedImageData] = useState(null);

  const imagesPerPage = 4;

  const getImages = async () => {
    const data = await fetchEventImages();
    setImages(data);
  };

  useEffect(() => {
    getImages();
  }, []);

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);
  const totalPages = Math.ceil(images.length / imagesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = async (id) => {
    try {
      await deleteEventImage(id);
      alert('Imagen eliminada correctamente. Por favor, actualice la página si no ve los cambios.');
      getImages();
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Error al eliminar la imagen.');
    }
  };

  const handleEdit = (id) => {
    const imageToEdit = images.find(image => image.ima_int_id === id);
    setSelectedImageId(id);
    setSelectedImageData(imageToEdit);
    setIsEditModalOpen(true);
  };

  return (
    <>
      <Header />

      <div className="relative max-w-7xl mx-auto pt-32 min-h-screen">
        {/* Botón para agregar imagen */}
        {localStorage.getItem('id') && (
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="mb-4 p-2 bg-blue-500 text-white rounded"
          >
            Agregar Imagen de Evento
          </button>
        )}

        {/* MODAL - AGREGAR (sin fondo oscuro) */}
        {isAddModalOpen && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-2xl">
            <div className="bg-white p-6 rounded shadow-lg relative border border-gray-300">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="absolute top-2 right-2 text-xl font-bold text-gray-600 hover:text-black"
              >
                ×
              </button>
              <AddEventImageModal
                closeModal={() => setIsAddModalOpen(false)}
                refreshImages={getImages}
              />
            </div>
          </div>
        )}

        {/* MODAL - EDITAR (sin fondo oscuro) */}
        {isEditModalOpen && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-2xl">
            <div className="bg-white p-6 rounded shadow-lg relative border border-gray-300">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="absolute top-2 right-2 text-xl font-bold text-gray-600 hover:text-black"
              >
                ×
              </button>
              <EditEventImageModal
                imageId={selectedImageId}
                closeModal={() => setIsEditModalOpen(false)}
                refreshImages={getImages}
                imageDataInitial={selectedImageData}
              />
            </div>
          </div>
        )}

        {/* Título */}
        <div className="bg-[#FFFFFF] border border-[trasnparent] rounded-xl p-4 text-2xl font-extrabold text-center text-[#23355B] mb-8 font-Courier">
          Todos los Eventos
        </div>

        {/* Imágenes */}
        <div className="grid grid-cols-2 gap-6">
          {currentImages.map((image) => (
            <div
              key={image.ima_int_id}
              className="relative w-full h-[300px] bg-[#D9D9D9] mb-8 rounded-2xl overflow-hidden shadow-lg border border-gray-400"
            >
              {image.ima_txt_urlgob ? (
                <a href={image.ima_txt_urlgob} target="_blank" rel="noopener noreferrer">
                  <img
                    src={mediaUrl(image.ima_txt_urlpath)}
                    alt={image.ima_txt_name}
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110 cursor-pointer"
                  />
                </a>
              ) : (
                <Link to={`/eventos/edit/${image.ima_int_id}`} className="w-full h-full block">
                  <img
                    src={mediaUrl(image.ima_txt_urlpath)}
                    alt={image.ima_txt_name}
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110 cursor-pointer"
                  />
                </Link>
              )}

              {localStorage.getItem('id') && (
                <>
                  <button
                    onClick={() => handleEdit(image.ima_int_id)}
                    className="absolute top-2 right-2 bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition-transform transform hover:scale-105"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(image.ima_int_id)}
                    className="absolute top-2 right-20 bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition-transform transform hover:scale-105"
                  >
                    🗑️
                  </button>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="flex justify-center space-x-4 mt-4 pb-8 pt-8">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 bg-gray-300 text-gray-700 rounded"
            >
              Anterior
            </button>
            <span className="p-2 text-gray-700">
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 bg-gray-300 text-gray-700 rounded"
            >
              Siguiente
            </button>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default EventosTodos;
