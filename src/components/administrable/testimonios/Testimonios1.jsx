import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const getCSRFToken = () => {
  const name = 'csrftoken';
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

const Testimonios1 = () => {
  const [testimonios, setTestimonios] = useState([]);
  const [isAdmin, setIsAdmin] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const testimoniosPorPagina = 5;

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getTestimonios = async () => {
      try {
        const response = await fetch(apiUrl + 'api/testimonios/');
        const data = await response.json();
        setTestimonios(data);
      } catch (error) {
        console.error('Error al obtener testimonios:', error);
      }
    };

    getTestimonios();
  }, []);

  const changeTestimonyState = async (testimonyId, newState) => {
    try {
      const response = await fetch(apiUrl + `testimonios/${testimonyId}/cambiar_estado/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCSRFToken(),
        },
        body: JSON.stringify({ state: newState }),
      });

      const data = await response.json();
      if (response.ok) {
        setTestimonios(prev =>
          prev.map(t =>
            t.id === testimonyId ? { ...t, state: newState } : t
          )
        );
      } else {
        alert(data.error);
        console.error('Error al cambiar estado:', data.error);
      }
    } catch (error) {
      console.error('Error al cambiar el estado:', error);
    }
  };

  const deleteTestimony = async (testimonyId) => {
    try {
      const response = await fetch(apiUrl + `testimonios/${testimonyId}/eliminar/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCSRFToken(),
        },
      });
      const data = await response.json();
      if (response.ok) {
        setTestimonios(prev => prev.filter(t => t.id !== testimonyId));
      } else {
        alert(data.error);
        console.error('Error al eliminar testimonio:', data.error);
      }
    } catch (error) {
      console.error('Error al eliminar el testimonio:', error);
    }
  };

  // Paginación
  const indexUltimo = currentPage * testimoniosPorPagina;
  const indexPrimero = indexUltimo - testimoniosPorPagina;
  const testimoniosActuales = testimonios.slice(indexPrimero, indexUltimo);
  const totalPaginas = Math.ceil(testimonios.length / testimoniosPorPagina);

  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setCurrentPage(nuevaPagina);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 mt-4">
      <h2 className="text-1xl text-center font-extrabold text-[#04042E] mb-8">TODOS LOS TESTIMONIOS</h2>

      <div className="overflow-x-auto rounded-xl shadow-lg">
  <table className="w-full border-collapse border border-gray-300">
    <thead>
      <tr className="bg-gray-800 text-white">
        <th className="border border-green-300 px-4 py-2">Nombre</th>
        <th className="border border-green-300 px-4 py-2">Email</th>
        <th className="border border-green-300 px-4 py-2">Comentario</th>
        <th className="border border-green-300 px-4 py-2">Estado <br /> ACTIVO | INACTIVO</th>
        {isAdmin && <th className="border border-green-300 px-4 py-2">Acciones</th>}
      </tr>
    </thead>
    <tbody>
      {testimoniosActuales.length > 0 ? (
        testimoniosActuales.map((testimonial) => (
          <tr key={testimonial.id} className="even:bg-green-50 hover:bg-gray-300 transition-colors duration-200">
            <td className="border border-blue-200 px-4 py-2 text-center">{testimonial.name}</td>
            <td className="border border-blue-200 px-4 py-2 text-center">{testimonial.email}</td>
            <td className="border border-blue-200 px-4 py-2 text-center">{testimonial.comment}</td>
            <td className="border border-blue-200 px-4 py-2 text-center">
              <div className="flex justify-center items-center">
                <div className="flex flex-col items-center pr-2">
                  <input
                    type="checkbox"
                    checked={testimonial.state === 'ACTIVO'}
                    onChange={() => changeTestimonyState(testimonial.id, 'ACTIVO')}
                    className="mr-2 accent-green-600"
                  />  
                </div>

                <div className="border-l-2 h-8 mx-2 border-gray-300"></div>

                <div className="flex flex-col items-center pl-2">
                  <input
                    type="checkbox"
                    checked={testimonial.state === 'INACTIVO'}
                    onChange={() => changeTestimonyState(testimonial.id, 'INACTIVO')}
                    className="ml-2 accent-red-500"
                  />  
                </div>
              </div>
            </td>
            {isAdmin && (
              <td className="border border-gray-200 px-4 py-2 text-center flex flex-col md:flex-row justify-center gap-2">
                <button
                  onClick={() => deleteTestimony(testimonial.id)}
                  className="p-1 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition-all duration-200"
                >
                  Eliminar
                </button>
              </td>
            )}
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={isAdmin ? 5 : 4} className="text-center text-gray-500 py-4">No hay testimonios disponibles aún.</td>
        </tr>
      )}
    </tbody>
  </table>
</div>




      {/* Controles de paginación */}
      <div className="flex justify-center mt-6 space-x-2">
        <button
          onClick={() => cambiarPagina(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Anterior
        </button>

        {[...Array(totalPaginas)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => cambiarPagina(index + 1)}
            className={`px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-[#23355B] text-white' : 'bg-gray-800'}`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => cambiarPagina(currentPage + 1)}
          disabled={currentPage === totalPaginas}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>

      <div className="text-center mt-6">
        <Link to="/home" className="text-[#23355B] font-semibold text-lg hover:underline">Volver a la página principal</Link>
      </div>
    </div>
  );
};

export default Testimonios1;
