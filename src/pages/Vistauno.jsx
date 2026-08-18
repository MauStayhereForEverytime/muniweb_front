import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaWhatsapp } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';



const Vistauno = () => {

  const handleLogin = () => {
    localStorage.setItem('token', 'dummy-token');
    window.location.href = '/dashboard';
  };

  return (
    <>
        <Header onLogin={handleLogin}/>
        <section className='bg-white mt-20'>
          {/* HOLA MUNDO */}
          <h1>Hola mundo desde Enlace contenido 1</h1>

        </section>

        <Footer/>
    
    </>

  );
};

export default Vistauno;
