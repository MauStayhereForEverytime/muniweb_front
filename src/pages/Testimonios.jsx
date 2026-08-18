// src/pages/Testimonios.jsx
import React, { useState, useEffect } from 'react';
import { fetchTestimonios } from '../services/testimoniosService'; // Crear un servicio para obtener los testimonios
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './style.css';

const Testimonios = () => {
  const [testimonios, setTestimonios] = useState([]);
    const [isAdmin, setIsAdmin] = useState(true); // Simulamos que el usuario es admin
    const apiUrl = import.meta.env.VITE_API_URL;
  
    useEffect(() => {
      // Obtener todos los testimonios
      const getTestimonios = async () => {
        try {
          const response = await fetch(apiUrl+'testimonios/');
          const data = await response.json();
  
          console.log('Testimonios obtenidos:', data); // Depurando los testimonios obtenidos
          setTestimonios(data);
        } catch (error) {
          console.error('Error al obtener testimonios:', error);
        }
      };
  
      getTestimonios();
    }, []);
  
    // Función para cambiar el estado del testimonio
    const changeTestimonyState = async (testimonyId) => {
      try {
        console.log(`Cambiando estado del testimonio con ID: ${testimonyId}`); // Depurando el ID que se está pasando
  
        const response = await fetch(apiUrl+`testimonios/${testimonyId}/cambiar_estado/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCSRFToken(), // Incluye el token CSRF
          },
        });
  
        const data = await response.json();
        console.log('Respuesta al cambiar estado:', data); // Depurando la respuesta del backend
  
        if (response.ok) {
          // Actualizamos el estado del testimonio en la UI
          setTestimonios(prevState =>
            prevState.map(testimonial =>
              testimonial.id === testimonyId
                ? { ...testimonial, state: data.message.split(' ')[1] }
                : testimonial
            )
          );
          console.log('Testimonio actualizado en la UI:', testimonyId);
        } else {
          alert(data.error);
          console.error('Error al cambiar estado:', data.error);
        }
      } catch (error) {
        console.error('Error al cambiar el estado:', error);
      }
    };

    const testimoniosPorPagina = 6;
    const [currentPage, setCurrentPage] = useState(1);
    
    const indexUltimo = currentPage * testimoniosPorPagina;
    const indexPrimero = indexUltimo - testimoniosPorPagina;
    const testimoniosPaginados = testimonios.slice(indexPrimero, indexUltimo);
    
    const totalPaginas = Math.ceil(testimonios.length / testimoniosPorPagina);

    
    useEffect(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);
    


  return (
    <>
    <Header />
  <br /> <br />


    <div className=" testimonios-container1 max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-12">
        Todos los{' '}
        <span className="text-[#23355B]">testimonios</span>
      </h2>
  
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {testimonios.length > 0 ? (
         testimoniosPaginados.map((testimonial, index) => {
            const colors = ['bg-[#4A90E2]', 'bg-[#50E3C2]', 'bg-[#D00274]'];
            const color = colors[index % colors.length];
            return (
              <div key={testimonial.id} className={`rounded-lg shadow-lg pb-6 pt-16 relative ${color}`}>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <img
                    src={testimonial.tes_txt_avatar || '/default-avatar.png'}
                    alt={testimonial.tes_txt_name}
                    className="w-24 h-24 rounded-full border-1 border-white shadow-md object-cover"
                  />
                </div>
                <div className="text-center px-6 mt-6">
                  <h3 className="text-white font-bold text-lg">{testimonial.tes_txt_name}</h3>
                  <p className="text-white text-sm">{testimonial.tes_txt_mail}</p>
                  <p className="text-white text-sm mt-4">{testimonial.tes_txt_comment}</p>
  
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500 col-span-3">
            No hay testimonios disponibles aún.
          </p>
        )}
      </div>

      {totalPaginas > 1 && (
  <div className="flex justify-center mt-8 flex-wrap items-center gap-2">
    
    {/* Botón Anterior */}
    <button
      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
      className={`px-4 py-2 rounded ${
        currentPage === 1
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : 'bg-[#23355B] text-white hover:bg-[#1c2a49]'
      }`}
    >
      Anterior
    </button>

    {/* Botones de número */}
    {Array.from({ length: totalPaginas }, (_, i) => (
      <button
        key={i}
        onClick={() => setCurrentPage(i + 1)}
        className={`px-4 py-2 rounded ${
          currentPage === i + 1
            ? 'bg-[#23355B] text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        {i + 1}
      </button>
    ))}

    {/* Botón Siguiente */}
    <button
      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPaginas))}
      disabled={currentPage === totalPaginas}
      className={`px-4 py-2 rounded ${
        currentPage === totalPaginas
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : 'bg-[#23355B] text-white hover:bg-[#1c2a49]'
      }`}
    >
      Siguiente
    </button>
  </div>
)}


  
      <div className="text-center mt-12">
        <Link to="/home" className="text-[#23355B] font-semibold text-lg">
          Volver a la página principal
        </Link>
      </div>
    </div>



  
    <Footer />
  </>
  
  );
};

export default Testimonios;
