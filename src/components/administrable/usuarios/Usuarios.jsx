import React, { useState, useEffect } from 'react';
import {
  fetchUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario
} from '../../../services/usuarioService';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    use_txt_name: '',
    use_txt_lastname: '',
    use_txt_username: '',
    use_hash_password: '',
    use_txt_email: '',
    use_int_phone: '',
    use_txt_address: '',
    use_txt_state: '',
  });
  const [editarUsuario, setEditarUsuario] = useState(null);

  const [paginaActual, setPaginaActual] = useState(1);
  const usuariosPorPagina = 10;

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    const data = await fetchUsuarios();
    setUsuarios(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoUsuario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editarUsuario) {
      await updateUsuario(editarUsuario.use_int_id, nuevoUsuario);
    } else {
      await createUsuario(nuevoUsuario);
    }
    resetFormulario();
    cargarUsuarios();
  };

  const handleEdit = (usuario) => {
    setEditarUsuario(usuario);
    setNuevoUsuario(usuario);
    setMostrarFormulario(true);
  };

  const handleDelete = async (id) => {
    await deleteUsuario(id);
    cargarUsuarios();
  };

  const resetFormulario = () => {
    setNuevoUsuario({
      use_txt_name: '',
      use_txt_lastname: '',
      use_txt_username: '',
      use_hash_password: '',
      use_txt_email: '',
      use_int_phone: '',
      use_txt_address: '',
      use_txt_state: '',
    });
    setEditarUsuario(null);
    setMostrarFormulario(false);
  };

  // Paginación
  const totalPaginas = Math.ceil(usuarios.length / usuariosPorPagina);
  const indiceInicio = (paginaActual - 1) * usuariosPorPagina;
  const usuariosPaginados = usuarios.slice(indiceInicio, indiceInicio + usuariosPorPagina);

  return (
    <div className="max-w-7xl mx-auto p-4 mt-6">
      <h1 className="text-2xl font-bold mb-4">Usuarios Registrados</h1>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4 hover:bg-blue-700"
        onClick={() => {
          resetFormulario();
          setMostrarFormulario(true);
        }}
      >
        + Agregar Usuario
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">Nombre</th>
              <th className="py-2 px-4 text-left">Apellido</th>
              <th className="py-2 px-4 text-left">Username</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Teléfono</th>
              <th className="py-2 px-4 text-left">Dirección</th>
              <th className="py-2 px-4 text-left">Estado</th>
              <th className="py-2 px-4 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuariosPaginados.map((usuario) => (
              <tr key={usuario.use_int_id} className="border-t">
                <td className="py-2 px-4">{usuario.use_txt_name}</td>
                <td className="py-2 px-4">{usuario.use_txt_lastname}</td>
                <td className="py-2 px-4">{usuario.use_txt_username}</td>
                <td className="py-2 px-4">{usuario.use_txt_email}</td>
                <td className="py-2 px-4">{usuario.use_int_phone}</td>
                <td className="py-2 px-4">{usuario.use_txt_address}</td>
                <td className="py-2 px-4">{usuario.use_txt_state}</td>
                <td className="py-2 px-4">
                  <div className="flex flex-col gap-2">
                    <button
                      className="bg-yellow-400 text-white px-3 py-2 rounded hover:bg-yellow-500 w-full"
                      onClick={() => handleEdit(usuario)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 w-full"
                      onClick={() => handleDelete(usuario.use_int_id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      {usuarios.length > usuariosPorPagina && (
        <div className="flex justify-center items-center mt-4 space-x-2">
          <button
            onClick={() => setPaginaActual((prev) => Math.max(prev - 1, 1))}
            className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400"
            disabled={paginaActual === 1}
          >
            Anterior
          </button>
          {Array.from({ length: totalPaginas }, (_, i) => (
            <button
              key={i}
              onClick={() => setPaginaActual(i + 1)}
              className={`px-3 py-1 rounded ${paginaActual === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPaginaActual((prev) => Math.min(prev + 1, totalPaginas))}
            className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400"
            disabled={paginaActual === totalPaginas}
          >
            Siguiente
          </button>
        </div>
      )}

      {/* Modal */}
      {mostrarFormulario && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-full max-w-3xl rounded shadow-lg p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={resetFormulario}
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold mb-4">
              {editarUsuario ? 'Editar Usuario' : 'Crear Usuario'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'use_txt_name', placeholder: 'Nombre' },
                  { name: 'use_txt_lastname', placeholder: 'Apellido' },
                  { name: 'use_txt_username', placeholder: 'Nombre de usuario' },
                  { name: 'use_hash_password', placeholder: 'Contraseña', type: 'password' },
                  { name: 'use_txt_email', placeholder: 'Correo electrónico', type: 'email' },
                  { name: 'use_int_phone', placeholder: 'Teléfono' },
                  { name: 'use_txt_address', placeholder: 'Dirección' },
                ].map(({ name, placeholder, type = 'text' }) => (
                  <input
                    key={name}
                    type={type}
                    name={name}
                    value={nuevoUsuario[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    required
                    className="border px-3 py-2 rounded w-full"
                  />
                ))}

                {/* Select personalizado para estado */}
                <select
                  name="use_txt_state"
                  value={nuevoUsuario.use_txt_state}
                  onChange={handleChange}
                  required
                  className="border px-3 py-2 rounded w-full"
                >
                  <option value="">Seleccionar estado</option>
                  <option value="ACTIVO">ACTIVO</option>
                  <option value="INACTIVO">INACTIVO</option>
                </select>
              </div>

              <div className="mt-6 flex justify-end space-x-2">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  {editarUsuario ? 'Actualizar' : 'Crear'} Usuario
                </button>
                <button
                  type="button"
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                  onClick={resetFormulario}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Usuarios;
