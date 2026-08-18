import React, { useState } from 'react';
import Header from "../../components/Header";  // Asegúrate de que el Header esté correctamente implementado
import Footer from "../../components/Footer";  // Asegúrate de que el Footer esté correctamente implementado

const Resoluciones = () => {
  // Datos de ejemplo (reemplazar con los reales)
  const allDocuments = [
    { id: 1, documento: 'Resolución 1', url: 'http://example.com/acta1.pdf' },
    { id: 2, documento: 'Resolución 2', url: 'http://example.com/acta2.pdf' },
    { id: 3, documento: 'Resolución 3', url: 'http://example.com/acta3.pdf' },
    { id: 4, documento: 'Resolución 4', url: 'http://example.com/acta4.pdf' },
    { id: 5, documento: 'Resolución 5', url: 'http://example.com/acta5.pdf' },
    { id: 6, documento: 'Resolución 6', url: 'http://example.com/acta6.pdf' },
    { id: 7, documento: 'Resolución 7', url: 'http://example.com/acta7.pdf' },
    { id: 8, documento: 'Resolución 8', url: 'http://example.com/acta8.pdf' },
    { id: 9, documento: 'Resolución 9', url: 'http://example.com/acta9.pdf' },
    { id: 10, documento: 'Resolución 10', url: 'http://example.com/acta10.pdf' },
    { id: 11, documento: 'Resolución 11', url: 'http://example.com/acta11.pdf' },
    // ...más documentos si es necesario
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 10;

  // Filtrar los documentos por el término de búsqueda
  const filteredDocuments = allDocuments.filter(document =>
    document.documento.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calcular los documentos que se deben mostrar según la página actual
  const indexOfLastDocument = currentPage * itemsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - itemsPerPage;
  const currentDocuments = filteredDocuments.slice(indexOfFirstDocument, indexOfLastDocument);

  // Cambiar de página
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredDocuments.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Contenedor principal */}
      <div className="flex-grow flex justify-center items-center pt-28 px-4 py-6">
        <div className="w-full max-w-screen-lg bg-white shadow-md rounded-lg p-6">

          {/* Barra de búsqueda */}
          <div className="mb-4 flex justify-between items-center">
            <input
              type="text"
              placeholder="Buscar documentos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg w-full max-w-xl"
            />
          </div>

          {/* Contenedor con tabla de documentos y cuadro de Facebook */}
          <div className="flex flex-col md:flex-row md:space-x-6">

            {/* Tabla de documentos */}
            <div className="flex-1 overflow-x-auto bg-white shadow-md rounded-lg">
              <table className="min-w-full table-auto border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 border border-gray-300">ID</th>
                    <th className="px-4 py-2 border border-gray-300">DOCUMENTO</th>
                    <th className="px-4 py-2 border border-gray-300">DESCARGAR</th>
                  </tr>
                </thead>
                <tbody>
                  {currentDocuments.map((document) => (
                    <tr key={document.id}>
                      <td className="px-4 py-2 border border-gray-300">{document.id}</td>
                      <td className="px-4 py-2 border border-gray-300">{document.documento}</td>
                      <td className="px-4 py-2 border border-gray-300">
                        <a href={document.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          Descargar
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Paginación */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-300 text-white rounded-lg disabled:opacity-50"
                >
                  Anterior
                </button>
                <button
                  onClick={nextPage}
                  disabled={currentPage === Math.ceil(filteredDocuments.length / itemsPerPage)}
                  className="px-4 py-2 bg-gray-300 text-white rounded-lg disabled:opacity-50"
                >
                  Siguiente
                </button>
              </div>
            </div>

            {/* Cuadro de Facebook */}
            <div className="w-full md:w-80 mt-6 md:mt-0">
            <iframe
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fweb.facebook.com%2Fmunimaynasperu&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                width="100%"
                height="500"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="Facebook"
            ></iframe>
            </div>

          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Resoluciones;
