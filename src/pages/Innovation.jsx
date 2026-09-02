import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { pickValidImageFile } from '../utils/validateImage';
import Footer from '../components/Footer';
import InnovationList from '../components/Innovacion/InnovationList';  // Importamos InnovationList
import { fetchInnovations, createInnovation } from '../services/innovationService';  // Importamos el servicio para obtener y crear innovaciones

const Innovation = () => {
  const [innovations, setInnovations] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newImage, setNewImage] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false); // Controla la visibilidad del formulario

  // Al montar el componente, obtenemos todas las innovaciones
  useEffect(() => {
    const loadInnovations = async () => {
      const fetchedInnovations = await fetchInnovations();
      setInnovations(fetchedInnovations);
    };

    loadInnovations();
  }, []);

  // Maneja el envío del formulario para agregar una nueva innovación
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newTitle || !newDescription || !newImage) {
      alert("Por favor, completa todos los campos antes de enviar.");
      return;
    }

    const newInnovation = {
      inn_txt_image: newImage,
      inn_txt_tittle: newTitle,
      inn_txt_description: newDescription,
      inn_txt_state: 'ACTIVO',
    };

    try {
      const createdInnovation = await createInnovation(newInnovation); // Llamamos para crear la nueva innovación

      if (createdInnovation) {
        setInnovations([createdInnovation, ...innovations]); // Actualizamos las innovaciones con la nueva innovación
        setNewTitle('');
        setNewDescription('');
        setNewImage(null);
        setIsFormVisible(false); // Ocultamos el formulario
      }
    } catch (error) {
      console.error("Error creando la innovación:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-5 pt-32 flex flex-col items-center">
        
        {/* Botón para agregar nueva innovación */}

        {localStorage.getItem('id') && (
          <div className="flex justify-end">
            <button
              onClick={() => setIsFormVisible(!isFormVisible)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
              {isFormVisible ? 'Cancelar' : 'Agregar Innovación'}
            </button>
          </div>
        )}


        {/* Formulario para agregar una nueva innovación */}
        {isFormVisible && (
          <form onSubmit={handleSubmit} className="w-[70%] mb-6 p-4 bg-gray-100 rounded-md">
            <div className="mb-4">
              <label className="block text-sm font-semibold">URL de IMAGEN</label>
              {/* <input
                type="text"
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              /> */}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = pickValidImageFile(e);
                  if (file) setNewImage(file);
                }}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold">Título:</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold">Descripción:</label>
              <input
                type="text"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-green-500 text-white rounded-md"
            >
              Agregar Innovación
            </button>
          </form>
        )}

        {/* Título de Innovaciones */}
        <div className="w-4/5 flex justify-between items-center">
          <div className="text-black text-2xl font-bold font-inter">
            INNOVACIONES
          </div>
        </div>

        {/* Aquí usamos InnovationList para renderizar las innovaciones */}
        <div className="w-4/5 mb-4">
          <InnovationList innovationItems={innovations} /> {/* Renderizamos las innovaciones */}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Innovation;
