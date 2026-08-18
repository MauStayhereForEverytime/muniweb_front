import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Íconos de edición y eliminación
import QuillEditor from '../noticias/QuillEditor'; // Asegúrate de la importación correcta
import Header from '../Header'; // Agregamos el Header
import Footer from '../Footer'; // Agregamos el Footer
import { fetchInnovationById, deleteInnovation, updateInnovation } from '../../services/innovationService'; // Importamos los servicios correspondientes
import './InnovationInfo.css'; // Asegúrate de tener el CSS para los estilos personalizados

const InnovationInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [innovation, setInnovation] = useState(null);
  const [isEditing, setIsEditing] = useState(false);  // Para controlar si está en modo de edición
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [updatedImage, setUpdatedImage] = useState('');

  useEffect(() => {
    const getInnovation = async () => {
      const data = await fetchInnovationById(id);
      console.log(data); // Asegúrate de que los datos estén correctos
      if (data && data[0]) {  // Verifica si la respuesta tiene datos
        const innovation = data[0].fields;  // Accedemos a los datos dentro de `fields`
        setInnovation(innovation);
        setUpdatedTitle(innovation.inn_txt_tittle);
        setUpdatedDescription(innovation.inn_txt_description);
        setUpdatedImage(innovation.inn_txt_image);
      }
    };
  
    getInnovation();
  }, [id]);
  

  // Función para manejar la eliminación
  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta innovación?')) {
      const success = await deleteInnovation(id);
      if (success) {
        alert('Innovación eliminada correctamente');
        navigate('/innovation'); // Redirige al listado de innovaciones
      } else {
        alert('Hubo un problema al eliminar la innovación.');
      }
    }
  };

  // Función para manejar la edición
  const handleEdit = async () => {
    const updatedData = {
      fields: {
        inn_txt_tittle: updatedTitle,
        inn_txt_description: updatedDescription,  // Usamos QuillEditor para editar la descripción
        inn_txt_image: updatedImage,
      },
    };

    const success = await updateInnovation(id, updatedData);
    if (success) {
      alert('Innovación actualizada correctamente');
      setIsEditing(false);  // Salir del modo de edición
    } else {
      alert('Hubo un problema al actualizar la innovación.');
    }
  };

  if (!innovation) {
    return <div>Loading...</div>;
  }

  return (
    <div className="innovation-info-page">
      {/* Header */}
      <Header />
  
      <div className="innovation-info-container pt-96">

      {localStorage.getItem('id') && (
                <div className="actions-container flex justify-end gap-4 p-4">
                <button
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  <FaTrash /> Eliminar
                </button>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                >
                  <FaEdit /> {isEditing ? 'Cancelar' : 'Editar'}
                </button>
              </div>
        
      )}

  
        {isEditing ? (
          // Formulario de edición
          <div className="edit-form p-4">
            <div className="mb-4">
              <label className="block">URL de Imagen</label>
              {/* <input
                type="text"
                value={updatedImage}
                onChange={(e) => setUpdatedImage(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              /> */}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0]; // Obtén el archivo seleccionado
                  if (file) {
                    const reader = new FileReader(); // Creamos un FileReader
                    reader.onload = (event) => {
                      setUpdatedImage(event.target.result.split(',')[1]); // Guardamos solo el Base64 sin el prefijo "data:image/jpeg;base64,"
                    };
                    reader.readAsDataURL(file); // Leemos el archivo como un URL de datos (Base64)
                  }
                }}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block">Título</label>
              <input
                type="text"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block">Descripción</label>
              {/* Usamos QuillEditor para la descripción */}
              <QuillEditor value={updatedDescription} onChange={setUpdatedDescription} />
            </div>
            <button
              onClick={handleEdit}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Guardar cambios
            </button>
          </div>
        ) : (
          // Vista normal de la innovación
          <div className="innovation-info">
            {innovation.inn_txt_image && (
              <img src={`data:image/jpeg;base64,${innovation.inn_txt_image}`} alt={innovation.inn_txt_tittle} className="innovation-image" />
            )}
            <h1 className="innovation-title">{innovation.inn_txt_tittle}</h1>
            <div className="innovation-content" dangerouslySetInnerHTML={{ __html: innovation.inn_txt_description }} />
  
            {/* Fecha de creación */}
            {innovation.inn_datetime_datecreate && (
              <p className="innovation-date">
                <strong>Fecha de creación: </strong>
                {new Date(innovation.inn_datetime_datecreate).toLocaleDateString()}
              </p>
            )}
          </div>
        )}
      </div>
  
      {/* Footer */}
      <Footer />
    </div>
  );  
};

export default InnovationInfo;
