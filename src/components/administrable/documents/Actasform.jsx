import React, { useState, useEffect } from "react";
import axios from "axios";

const ActasForm = ({ documentId = null }) => {
  const [documentTypes, setDocumentTypes] = useState([]);
  const [formData, setFormData] = useState({
    doc_txt_name: "",
    doc_txt_description: "",
    dot_int_year: "",
    doc_txt_author: "",
    doc_txt_url: "",
    doc_double_weight: "",
    doc_txt_extension: "",
    dot_int_id: "", // Esto corresponde al tipo de documento
    use_int_id: "", // Esto puede ser el ID del usuario (o lo manejas de forma interna)
  });
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Obtener los tipos de documentos desde la API
    axios.get(apiUrl+"document_types/") // URL corregida
      .then(response => {
        setDocumentTypes(response.data);
      })
      .catch(error => {
        console.error("Error fetching document types:", error);
      });

    if (documentId) {
      // Si hay un `documentId`, obtener los detalles del documento para actualizar
      axios.get(apiUrl+`documents/${documentId}/`) // URL corregida
        .then(response => {
          setFormData({
            doc_txt_name: response.data.doc_txt_name || "",
            doc_txt_description: response.data.doc_txt_description || "",
            dot_int_year: response.data.dot_int_year || "",
            doc_txt_author: response.data.doc_txt_author || "",
            doc_txt_url: response.data.doc_txt_url || "",
            doc_double_weight: response.data.dot_double_weight || "",
            doc_txt_extension: response.data.doc_txt_extension || "",
            dot_int_id: response.data.dot_int_id.id || "", // Tipo de documento
            use_int_id: response.data.use_int_id || "", // Usuario
          });
        })
        .catch(error => {
          console.error("Error fetching document details:", error);
        });
    }
  }, [documentId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const apiUrl = documentId ? apiUrl+`documents/${documentId}/` : apiUrl+"documents/";  // URL corregida
    const method = documentId ? "put" : "post";

    axios({
      method: method,
      url: apiUrl,
      data: formData,
    })
      .then(response => {
        console.log("Documento guardado/actualizado:", response.data);
      })
      .catch(error => {
        console.error("Error al guardar/actualizar el documento:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="w-full max-w-screen-lg bg-white shadow-md rounded-lg p-6">
      <form onSubmit={handleSubmit}>
        {/* Nombre del Documento */}
        <div className="mb-4">
          <label htmlFor="doc_txt_name" className="block text-sm font-medium text-gray-700">
            Nombre del Documento
          </label>
          <input
            type="text"
            id="doc_txt_name"
            name="doc_txt_name"
            value={formData.doc_txt_name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Descripción del Documento */}
        <div className="mb-4">
          <label htmlFor="doc_txt_description" className="block text-sm font-medium text-gray-700">
            Descripción
          </label>
          <input
            type="text"
            id="doc_txt_description"
            name="doc_txt_description"
            value={formData.doc_txt_description}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Año */}
        <div className="mb-4">
          <label htmlFor="dot_int_year" className="block text-sm font-medium text-gray-700">
            Año
          </label>
          <input
            type="number"
            id="dot_int_year"
            name="dot_int_year"
            value={formData.dot_int_year}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Autor */}
        <div className="mb-4">
          <label htmlFor="doc_txt_author" className="block text-sm font-medium text-gray-700">
            Autor
          </label>
          <input
            type="text"
            id="doc_txt_author"
            name="doc_txt_author"
            value={formData.doc_txt_author}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* URL del Documento */}
        <div className="mb-4">
          <label htmlFor="doc_txt_url" className="block text-sm font-medium text-gray-700">
            URL del Documento
          </label>
          <input
            type="text"
            id="doc_txt_url"
            name="doc_txt_url"
            value={formData.doc_txt_url}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Peso del Documento */}
        <div className="mb-4">
          <label htmlFor="dot_double_weight" className="block text-sm font-medium text-gray-700">
            Peso
          </label>
          <input
            type="number"
            step="0.01"
            id="dot_double_weight"
            name="dot_double_weight"
            value={formData.dot_double_weight}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Extensión del Documento */}
        <div className="mb-4">
          <label htmlFor="doc_txt_extension" className="block text-sm font-medium text-gray-700">
            Extensión
          </label>
          <input
            type="text"
            id="doc_txt_extension"
            name="doc_txt_extension"
            value={formData.doc_txt_extension}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Tipo de Documento */}
        <div className="mb-4">
          <label htmlFor="dot_int_id" className="block text-sm font-medium text-gray-700">
            Tipo de Documento
          </label>
          <select
            id="dot_int_id"
            name="dot_int_id"
            value={formData.dot_int_id}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Seleccione un tipo</option>
            {documentTypes.map((type) => (
              <option key={type.dot_int_id} value={type.dot_int_id}>
                {type.dot_txt_name}
              </option>
            ))}
          </select>
        </div>

        {/* Usuario */}
        <div className="mb-4">
          <label htmlFor="use_int_id" className="block text-sm font-medium text-gray-700">
            Usuario (opcional)
          </label>
          <input
            type="text"
            id="use_int_id"
            name="use_int_id"
            value={formData.use_int_id}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Botón de Envío */}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
          {documentId ? "Actualizar Documento" : "Agregar Documento"}
        </button>
      </form>
    </div>
  );
};

export default ActasForm;
