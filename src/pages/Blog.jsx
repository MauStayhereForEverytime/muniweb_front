import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BlogList from '../components/blog/BlogList';
import { fetchBlogs, createBlog } from '../services/blogService';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newImage, setNewImage] = useState(null);
const [newImagePreview, setNewImagePreview] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const getBlogs = async () => {
      const data = await fetchBlogs();
      setBlogs(data);
    };
    getBlogs();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      setNewImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newTitle || !newDescription || !newContent || !newImage) {
      alert("Por favor, completa todos los campos antes de enviar.");
      return;
    }

    const newBlog = {
      new_txt_urlimage: newImage,
      new_txt_tittle: newTitle,
      new_txt_description: newDescription,
      new_txt_content: newContent,
      new_txt_state: 'ACTIVO',
      ctn_int_id: 3,
    };

    try {
      const createdBlog = await createBlog(newBlog);

      if (createdBlog) {
        setBlogs([createdBlog, ...blogs]);
        setNewTitle('');
        setNewDescription('');
        setNewContent('');
        setNewImage(null);
        setNewImagePreview(null);
        setIsFormVisible(false);
      }
    } catch (error) {
      console.error("Error creando el blog:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-5 pt-32 flex flex-col items-center">
        
        {/* Botón para agregar nuevo blog */}
        {localStorage.getItem('id') != null && (
          <div className="flex justify-end w-full max-w-4xl mb-4">
            <button
              onClick={() => setIsFormVisible(!isFormVisible)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              {isFormVisible ? 'Cancelar' : 'Agregar Blog'}
            </button>
          </div>
        )}

        {/* Formulario para agregar un nuevo blog */}
        {isFormVisible && (
          <form onSubmit={handleSubmit} className="w-[70%] mb-6 p-4 bg-white rounded-md shadow-md">
            <div className="mb-4">
              <label className="block text-sm font-semibold">Imagen</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />

              {newImagePreview && (
                <img
                  src={newImagePreview}
                  alt="Previsualización"
                  className="w-24 h-24 object-cover mt-2 rounded"
                />
              )}
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
            <div className="mb-4">
              <label className="block text-sm font-semibold">Contenido:</label>
              <CKEditor
                editor={ClassicEditor}
                data={newContent}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setNewContent(data);
                }}
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Agregar Blog
            </button>
          </form>
        )}

        {/* Título del Blog */}
        <div className="w-4/5 flex justify-between items-center mb-4">
          <div className="text-black text-2xl font-bold font-inter">
            BLOG
          </div>
        </div>

        {/* Lista de blogs */}
        <div className="w-4/5 mb-4">
          <BlogList blogItems={blogs} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
