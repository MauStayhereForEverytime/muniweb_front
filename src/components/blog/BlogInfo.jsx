import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchNewsById, deleteNews, updateNews } from '../../services/newsService';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Íconos de edición y eliminación
import QuillEditor from '../noticias/QuillEditor'; // Asegúrate de la importación correcta
import Header from '../Header'; // Agregamos el Header
import Footer from '../Footer'; // Agregamos el Footer
import './BlogInfo.css'; // Asegúrate de tener el CSS para los estilos personalizados

const NewsInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [isEditing, setIsEditing] = useState(false);  // Para controlar si está en modo de edición
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [updatedContent, setUpdatedContent] = useState('');
  const [updatedImage, setUpdatedImage] = useState('');

  useEffect(() => {
    const getNews = async () => {
      const data = await fetchNewsById(id);
      setNews(data ? data[0].fields : null);
      setUpdatedTitle(data[0].fields.new_txt_tittle);
      setUpdatedDescription(data[0].fields.new_txt_description);
      setUpdatedContent(data[0].fields.new_txt_content);
      setUpdatedImage(data[0].fields.new_txt_urlimage);
    };

    getNews();
  }, [id]);

  // Función para manejar la eliminación
  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta noticia?')) {
      const success = await deleteNews(id);
      if (success) {
        alert('Noticia eliminada correctamente');
        navigate('/news'); // Redirige al listado de noticias
      } else {
        alert('Hubo un problema al eliminar la noticia.');
      }
    }
  };

  // Función para manejar la edición
  const handleEdit = async () => {
    const updatedData = {
      fields: {
        new_txt_tittle: updatedTitle,
        new_txt_description: updatedDescription,
        new_txt_content: updatedContent,
        new_txt_urlimage: updatedImage,
      },
    };

    const success = await updateNews(id, updatedData);
    if (success) {
      alert('Noticia actualizada correctamente');
      setIsEditing(false);  // Salir del modo de edición
    } else {
      alert('Hubo un problema al actualizar la noticia.');
    }
  };

  if (!news) {
    return <div>Loading...</div>;
  }

  return (
    <div className="news-info-page">
      {/* Header */}
      <Header />

      <div className="news-info-container">

      {localStorage.getItem('id') && (
                <div className="actions-container flex justify-end gap-4 p-4">
                <button
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  <FaTrash /> Eliminar
                </button>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                >
                  <FaEdit /> {isEditing ? 'Cancelar' : 'Editar'}
                </button>
              </div>
      )}


        {isEditing ? (
          // Formulario de edición
          <div className="edit-form p-4">
            <div className="mb-4">
              <label className="block">Imagen</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        const base64String = event.target.result.split(',')[1]; // Extraemos solo el Base64
                        setUpdatedImage(base64String);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div className="mb-4">
              <label className="block">Título</label>
              <input
                type="text"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block">Descripción</label>
              <input
                type="text"
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block">Contenido</label>
              <QuillEditor value={updatedContent} onChange={setUpdatedContent} />
            </div>
            <button
              onClick={handleEdit}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Guardar cambios
            </button>
          </div>
        ) : (
          // Vista normal de la noticia
          <div className="news-info">
            {news.new_txt_urlimage && (
              <img 
                src={`data:image/jpeg;base64,${news.new_txt_urlimage}`}
                alt={news.new_txt_tittle} 
                className="news-image" 
              />
            )}
            <h1 className="news-title">{news.new_txt_tittle}</h1>
            <p className="news-description">{news.new_txt_description}</p>
            <div className="news-content" dangerouslySetInnerHTML={{ __html: news.new_txt_content }} />

            {/* Fecha de creación */}
            {news.new_datetime_datecreate && (
              <p className="news-date">
                <strong>Fecha de creación: </strong>
                {new Date(news.new_datetime_datecreate).toLocaleDateString()}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default NewsInfo;
