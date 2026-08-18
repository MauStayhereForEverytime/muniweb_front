import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NewsList from '../components/noticias/NewsList'; // Usamos el componente NewsList para las noticias secundarias
import { fetchNews } from '../services/newsService'; // Asegúrate de tener esta función para traer las noticias

const Home = () => {
  const [news, setNews] = useState([]);
  const [mainNews, setMainNews] = useState(null);  // Para la noticia principal
  const [secondaryNews, setSecondaryNews] = useState([]);  // Para las noticias secundarias

  useEffect(() => {
    const getNews = async () => {
      const data = await fetchNews(); // Traemos las noticias desde el backend
      setNews(data);
  
      // Asegúrate de que solo haya una noticia principal con ctn_int_id === 1
      const main = data.find(item => item.fields.ctn_int_id === 1);  // Tomamos la primera noticia con ctn_int_id === 1
      const secondary = data.filter(item => item.fields.ctn_int_id !== 1);
  
      setMainNews(main);
      setSecondaryNews(secondary);
    };
    getNews();
  }, []);  

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-5 pt-32 flex flex-col items-center">
        {/* Líneas de separación */}
        <div className="w-4/5 h-[1px] border-t border-black"></div>
        <div className="w-4/5 flex justify-between items-center">
          <div className="text-black text-2xl font-bold font-inter">
            Noticias
          </div>
        </div>
        <div className="w-4/5 h-[1px] border-t border-black"></div>

        {/* Contenedor para las noticias */}
        <div className="w-4/5 mb-4">
          {/* Noticias secundarias, ya no es necesario el grid, solo mostramos las noticias */}
          <NewsList newsItems={secondaryNews} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
