import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchNews, createNews } from '../../services/newsService'; // Función para obtener noticias
import NewsItem from './NewsItem';  // Componente para mostrar cada noticia individual
import Spinner from './Spinner';  // Importamos el spinner
import QuillEditor from './QuillEditor';

const NewsList = () => {
  const [newsItems, setNewsItems] = useState([]); // Noticias cargadas
  const [mainNews, setMainNews] = useState(null);  // Noticia principal
  const [secondaryNews, setSecondaryNews] = useState([]); // Noticias secundarias
  const [allNews, setAllNews] = useState([]); // Todas las noticias
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [isFormVisible, setIsFormVisible] = useState(false); // Mostrar/ocultar formulario
  const [newTitle, setNewTitle] = useState(''); // Título de la nueva noticia
  const [newDescription, setNewDescription] = useState(''); // Descripción
  const [newContent, setNewContent] = useState(''); // Contenido
  const [newImage, setNewImage] = useState(''); // Imagen de la noticia
  const [isLoading, setIsLoading] = useState(false); // Estado de carga

  useEffect(() => {
    const getNews = async () => {
      try {
        setIsLoading(true);  // Activamos el cargador
        const data = await fetchNews(); // Traemos las noticias
        console.log("Data received:", data);

        if (Array.isArray(data) && data.length > 0) {
          const sortedNews = data.sort((a, b) => b.pk - a.pk); // Ordenamos las noticias
          const main = sortedNews.find(item => item.fields.ctn_int_id === 1); // Noticia principal
          const secondary = sortedNews.filter(item => item.fields.ctn_int_id === 2); // Noticias secundarias

          setMainNews(main); // Asignamos la noticia principal
          setSecondaryNews(secondary.slice(0, 3)); // Las 3 noticias más recientes
          setAllNews(secondary.slice(3)); // El resto de las noticias
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setIsLoading(false);  // Desactivamos el cargador cuando termina
      }
    };

    getNews(); // Llamada para obtener las noticias
  }, []);

  const pageSize = 12;
  const totalPages = Math.ceil(allNews.length / pageSize);
  const paginatedNews = allNews.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const truncateText = (text, length = 30) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newTitle || !newDescription || !newContent || !newImage) {
      alert("Por favor, completa todos los campos antes de enviar.");
      return;
    }

    const newNews = {
      fields: {
        new_txt_urlimage: newImage,
        new_txt_tittle: newTitle,
        new_txt_description: newDescription,
        new_txt_content: newContent,
        new_txt_state: 'ACTIVO',
      },
    };

    try {
      setIsLoading(true); // Mostramos el cargador
      const createdNews = await createNews(newNews); // Llamamos para crear la noticia

      if (createdNews) {
        setSecondaryNews([createdNews, ...secondaryNews]); // Actualizamos las noticias secundarias
        setNewTitle('');
        setNewDescription('');
        setNewContent('');
        setNewImage('');
        setIsFormVisible(false); // Ocultamos el formulario

        setTimeout(() => {
          setIsLoading(false); // Desactivamos el cargador después de un segundo
        }, 1000);
      }
    } catch (error) {
      console.error("Error creating news:", error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Spinner />;  // Si está cargando, mostramos el spinner
  }

  return (
    <div className="w-full h-full p-2">
      <h2 className="text-xl font-bold mb-4">RECIENTES</h2>
      {/* Contenedor con Grid para la noticia principal y secundarias */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        
        {/* Noticia Principal: ocupa 3/4 de la columna (3/4) */}
        {mainNews && (
          <div className="col-span-3 bg-[#83CEE1] rounded-lg p-3">
            <Link to={`/news/${mainNews.pk}`} className="block">
              {mainNews.fields && mainNews.fields.new_txt_urlimage && (
                <img
                  src={`data:image/jpeg;base64,${mainNews.fields.new_txt_urlimage}`}
                  alt={mainNews.fields.new_txt_tittle}
                  className="w-full h-96 object-cover rounded-lg"  // Ajusté la altura de la imagen
                />
              )}
              <div className="mt-3 text-black font-bold text-sm">{truncateText(mainNews.fields?.new_txt_tittle || "AGREGADO CORRECTAMENTE")}</div>
              <div className="text-black text-xs">{truncateText(mainNews.fields?.new_txt_description || "ACTUALICE LA PAGINA")}</div>
            </Link>
          </div>
        )}

        {/* Noticias Secundarias: ocupa 1/4 de la columna (1/4) */}
        <div className="col-span-1 grid grid-rows-3 gap-2">
          {secondaryNews.map((item, index) => (
            <div key={index} className="bg-[#D3D3D3] p-2 rounded-lg">
              <Link to={`/news/${item.pk}`} className="block">
                {item.fields && item.fields.new_txt_urlimage && (
                  <img
                    src={`data:image/jpeg;base64,${item.fields.new_txt_urlimage}`}
                    alt={item.fields.new_txt_tittle}
                    className="w-full h-24 object-cover rounded-lg"  // Imagen más pequeña
                  />
                )}
                <div className="mt-2 text-black text-xs font-bold">{truncateText(item.fields?.new_txt_tittle || "AGREGADO CORRECTAMENTE")}</div>
                <div className="text-black text-[10px]">{truncateText(item.fields?.new_txt_description || "ACTUALICE LA PAGINA")}</div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Botón para agregar nueva noticia */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          {isFormVisible ? 'Cancelar' : 'Agregar Noticia'}
        </button>
      </div>

      {/* Formulario para agregar una nueva noticia */}
      {isFormVisible && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-100 rounded-md">
          <div className="mb-4">
            <label className="block text-sm font-semibold">URL de IMAGEN</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    const base64String = event.target.result.split(',')[1]; // Obtener solo el Base64
                    setNewImage(base64String);
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />

          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Título:</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Descripción:</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <label className="block mt-4">Contenido</label>
          {/* Si usas QuillEditor o algún editor de texto enriquecido, ponlo aquí */}
          <QuillEditor value={newContent} onChange={setNewContent} />
          <button
            type="submit"
            className={`px-6 py-2 ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500'} text-white rounded-md`}
            disabled={isLoading}
          >
            {isLoading ? 'Cargando...' : 'Agregar Noticia'}
          </button>
        </form>
      )}

      {/* Sección "Todas las Noticias" */}
      {allNews.length > 0 && (
        <div className="flex flex-col items-center px-6">
          <h2 className="text-xl font-bold mb-8 text-center">Todas las Noticias</h2>
          <div className="grid grid-cols-3 gap-8 w-full max-w-7xl justify-items-center">
            {paginatedNews.map((item, index) => (
              <NewsItem key={index} news={item} />
            ))}
          </div>
          {/* Paginación */}
          <div className="flex justify-center mt-8 gap-6">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-6 py-3 bg-blue-500 text-white rounded-md"
            >
              Anterior
            </button>
            <span className="text-lg">{currentPage} / {totalPages}</span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-6 py-3 bg-blue-500 text-white rounded-md"
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsList;
