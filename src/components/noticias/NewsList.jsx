import { useEffect, useState } from 'react';
import { fetchNews, createNews, mediaUrl } from '../../services/newsService';
import Spinner from './Spinner';
import QuillEditor from './QuillEditor';

const NewsList = () => {
  const [mainNews, setMainNews] = useState(null);
  const [secondaryNews, setSecondaryNews] = useState([]);
  const [allNews, setAllNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newImage, setNewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [viewingItem, setViewingItem] = useState(null);

  useEffect(() => {
    const getNews = async () => {
      try {
        setIsLoading(true);
        const data = await fetchNews();
        console.log('Data received:', data);

        if (Array.isArray(data) && data.length > 0) {
          const sortedNews = data.sort((a, b) => b.pk - a.pk);
          const main = sortedNews.find((item) => item.fields.ctn_int_id === 1);
          const secondary = sortedNews.filter((item) => item.fields.ctn_int_id === 2);

          setMainNews(main);
          setSecondaryNews(secondary.slice(0, 3));
          setAllNews(secondary.slice(3));
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setIsLoading(false);
      }
    };
    getNews();
  }, []);

  useEffect(() => {
    if (!viewingItem) return undefined;
    const handleKey = (e) => {
      if (e.key === 'Escape') setViewingItem(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [viewingItem]);

  const pageSize = 12;
  const totalPages = Math.ceil(allNews.length / pageSize);
  const paginatedNews = allNews.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const truncateText = (text, length = 30) =>
    text && text.length > length ? text.substring(0, length) + '...' : text;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newTitle || !newDescription || !newContent || !newImage) {
      alert('Por favor, completa todos los campos antes de enviar.');
      return;
    }

    const newNews = {
      new_txt_urlimage: newImage,
      new_txt_tittle: newTitle,
      new_txt_description: newDescription,
      new_txt_content: newContent,
      new_txt_state: 'ACTIVO',
    };

    try {
      setIsLoading(true);
      const createdNews = await createNews(newNews);

      if (createdNews) {
        const normalized = {
          pk: createdNews.new_int_id ?? createdNews.pk,
          fields: {
            new_txt_urlimage: createdNews.new_txt_urlimage,
            new_txt_tittle: createdNews.new_txt_tittle,
            new_txt_description: createdNews.new_txt_description,
            new_txt_content: createdNews.new_txt_content,
            ctn_int_id: createdNews.ctn_int_id,
          },
        };
        setSecondaryNews([normalized, ...secondaryNews]);
        setNewTitle('');
        setNewDescription('');
        setNewContent('');
        setNewImage(null);
        setIsFormVisible(false);

        setTimeout(() => setIsLoading(false), 1000);
      }
    } catch (error) {
      console.error('Error creating news:', error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="w-full h-full p-2">
      <h2 className="text-xl font-bold mb-4">RECIENTES</h2>
      <div className="grid grid-cols-4 gap-3 mb-6">
        {mainNews && (
          <div className="col-span-3 bg-[#83CEE1] rounded-lg p-3">
            <button
              type="button"
              onClick={() => setViewingItem(mainNews)}
              className="block w-full text-left"
            >
              {mainNews.fields && mainNews.fields.new_txt_urlimage && (
                <img
                  src={mediaUrl(mainNews.fields.new_txt_urlimage)}
                  alt={mainNews.fields.new_txt_tittle}
                  className="w-full h-96 object-cover rounded-lg"
                />
              )}
              <div className="mt-3 text-black font-bold text-sm">
                {truncateText(mainNews.fields?.new_txt_tittle || 'AGREGADO CORRECTAMENTE')}
              </div>
              <div className="text-black text-xs">
                {truncateText(mainNews.fields?.new_txt_description || 'ACTUALICE LA PAGINA')}
              </div>
            </button>
          </div>
        )}

        <div className="col-span-1 grid grid-rows-3 gap-2">
          {secondaryNews.map((item, index) => (
            <div key={index} className="bg-[#D3D3D3] p-2 rounded-lg">
              <button
                type="button"
                onClick={() => setViewingItem(item)}
                className="block w-full text-left"
              >
                {item.fields && item.fields.new_txt_urlimage && (
                  <img
                    src={mediaUrl(item.fields.new_txt_urlimage)}
                    alt={item.fields.new_txt_tittle}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                )}
                <div className="mt-2 text-black text-xs font-bold">
                  {truncateText(item.fields?.new_txt_tittle || 'AGREGADO CORRECTAMENTE')}
                </div>
                <div className="text-black text-[10px]">
                  {truncateText(item.fields?.new_txt_description || 'ACTUALICE LA PAGINA')}
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          {isFormVisible ? 'Cancelar' : 'Agregar Noticia'}
        </button>
      </div>

      {isFormVisible && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-100 rounded-md">
          <div className="mb-4">
            <label className="block text-sm font-semibold">URL de IMAGEN</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) setNewImage(file);
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

      {allNews.length > 0 && (
        <div className="flex flex-col items-center px-6">
          <h2 className="text-xl font-bold mb-8 text-center">Todas las Noticias</h2>
          <div className="grid grid-cols-3 gap-8 w-full max-w-7xl justify-items-center">
            {paginatedNews.map((item, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setViewingItem(item)}
                className="bg-white rounded-lg shadow hover:shadow-lg overflow-hidden text-left w-full"
              >
                {item.fields && item.fields.new_txt_urlimage && (
                  <img
                    src={mediaUrl(item.fields.new_txt_urlimage)}
                    alt={item.fields.new_txt_tittle}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="font-bold text-gray-800 line-clamp-2">
                    {item.fields?.new_txt_tittle}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                    {item.fields?.new_txt_description}
                  </p>
                </div>
              </button>
            ))}
          </div>
          <div className="flex justify-center mt-8 gap-6">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-6 py-3 bg-blue-500 text-white rounded-md"
            >
              Anterior
            </button>
            <span className="text-lg">
              {currentPage} / {totalPages}
            </span>
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

      {viewingItem && (
        <div
          className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4"
          onClick={() => setViewingItem(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {viewingItem.fields && viewingItem.fields.new_txt_urlimage && (
              <div className="relative w-full max-h-[60vh] bg-gray-100 flex items-center justify-center flex-shrink-0">
                <img
                  src={mediaUrl(viewingItem.fields.new_txt_urlimage)}
                  alt={viewingItem.fields.new_txt_tittle || 'Noticia'}
                  className="max-h-[60vh] w-auto max-w-full object-contain rounded-t-lg"
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg leading-none"
                  onClick={() => setViewingItem(null)}
                  aria-label="Cerrar"
                >
                  ×
                </button>
              </div>
            )}
            <div className="p-6 overflow-y-auto flex-1">
              {viewingItem.fields?.new_txt_tittle && (
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {viewingItem.fields.new_txt_tittle}
                </h2>
              )}
              {viewingItem.fields?.new_txt_description && (
                <p className="text-gray-600 italic mb-4">
                  {viewingItem.fields.new_txt_description}
                </p>
              )}
              {viewingItem.fields?.new_txt_content && (
                <div
                  className="prose max-w-none text-gray-800"
                  dangerouslySetInnerHTML={{ __html: viewingItem.fields.new_txt_content }}
                />
              )}
            </div>
            <div className="p-4 border-t flex justify-between items-center flex-shrink-0 bg-gray-50">
              <span className="text-xs text-gray-500">
                Pulsa <kbd className="px-1 py-0.5 bg-gray-200 rounded">Esc</kbd> o haz clic fuera para cerrar
              </span>
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                onClick={() => setViewingItem(null)}
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

export default NewsList;