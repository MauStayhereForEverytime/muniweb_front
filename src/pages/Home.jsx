import React, { useState, useEffect } from 'react';
import { fetchNews, mediaUrl } from '../services/newsService';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Carrousel from '../components/home/carrousel/Carrousel';
import Modal from '../components/home/Modal';
import Eventos from '../components/home/eventos/Eventos';
import Vistos from '../components/home/Vistos';
import SectionHeader from '../components/home/SectionHeader';
import PhysicalGoalCompletionChart from '../components/administrable/compromisos/PhysicalGoalCompletionChart';
import convenio from "./../assets/img/convenio.jpg";
import Testimonios from '../components/home/testimonios/Testimonios';
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

const hasFullText = (item) => {
  if (!item || !item.fields) return false;
  const f = item.fields;
  const hasTitleOrDesc =
    (f.new_txt_tittle && f.new_txt_tittle.trim()) ||
    (f.new_txt_description && f.new_txt_description.trim());
  return hasTitleOrDesc && stripHtml(f.new_txt_content).length >= 150;
};

const Home = () => {
  const [mainNews, setMainNews] = useState(null);
  const [secondaryNews, setSecondaryNews] = useState([]);
  const [compromisosValue, setCompromisosValue] = useState([]);
  const [commitments, setCommitments] = useState([]);
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
          setSecondaryNews(sortedNews.filter(item => item.fields.ctn_int_id == 2).slice(0, 3));
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
              linkTo="/noticias"
              linkLabel="Ver todas"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Noticia principal */}
              {mainNews && (
                <button
                  type="button"
                  onClick={() => setViewingItem(mainNews)}
                  className="group block bg-white rounded-xl overflow-hidden ring-1 ring-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300 text-left w-full"
                >
                  <div className="relative aspect-video bg-gray-100 overflow-hidden">
                    <img
                      src={getImageSrc(mainNews.fields.new_txt_urlimage, conferencia)}
                      alt={mainNews.fields.new_txt_tittle}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  {hasFullText(mainNews) && (
                    <div className="bg-maynas-navy p-5 md:p-6">
                      <p className="text-[11px] uppercase tracking-[0.2em] text-white/70">
                        Noticia destacada
                      </p>
                      <h3 className="font-display text-xl md:text-2xl font-bold text-white mt-1 leading-snug line-clamp-2">
                        {mainNews.fields.new_txt_tittle}
                      </h3>
                      <p className="text-sm text-white/85 mt-2 line-clamp-2">
                        {mainNews.fields.new_txt_description}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-maynas-red group-hover:underline">
                        Ver más →
                      </span>
                    </div>
                  )}
                </button>
              )}

              {/* Noticias recientes (combinadas en el mismo grid) */}
              {secondaryNews.length > 0 && secondaryNews.slice(0, mainNews ? 1 : 3).map((item) => (
                <button
                  key={item.pk}
                  type="button"
                  onClick={() => setViewingItem(item)}
                  className="group block bg-white rounded-xl overflow-hidden ring-1 ring-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 text-left w-full"
                >
                  <div className="aspect-video bg-gray-100 overflow-hidden">
                    <img
                      src={getImageSrc(item.fields.new_txt_urlimage, convenio)}
                      alt={item.fields.new_txt_tittle}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  {hasFullText(item) && (
                    <div className="p-4 md:p-5">
                      <h3 className="font-display font-bold text-maynas-navy group-hover:text-maynas-red transition-colors duration-200 line-clamp-2">
                        {item.fields.new_txt_tittle}
                      </h3>
                      <p className="mt-1.5 text-xs text-gray-500">
                        {formatDate(item.fields.new_datetime_datecreate)}
                      </p>
                      <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-maynas-red group-hover:underline">
                        Ver más →
                      </span>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Resto de noticias recientes */}
            {secondaryNews.length > (mainNews ? 1 : 3) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {secondaryNews.slice(mainNews ? 1 : 3).map((item) => (
                  <button
                    key={item.pk}
                    type="button"
                    onClick={() => setViewingItem(item)}
                    className="group block bg-white rounded-xl overflow-hidden ring-1 ring-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 text-left w-full"
                  >
                    <div className="aspect-video bg-gray-100 overflow-hidden">
                      <img
                        src={getImageSrc(item.fields.new_txt_urlimage, convenio)}
                        alt={item.fields.new_txt_tittle}
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    {hasFullText(item) && (
                      <div className="p-4 md:p-5">
                        <h3 className="font-display font-bold text-maynas-navy group-hover:text-maynas-red transition-colors duration-200 line-clamp-2">
                          {item.fields.new_txt_tittle}
                        </h3>
                        <p className="mt-1.5 text-xs text-gray-500">
                          {formatDate(item.fields.new_datetime_datecreate)}
                        </p>
                        <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-maynas-red group-hover:underline">
                          Ver más →
                        </span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </section>

          <Eventos />
          <Vistos />

          {/* Compromisos */}
          <section className="py-12 md:py-16">
            <SectionHeader
              eyebrow="Gestión"
              title="Compromisos"
              linkTo="/compromiso"
              linkLabel="Ver todos"
            />
            <div className="bg-white rounded-xl ring-1 ring-gray-200 shadow-sm p-5 md:p-8">
              <div className="mx-auto w-full md:w-2/3">
                <PhysicalGoalCompletionChart
                  compromisosValue={compromisosValue}
                  commitments={commitments}
                />
              </div>
            </div>
          </section>

          <Testimonios />
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