import React, { useState, useEffect } from 'react';
import { fetchNews, mediaUrl } from '../services/newsService';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Carrousel from '../components/home/carrousel/Carrousel';
import Modal from '../components/home/Modal';
import Eventos from '../components/home/eventos/Eventos';
import Vistos from '../components/home/Vistos';
import SectionHeader from '../components/home/SectionHeader';
import convenio from "./../assets/img/convenio.jpg";
import conferencia from "./../assets/img/conferencia.jpg";
import './style.css';

const getImageSrc = (path, fallback) =>
  path ? mediaUrl(path) : fallback;

const formatDate = (value) => {
  if (!value) return 'Fecha no disponible';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('es-PE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const stripHtml = (html) => (html || '').replace(/<[^>]*>/g, '').trim();

const hasText = (item) => {
  if (!item || !item.fields) return false;
  const f = item.fields;
  return !!(f.new_txt_tittle?.trim() || f.new_txt_description?.trim());
};

const hasFullText = (item) => {
  if (!item || !item.fields) return false;
  const f = item.fields;
  return hasText(item) && stripHtml(f.new_txt_content).length >= 150;
};

const Home = () => {
  const [mainNews, setMainNews] = useState(null);
  const [secondaryNews, setSecondaryNews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [viewingItem, setViewingItem] = useState(null);

  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const getNews = async () => {
      try {
        const data = await fetchNews();
        if (Array.isArray(data) && data.length > 0) {
          const sortedNews = data.sort((a, b) => b.pk - a.pk);
          setMainNews(sortedNews.find(item => item.fields.ctn_int_id === 1));
          setSecondaryNews(sortedNews.filter(item => item.fields.ctn_int_id == 2));
        }
      } catch (error) {
        console.error('Error fetching news:', error);
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

  return (
    <div className="bg-maynas-paper min-h-screen flex flex-col">
      <Header />
      <Modal isOpen={isModalOpen} closeModal={closeModal} />

      <main className="flex-grow pt-20 md:pt-36">
        <Carrousel />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Últimas noticias */}
          <section className="py-12 md:py-16">
            <SectionHeader
              eyebrow="Noticias"
              title="Últimas noticias"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[mainNews, ...secondaryNews].filter(Boolean).map((item) => {
                const isMain = item === mainNews;
                const isPictureOnly = !hasText(item);
                return (
                  <button
                    key={item.pk}
                    type="button"
                    onClick={() => setViewingItem(item)}
                    className="group flex flex-col h-full bg-white rounded-xl overflow-hidden ring-1 ring-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 text-left w-full"
                  >
                    {isPictureOnly ? (
                      <div className="flex-grow bg-gray-100 overflow-hidden">
                        <img
                          src={getImageSrc(item.fields.new_txt_urlimage, isMain ? conferencia : convenio)}
                          alt={item.fields.new_txt_tittle || 'Noticia'}
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <>
                        <div className="h-56 bg-gray-100 overflow-hidden flex-shrink-0">
                          <img
                            src={getImageSrc(item.fields.new_txt_urlimage, isMain ? conferencia : convenio)}
                            alt={item.fields.new_txt_tittle}
                            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className={`p-4 md:p-5 flex flex-col flex-grow ${isMain ? 'bg-maynas-navy' : ''}`}>
                          {isMain && (
                            <p className="text-[11px] uppercase tracking-[0.2em] text-white/70">
                              Noticia destacada
                            </p>
                          )}
                          <h3 className={`font-display font-bold line-clamp-2 min-h-[2.5rem] md:min-h-[3rem] ${isMain ? 'text-xl md:text-2xl text-white mt-1 leading-snug' : 'text-maynas-navy group-hover:text-maynas-red transition-colors duration-200'}`}>
                            {item.fields.new_txt_tittle || '\u00A0'}
                          </h3>
                          <p className={`mt-1.5 text-xs min-h-[1.125rem] ${isMain ? 'text-white/85' : 'text-gray-500'}`}>
                            {formatDate(item.fields.new_datetime_datecreate) || '\u00A0'}
                          </p>
                          <span className="mt-auto pt-2 inline-flex items-center gap-1 text-sm font-semibold text-maynas-red group-hover:underline">
                            Ver más →
                          </span>
                        </div>
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          </section>

          <Eventos />
          <Vistos />
        </div>
      </main>
      <Footer />

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
                  title="Cerrar (Esc)"
                >
                  ×
                </button>
              </div>
            )}
            {hasText(viewingItem) && (
              <div className="p-6 overflow-y-auto flex-1">
                {viewingItem.fields?.new_txt_tittle && (
                  <h2 className="text-2xl font-bold text-gray-800 mb-2 break-words">
                    {viewingItem.fields.new_txt_tittle}
                  </h2>
                )}
                {viewingItem.fields?.new_txt_description && (
                  <p className="text-gray-600 italic mb-4 break-words">
                    {viewingItem.fields.new_txt_description}
                  </p>
                )}
                {viewingItem.fields?.new_txt_content && (
                  <div
                    className="prose max-w-none text-gray-800 break-words [overflow-wrap:anywhere]"
                    dangerouslySetInnerHTML={{ __html: viewingItem.fields.new_txt_content }}
                  />
                )}
              </div>
            )}
            <div className="p-4 border-t flex justify-end items-center flex-shrink-0 bg-gray-50">
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

export default Home;