import React, { useState, useEffect } from 'react';
import { fetchNews } from '../services/newsService';
import { Link } from 'react-router-dom';
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

const getImageSrc = (base64, fallback) =>
  base64 ? `data:image/jpeg;base64,${base64}` : fallback;

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

const Home = () => {
  const [mainNews, setMainNews] = useState(null);
  const [secondaryNews, setSecondaryNews] = useState([]);
  const [compromisosValue, setCompromisosValue] = useState([]);
  const [commitments, setCommitments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    // Cargar el SDK de Facebook
    const loadFacebookSDK = () => {
      if (window.FB) {
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://connect.facebook.net/es_ES/sdk.js#xfbml=1&version=v22.0';
      script.async = true;
      script.defer = true;
      script.crossOrigin = 'anonymous';
      script.onload = () => {
        window.FB.XFBML.parse(); // Parsear los elementos XFBML cuando el SDK esté listo
      };
      document.body.appendChild(script);
    };

    loadFacebookSDK();
  }, []);

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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Noticia principal */}
              {mainNews && (
                <Link
                  to={`/news/${mainNews.pk}`}
                  className="group lg:col-span-2 block bg-white rounded-xl overflow-hidden ring-1 ring-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative aspect-[16/9] md:aspect-[16/8] overflow-hidden">
                    <img
                      src={getImageSrc(mainNews.fields.new_txt_urlimage, conferencia)}
                      alt={mainNews.fields.new_txt_tittle}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
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
                  </div>
                </Link>
              )}

              {/* Facebook plugin */}
              <div className="bg-white rounded-xl ring-1 ring-gray-200 shadow-sm p-5 md:p-6">
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-maynas-red">
                  Nuestra comunidad
                </p>
                <div
                  className="fb-page w-full"
                  data-href="https://www.facebook.com/munimaynasperu"
                  data-tabs="timeline"
                  data-width="500"
                  data-height="500"
                  data-small-header="false"
                  data-adapt-container-width="true"
                  data-hide-cover="false"
                  data-show-facepile="true"
                >
                  <blockquote
                    cite="https://www.facebook.com/munimaynasperu"
                    className="fb-xfbml-parse-ignore"
                  >
                    <a href="https://www.facebook.com/munimaynasperu">Municipalidad Provincial de Maynas</a>
                  </blockquote>
                </div>
              </div>
            </div>

            {/* Noticias recientes */}
            {secondaryNews.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {secondaryNews.map((item) => (
                  <Link
                    key={item.pk}
                    to={`/news/${item.pk}`}
                    className="group block bg-white rounded-xl overflow-hidden ring-1 ring-gray-200 shadow-sm hover:shadow-lg transition-all duration-300"
                  >
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        src={getImageSrc(item.fields.new_txt_urlimage, convenio)}
                        alt={item.fields.new_txt_tittle}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4 md:p-5">
                      <h3 className="font-display font-bold text-maynas-navy group-hover:text-maynas-red transition-colors duration-200 line-clamp-2">
                        {item.fields.new_txt_tittle}
                      </h3>
                      <p className="mt-1.5 text-xs text-gray-500">
                        {formatDate(item.fields.new_datetime_datecreate)}
                      </p>
                    </div>
                  </Link>
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
    </div>
  );
};

export default Home;
