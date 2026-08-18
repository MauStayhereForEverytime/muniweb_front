import React from 'react';
import { Link } from 'react-router-dom';

const MenuMovil = ({ menuOpen }) => {
  return (
    <div className={`md:hidden ${menuOpen ? "block" : "hidden"} bg-white shadow-md`}>
      <div className="flex flex-col items-center">
        <Link
          to="/home"
          className="text-[#23355B] text-[18px] font-bold px-4 py-1 hover:text-[#1A3E6C]"
        >
          Inicio
        </Link>
        <Link
          to="/ciudad"
          className="text-[#23355B] text-[18px] font-bold px-4 py-1 hover:text-[#1A3E6C]"
        >
          Ciudad
        </Link>
        <Link
          to="/municipalidad"
          className="text-[#23355B] text-[18px] font-bold px-4 py-1 hover:text-[#1A3E6C]"
        >
          Municipalidad
        </Link>
        <Link
          to="/estructura"
          className="text-[#23355B] text-[18px] font-bold px-4 py-1 hover:text-[#1A3E6C]"
        >
          Estructura funcional
        </Link>
        <Link
          to="/programas"
          className="text-[#23355B] text-[18px] font-bold px-4 py-1 hover:text-[#1A3E6C]"
        >
          Programas y servicios
        </Link>
        <Link
          to="/documentos"
          className="text-[#23355B] text-[18px] font-bold px-4 py-1 hover:text-[#1A3E6C]"
        >
          Documentos
        </Link>
        <Link
          to="/contactos"
          className="text-[#23355B] text-[18px] font-bold px-4 py-1 hover:text-[#1A3E6C]"
        >
          Contactos
        </Link>
      </div>
    </div>
  );
};

export default MenuMovil;
