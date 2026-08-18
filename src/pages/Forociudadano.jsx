import React from 'react';
import Header from '../components/Header';

const ForoPage = () => {
    const handleLogin = () => {
        localStorage.setItem('token', 'dummy-token');
        window.location.href = '/dashboard';
      };
  return (
    <>
        <Header onLogin={handleLogin} />
        <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-cyan-600/80 to-blue-800/80">
        <h1 className="text-white text-4xl font-semibold">Hola mundo aqui en foro ciudadano</h1>
        </div>
    </>
    

  );
};

export default ForoPage;
