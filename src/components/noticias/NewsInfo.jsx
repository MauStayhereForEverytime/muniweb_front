import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchNewsById, deleteNews, updateNews, fetchNews, mediaUrl } from '../../services/newsService';
import { FaEdit, FaTrash } from 'react-icons/fa';
import QuillEditor from './QuillEditor';
import Header from '../Header';
import Footer from '../Footer';
import NewsItem from './NewsItem';
import './NewsInfo.css';

const NewsInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [randomNews, setRandomNews] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [updatedContent, setUpdatedContent] = useState('');
  const [updatedImage, setUpdatedImage] = useState(null);

  useEffect(() => {
    const getNews = async () => {
      const data = await fetchNewsById(id);
      setNews(data ? data[0].fields : null);
      setUpdatedTitle(data[0].fields.new_txt_tittle);
      setUpdatedDescription(data[0].fields.new_txt_description);
      setUpdatedContent(data[0].fields.new_txt_content);
      setUpdatedImage(null);
    };
    getNews();
  }, [id]);

  useEffect(() => {
    const getRandomNews = async () => {
      const data = await fetchNews();
      setRandomNews(data.sort(() => 0.5 - Math.random()).slice(0, 2));
    };
    getRandomNews();
  }, []);

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta noticia?')) {
      const success = await deleteNews(id);
      if (success) {
        alert('Noticia eliminada correctamente');
        navigate('/news');
      } else {
        alert('Hubo un problema al eliminar la noticia.');
      }
    }
  };

  const handleEdit = async () => {
    const updatedData = {
      new_txt_tittle: updatedTitle,
      new_txt_description: updatedDescription,
      new_txt_content: updatedContent,
      new_txt_urlimage: updatedImage,
    };
    const success = await updateNews(id, updatedData);
    if (success) {
      alert('Noticia actualizada correctamente');
      setIsEditing(false);
    } else {
      alert('Hubo un problema al actualizar la noticia.');
    }
  };

  if (!news) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="news-info-page">
        <Header />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-8 lg:px-16 py-6 mt-2">
          <div className="col-span-2">
            {localStorage.getItem('id') && (
              <div className="flex justify-end gap-4 p-4">
                <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  <FaTrash /> Eliminar
                </button>
                <button onClick={() => setIsEditing(!isEditing)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                  <FaEdit /> {isEditing ? 'Cancelar' : 'Editar'}
                </button>
              </div>
            )}

            {isEditing ? (
              <div className="edit-form p-4">
                <label className="block">URL de Imagen</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) setUpdatedImage(file);
                  }}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                {/* <input type="text" value={updatedImage} onChange={(e) => setUpdatedImage(e.target.value)} className="w-full p-2 border border-gray-300 rounded" /> */}
                <label className="block mt-4">Título</label>
                <input type="text" value={updatedTitle} onChange={(e) => setUpdatedTitle(e.target.value)} className="w-full p-2 border border-gray-300 rounded" />
                <label className="block mt-4">Descripción</label>
                <input type="text" value={updatedDescription} onChange={(e) => setUpdatedDescription(e.target.value)} className="w-full p-2 border border-gray-300 rounded" />
                <label className="block mt-4">Contenido</label>
                <QuillEditor value={updatedContent} onChange={setUpdatedContent} />
                <button onClick={handleEdit} className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Guardar cambios</button>
              </div>
            ) : (
              <div className="news-info">
                {news.new_txt_urlimage && <img src={mediaUrl(news.new_txt_urlimage)} alt={news.new_txt_tittle} className="news-image w-full rounded-lg" />}
                <h1 className="news-title text-2xl font-bold mt-4">{news.new_txt_tittle}</h1>
                <p className="news-description text-gray-700 mt-2">{news.new_txt_description}</p>
                <div className="news-content mt-4" dangerouslySetInnerHTML={{ __html: news.new_txt_content }} />
              </div>
            )}
          </div>

          <div className="col-span-1">
            <h2 className="text-xl font-bold text-[#23355B] pb-4">Ver más noticias</h2>
            <div className="grid gap-4">
              {randomNews.length > 0 ? randomNews.map((newsItem) => <NewsItem key={newsItem.pk} news={newsItem} />) : <p>Cargando noticias aleatorias...</p>}
            </div>
            <Link to="/news" className="text-blue-600 hover:underline mt-4 block">Ver más noticias</Link>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default NewsInfo;
