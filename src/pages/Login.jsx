import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/api'; // Importa la función login desde tu archivo de API
import LogoMuni from './../assets/img/LOGO-MAYNAS-02.png'

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Llamar a la función de login con Axios
      const data = await login({ email, password });

      if (data.success) {
        // Si el login es exitoso, guardar el token y redirigir
        localStorage.setItem('refreshToken', data.refresh);
        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('id', data.user.id);
        //localStorage.setItem('user', JSON.stringify(data.user));

        navigate('/dashboard');
      } else {
        setError('Credenciales incorrectas o error en la autenticación.');
      }
    } catch (err) {
      console.error('Error en la solicitud de login:', err);
      setError('Hubo un problema con la solicitud. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center pb-4 px-4 bg-gradient-to-b from-cyan-600/80 to-blue-800/80">
      <form onSubmit={handleLogin} className="text-center w-full sm:w-2/3 lg:w-96 rounded-lg shadow-xl pb-10 bg-white">
        <h1 className="uppercase tracking-wide text-lg text-white font-semibold rounded-t-lg py-2 px-4 bg-[#1C3C6D]">Iniciar Sesión</h1>
        <img className="mt-2 w-80 mx-auto object-contain" src={LogoMuni} alt="MPM" />
        <h6 className="text-gray-500 text-lg sm:text-sm">Por favor, ingrese sus credenciales</h6>
        
        {/* Mensaje de error */}
        {error && (
          <div className="w-full text-left bg-red-100 border border-red-400 text-red-700 px-4 py-1 rounded my-2">
            <strong className="font-bold">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="w-4 inline">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
              </svg>
            </strong>
            <span className="inline uppercase">{error}</span>
          </div>
        )}

        {/* Input de Email */}
        <div className="flex flex-col items-start mt-2 px-4">
          <label htmlFor="email" className="text-left text-gray-500">Usuario</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        {/* Input de Password */}
        <div className="relative mt-6 px-4">
          <div className="flex items-center">
            <div className="w-full flex flex-col items-start">
              <label htmlFor="password" className="text-left text-gray-500">Contraseña</label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            {/* Botón para mostrar/ocultar contraseña */}
            <svg
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 bottom-2 cursor-pointer fill-gray-400 hover:fill-gray-800 transition ease-in w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
            </svg>
          </div>
        </div>


        {/* Botón de Iniciar Sesión */}
        <div className="px-2 sm:px-4">
          <button
            type="submit"
            className="mt-9 w-full bg-[#1C3C6D] hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg cursor-pointer transition ease-in focus:outline-none"
            disabled={isLoading}
          >
            {isLoading ? 'Cargando...' : 'INGRESAR'}
          </button>
        </div>

      </form>
    </div>
  );
};

export default LoginPage;
