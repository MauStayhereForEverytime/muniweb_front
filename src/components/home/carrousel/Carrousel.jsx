/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { fetchImages, mediaUrl } from '../../../services/carrouselService';
import './home-carousel.css';

const PrevArrow = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label="Anterior"
    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-maynas-red transition-colors duration-200"
  >
    <FaChevronLeft />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label="Siguiente"
    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-maynas-red transition-colors duration-200"
  >
    <FaChevronRight />
  </button>
);

const Carrousel = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages().then(setImages);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: false,
    verticalSwiping: false,
    rtl: false,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    pauseOnFocus: true,
    fade: false,
    cssEase: 'ease-in-out',
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <div className="home-carousel-scope relative max-w-7xl mx-auto h-[420px] sm:h-[480px] md:h-[560px] lg:h-[640px] overflow-hidden bg-gray-200 rounded-xl">
      {images.length > 0 ? (
        <Slider {...settings}>
          {images.map((image) => {
            const showTitle = image.ima_txt_name && image.ima_boo_showtitle !== false;
            return (
              <div key={image.ima_int_id} className="relative h-full">
                <img
                  src={mediaUrl(image.ima_txt_urlpath)}
                  alt={image.ima_txt_name}
                />
                {showTitle && (
                  <div className="absolute left-4 md:left-6 lg:left-8 bottom-16 md:bottom-20 z-20 max-w-[60%] md:max-w-[50%]">
                    <div className="bg-maynas-navy/85 backdrop-blur-sm px-4 md:px-6 py-2 md:py-3 rounded-lg shadow-lg">
                      <p className="font-display text-lg md:text-xl lg:text-2xl font-bold text-white line-clamp-2 drop-shadow">
                        {image.ima_txt_name}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </Slider>
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-500">
          No hay imágenes en el carrusel
        </div>
      )}
    </div>
  );
};

export default Carrousel;