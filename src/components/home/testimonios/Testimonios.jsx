// src/components/Testimonios.jsx
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { FaQuoteLeft } from "react-icons/fa";
import "../../css/slider-dots.css";


// Obtener token CSRF
const getCSRFToken = () => {
  const name = "csrftoken";
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

const Testimonios = () => {
  const [testimonios, setTestimonios] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [tes_txt_name, setName] = useState("");
  const [tes_txt_mail, setEmail] = useState("");
  const [tes_txt_comment, setTestimonial] = useState("");
  const [message, setMessage] = useState("");
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getTestimonios = async () => {
      try {
        const response = await fetch(apiUrl + "api/testimonios/");
        const data = await response.json();
        setTestimonios(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error al obtener testimonios:", error);
        setTestimonios([]);
      }
    };
    getTestimonios();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tes_txt_name || !tes_txt_mail || !tes_txt_comment) {
      setMessage("Por favor, complete todos los campos.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(apiUrl + "testimonios/agregar/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCSRFToken(),
        },
        body: JSON.stringify({
          tes_txt_name,
          tes_txt_mail,
          tes_txt_comment,
          tes_txt_state: "INACTIVO",
        }),
      });

      if (response.ok) {
        setMessage(
          "Gracias por tu testimonio. Un administrador lo revisará pronto."
        );
        setName("");
        setEmail("");
        setTestimonial("");
        setIsMessageVisible(true);
        setIsFormVisible(false);
      } else {
        setMessage(
          "Hubo un error al enviar el testimonio. Intenta nuevamente."
        );
        setIsMessageVisible(true);
      }
    } catch (error) {
      console.error("Error al enviar el testimonio:", error);
      setMessage("Hubo un error al enviar el testimonio. Intenta nuevamente.");
      setIsMessageVisible(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mostrar solo los primeros 6 testimonios
  const displayedTestimonials = testimonios.slice(0, 6);

  // Configuración del slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="relative">
      {/* Botón para abrir formulario */}
      {!isMessageVisible && (
        <button
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="fixed bottom-4 right-2 bg-maynas-navy text-white p-4 rounded-full shadow-lg z-50 border-4 border-maynas-red"
        >
          Testimonio
        </button>
      )}

      {/* Panel lateral del formulario */}
      <div
        className={`fixed top-0 right-0 w-full md:w-1/3 bg-white p-6 shadow-lg transition-transform duration-500 z-[9999] ${
          isFormVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={() => setIsFormVisible(false)}
          className="absolute top-0.5 left-0.5 bg-maynas-navyDark text-white rounded-full w-6 h-6 flex items-center justify-center"
        >
          x
        </button>

        <h2 className="font-display text-xl font-bold text-maynas-navy">
          Deja tu Testimonio
        </h2>

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label htmlFor="name" className="block text-maynas-navy">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              value={tes_txt_name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded mt-2"
              placeholder="Tu nombre"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-maynas-navy">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              value={tes_txt_mail}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded mt-2"
              placeholder="Tu correo"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="testimonial" className="block text-maynas-navy">
              Tu Testimonio
            </label>
            <textarea
              id="testimonial"
              value={tes_txt_comment}
              onChange={(e) => setTestimonial(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded mt-2"
              placeholder="Escribe tu testimonio..."
              rows="4"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className={`bg-maynas-navy text-white px-6 py-2 rounded mt-4 ${
                isSubmitting ? "cursor-wait" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Enviar Testimonio"}
            </button>
          </div>
        </form>
      </div>

      {/* Popup de mensaje */}
      {isMessageVisible && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md w-96">
            <p className="text-center text-lg font-semibold text-green-500">
              {message}
            </p>
            <div className="mt-4 text-center">
              <button
                onClick={() => {
                  setIsMessageVisible(false);
                  setIsFormVisible(false);
                }}
                className="bg-maynas-navy text-white px-6 py-2 rounded"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SLIDER DE TESTIMONIOS */}
      <div className="pt-12 md:pt-16">
        <div className="pb-5 mb-8 border-b-[3px] border-maynas-red">
          <p className="mb-1 text-[11px] md:text-xs font-semibold uppercase tracking-[0.22em] text-maynas-red">
            Vecinos
          </p>
          <h3 className="font-display text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-maynas-navy">
            Lo que dicen nuestros vecinos
          </h3>
        </div>

        {displayedTestimonials.length > 0 ? (
          <Slider {...settings}>
            {displayedTestimonials.map((testimonial, index) => (
              <div key={index} className="p-4">
                <div className="bg-white p-6 rounded-xl ring-1 ring-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between min-h-[200px] max-h-[200px] overflow-hidden">
                  <div>
                    <FaQuoteLeft className="text-maynas-red text-3xl mx-auto mb-4 opacity-80" />
                    <p className="text-gray-700 italic mb-4 line-clamp-4">
                      &ldquo;{testimonial.comment}&rdquo;
                    </p>
                  </div>
                  <p className="font-display font-bold text-lg text-maynas-navy">
                    {testimonial.name}
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <div className="w-full h-32 bg-gray-100 flex items-center justify-center text-gray-500 rounded-xl">
            No hay testimonios disponibles
          </div>
        )}

        <div className="text-center mt-6">
          <Link
            to="/testimonios"
            className="text-maynas-navy font-semibold text-lg hover:text-maynas-red transition-colors duration-300"
          >
            Ver todos los testimonios
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Testimonios;
