import React from 'react';
import { Link } from 'react-router-dom';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';

const BlogList = ({ blogItems, onEdit, onDelete }) => {
  return (
    <div className="w-full h-full p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogItems && blogItems.length > 0 ? (
          blogItems.map((item, index) => (
            <div
              key={index}
              className="flex justify-center w-full" // Este centra el bloque blanco
            >
              {/* Contenedor blanco con 90% de ancho */}
              <div className="bg-white rounded-xl overflow-hidden flex flex-col w-[90%]">
                
                {/* Título centrado */}
                <div className="flex justify-center p-2">
                  <div className="text-sm font-bold text-blue-700 uppercase text-center">
                    {item.fields?.new_txt_tittle || 'Título no disponible'}
                  </div>
                </div>

                {/* Imagen ocupa todo el ancho del contenedor blanco */}
                {item.fields?.new_txt_urlimage && (
                  <img
                    src={`data:image/jpeg;base64,${item.fields.new_txt_urlimage}`}
                    alt={item.fields.new_txt_tittle}
                    className="w-full h-64 object-cover"
                  />
                )}

                {/* Descripción y botones */}
                <div className="p-4 flex flex-col flex-grow items-center text-center">
                  <div className="text-gray-700 text-sm w-full max-w-[90%]">
                    {item.fields?.new_txt_description?.slice(0, 150) || 'Sin descripción'}...
                    <Link to={`/blog/${item.pk}`} className="text-blue-500 ml-1 hover:underline">
                      Leer más
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 col-span-full">No hay blogs disponibles.</div>
        )}
      </div>
    </div>
  );
};

export default BlogList;
