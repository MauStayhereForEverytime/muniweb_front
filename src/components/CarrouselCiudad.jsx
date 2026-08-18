import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import iquitos1 from "../assets/img/iquitoscity/iquitos1.jpeg";
import iquitos2 from "../assets/img/iquitoscity/iquitos2.jpeg";
import iquitos3 from "../assets/img/iquitoscity/iquitos3.jpeg";

const Carousel = () => {
  const settings = {
    dots: true, // Muestra puntos de navegación
    infinite: true, // Carrusel infinito
    speed: 500, // Velocidad de transición (ms)
    slidesToShow: 1, // Cantidad de imágenes visibles
    slidesToScroll: 1, // Cantidad de imágenes que se desplazan
    autoplay: true, // Activar el desplazamiento automático
    autoplaySpeed: 2000, // Tiempo entre desplazamientos (ms)
  };

  const images = [iquitos1, iquitos2, iquitos3];
  return (
    <Slider {...settings}>
      {images.map((src, index) => (
        <div key={index}>
          <img
            src={src}
            alt={`Slide ${index + 1}`}
            className="h-fit h-min-400 w-min-500"
          />
        </div>
      ))}
    </Slider>
  );
};

export default Carousel;
