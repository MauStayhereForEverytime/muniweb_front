import React, { useState, useEffect } from 'react';
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Actas = () => {
  const [documents, setDocuments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 10;
  const apiUrl = import.meta.env.VITE_API_URL;

  // Este es el ID que corresponde a las actas. Asegúrate de que sepas cuál es el valor de dot_int_id para las actas.
  const dotIntIdForActas = 1;  // Reemplaza con el ID correspondiente a las actas en tu base de datos

  // Cargar documentos desde la API
  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      try {
        const response = await fetch(apiUrl+'documents/');
        const data = await response.json();

        // Filtrar los documentos por dot_int_id (actas)
        const filteredDocuments = data.filter((document) => document.dot_int_id === dotIntIdForActas);

        // Guardar solo los campos necesarios (doc_txt_name y doc_txt_url)
        const documentsToDisplay = filteredDocuments.map((document) => ({
          name: document.doc_txt_name,
          url: document.doc_txt_url
        }));

        setDocuments(documentsToDisplay);
      } catch (error) {
        setError('Error al cargar los documentos');
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  // Filtrar los documentos por el término de búsqueda
  const filteredDocuments = documents.filter(document =>
    document.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calcular los documentos a mostrar según la página
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
      <div className="flex-grow flex justify-center items-center pt-28 px-4 py-8">
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

          {/* Tabla de documentos */}
          <div className="flex flex-col md:flex-row md:space-x-6">
            <div className="flex-1 overflow-x-auto bg-white shadow-md rounded-lg">
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>{error}</p>
              ) : (
                <table className="min-w-full table-auto border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2 border border-gray-300">ID</th>
                      <th className="px-4 py-2 border border-gray-300">DOCUMENTO</th>
                      <th className="px-4 py-2 border border-gray-300">DESCARGAR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentDocuments.map((document, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 border border-gray-300">{index + 1}</td>
                        <td className="px-4 py-2 border border-gray-300">{document.name}</td>
                        <td className="px-4 py-2 border border-gray-300">
                          <a href={document.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            Descargar
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

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
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fmunimaynasperu&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
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

export default Actas;
