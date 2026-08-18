import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./items-style.css";
import MenuMovil from "./header/MenuMovil";
import Documents from "./header/Documents";
import Municipalidad from "./header/Municipalidad";
import EstructuraFuncional from "./header/EstructuraFuncional";
import Programas from "./header/Programas";
import Logos from "./header/Logos";

const Header = () => {
  // Estado para manejar la visibilidad del menú en móvil
  const [menuOpen, setMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);


    const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('id');
      window.location.href = '/home'; // Redirige al login después de eliminar el token
    };
  
    // Opciones de menú (puedes personalizarlas o cargarlas de una API)
  
    const handleToggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Cambia el estado si el scroll supera 50px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-fit z-50 transition-all duration-300 ${
        isScrolled ? "bg-white" : "bg-white shadow-md"
      }`}
    >
      <Logos />

      {/* Navbar centrado debajo de los logos (ocultar en dispositivos móviles) */}
      <nav className={`hidden md:flex justify-center bg-white shadow-md`}>
        <Link
          to="/home"
          className="text-[#23355B] text-[21px] font-bold px-4 focus:text-[#1A3E6C]"
        >
          Inicio
        </Link>

        <Link
          to="/ciudad"
          className="text-[#23355B] text-[21px] font-bold px-4 focus:text-[#1A3E6C]"
        >
          Ciudad
        </Link>

        <Municipalidad />

        <EstructuraFuncional />
        
        <Documents />

        <Programas />

        {/* <Link
          to="/blog"
          className="text-[#23355B] text-[21px] font-bold px-4 hover:text-[#1A3E6C]"
          target="_blank"
        >
          Blog
        </Link>
 */}


      </nav>

      <div>
      {/* Tu logo y otros elementos de la UI */}
      
      {/* Botón para abrir/cerrar el menú */}
      <div className="block md:hidden">
        <button onClick={toggleMenu} className="text-[#23355B]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Menú móvil */}
      <MenuMovil menuOpen={menuOpen} />
    </div>
    </div>
  );
};

export default Header;
