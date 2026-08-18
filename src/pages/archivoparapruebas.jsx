import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import libro from "./../assets/img/libro.svg";
import portal from "./../assets/img/portal.svg";
import mesaparte from "./../assets/img/mesa.svg";
import logo from "./../assets/img/LOGO-MAYNAS-02.png";
import "./items-style.css";

const Header = ({ onLogin }) => {
  // Estado para manejar la visibilidad del menú en móvil
  const [menuOpen, setMenuOpen] = useState(false);

  // Función para alternar el estado del menú
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Cambia el estado si el scroll supera 50px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Estado para controlar la visibilidad del modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función para abrir el modal
  const openModal = () => setIsModalOpen(true);

  // Función para cerrar el modal
  const closeModal = () => setIsModalOpen(false);

  // Estado para manejar la visibilidad del menú en Navbar
  const [isOpen, setIsOpen] = useState(false);

  // Función para alternar el estado del menú en Navbar
  const toggleNavbar = () => setIsOpen(!isOpen);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-fit z-50 transition-all duration-300 ${
        isScrolled ? "bg-white" : "bg-white shadow-md"
      }`}
    >


        {/* Menú desplegable en vista móvil */}
        <div
            className={`md:hidden ${
            menuOpen ? "block" : "hidden"
            } bg-white shadow-md`}
        >
            <div className="flex flex-col items-center py-4">
                <Link
                    to="/home"
                    className="text-[#23355B] text-[18px] font-bold px-4 py-2 hover:text-[#1A3E6C]"
                >
                    Inicio
                </Link>
                <Link
                    to="/ciudad"
                    className="text-[#23355B] text-[18px] font-bold px-4 py-2 hover:text-[#1A3E6C]"
                >
                    Ciudad
                </Link>
                <Link
                    to="/municipalidad"
                    className="text-[#23355B] text-[18px] font-bold px-4 py-2 hover:text-[#1A3E6C]"
                >
                    Municipalidad.
                </Link>
                <Link
                    to="/estructura"
                    className="text-[#23355B] text-[18px] font-bold px-4 py-2 hover:text-[#1A3E6C]"
                >
                    Estructura funcional
                </Link>
                <Link
                    to="/programas"
                    className="text-[#23355B] text-[18px] font-bold px-4 py-2 hover:text-[#1A3E6C]"
                >
                    Programas y servicios
                </Link>
                <Link
                    to="/documentos"
                    className="text-[#23355B] text-[18px] font-bold px-4 py-2 hover:text-[#1A3E6C]"
                >
                    Documentos
                </Link>
                <Link
                    to="/contactos"
                    className="text-[#23355B] text-[18px] font-bold px-4 py-2 hover:text-[#1A3E6C]"
                >
                    Contactos
                </Link>
            </div>
        </div>
    </div>
  );
};

export default Header;
