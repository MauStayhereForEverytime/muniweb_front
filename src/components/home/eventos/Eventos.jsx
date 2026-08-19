import { useEffect, useState } from 'react';
import { fetchEventImages, mediaUrl } from '../../../services/eventService';
import { Link } from 'react-router-dom';
import SectionHeader from '../SectionHeader';

const Eventos = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const getImages = async () => {
      const data = await fetchEventImages();
      setImages(data);
    };
    getImages();
  }, []);

  return (
    <div className="relative pt-12 md:pt-16">
      <SectionHeader
        eyebrow="Agenda"
        title="Eventos"
        linkTo="/eventos-todos"
        linkLabel="Ver todos"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {images.length === 0 ? (
          <div className="col-span-2 w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500 rounded-xl">
            No hay eventos disponibles
          </div>
        ) : images.slice(0, 2).map((image) => {
          const imageSrc = mediaUrl(image.ima_txt_urlpath);
          const altText = image.ima_txt_name;

          const card = (
            <div className="group relative h-64 sm:h-80 bg-maynas-neutral overflow-hidden rounded-xl ring-1 ring-gray-200 shadow-md">
              <img
                src={imageSrc}
                alt={altText}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-maynas-navy/90 via-maynas-navy/40 to-transparent px-5 pb-5 pt-16">
                <p className="font-display text-lg font-bold text-white line-clamp-2">
                  {altText}
                </p>
              </div>
            </div>
          );

          return (
            <div key={image.ima_int_id}>
              {image.ima_txt_urlgob ? (
                <a
                  href={image.ima_txt_urlgob}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {card}
                </a>
              ) : (
                <Link to={`/eventos/edit/${image.ima_int_id}`}>
                  {card}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Eventos;
