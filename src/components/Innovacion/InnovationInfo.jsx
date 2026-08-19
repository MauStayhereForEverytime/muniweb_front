import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import QuillEditor from '../noticias/QuillEditor';
import Header from '../Header';
import Footer from '../Footer';
import { fetchInnovationById, deleteInnovation, updateInnovation, mediaUrl } from '../../services/innovationService';
import './InnovationInfo.css';

const InnovationInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [innovation, setInnovation] = useState(null);
  const [isEditing, setIsEditing] = useState(false);  // Para controlar si está en modo de edición
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [updatedImage, setUpdatedImage] = useState(null);

  useEffect(() => {
    const getInnovation = async () => {
      const data = await fetchInnovationById(id);
      console.log(data); // Asegúrate de que los datos estén correctos
      if (data && data[0]) {
        const innovation = data[0].fields;
        setInnovation(innovation);
        setUpdatedTitle(innovation.inn_txt_tittle);
        setUpdatedDescription(innovation.inn_txt_description);
        setUpdatedImage(null);
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
      inn_txt_tittle: updatedTitle,
      inn_txt_description: updatedDescription,
      inn_txt_image: updatedImage,
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
                  const file = e.target.files[0];
                  if (file) setUpdatedImage(file);
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
              <img src={mediaUrl(innovation.inn_txt_image)} alt={innovation.inn_txt_tittle} className="innovation-image" />
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
