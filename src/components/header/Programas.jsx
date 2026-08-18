import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Programas = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Función para manejar el mouse enter y mouse leave
  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);

  return (
    <nav className={`hidden md:flex justify-center`}>
      <div className="relative group">
        <Link
          to=""
          className="text-[#23355B] text-[21px] font-bold px-6 group-hover:text-white group-hover:bg-[#23355B] transition-colors duration-300 block"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Programas y Servicios
        </Link>
        <div
          className={`absolute left-0 hidden w-full h-50 bg-white shadow-md rounded-lg group-hover:block group-focus-within:block ${
            isOpen ? 'block' : 'hidden'
          }`}
        >
          <ul className="text-[#23355B] text-sm">
{/*             <li className="px-4 py-1 hover:bg-[#344b7d] hover:text-white transition-colors duration-300">
              <Link to="/item1" className="block w-full font-semibold">
                DEMUNA
              </Link>
            </li>
            <li className="px-4 py-1 hover:bg-[#344b7d] hover:text-white transition-colors duration-300">
              <Link to="/item2" className="block w-full font-semibold">
                OMAPEC
              </Link>
            </li>
            <li className="px-4 py-1 hover:bg-[#344b7d] hover:text-white transition-colors duration-300">
              <Link to="/item3" className="block w-full font-semibold">
                SISFOH
              </Link>
            </li>
            <li className="px-4 py-1 hover:bg-[#344b7d] hover:text-white transition-colors duration-300">
              <Link to="/item4" className="block w-full font-semibold">
                LIMPIEZA PÚBLICA
              </Link>
            </li>
            <li className="px-4 py-1 hover:bg-[#344b7d] hover:text-white transition-colors duration-300">
              <Link to="/item4" className="block w-full font-semibold">
                PARQUES Y JARDINES
              </Link>
            </li>
            <li className="px-4 py-1 hover:bg-[#344b7d] hover:text-white transition-colors duration-300">
              <Link to="/item4" className="block w-full font-semibold">
                DEFENSA CIVIL
              </Link>
            </li>
            <li className="px-4 py-1 hover:bg-[#344b7d] hover:text-white transition-colors duration-300">
              <Link to="/item4" className="block w-full font-semibold">
                CULTURA Y DEPORTE
              </Link>
            </li> */}
            <li className="px-4 py-1 hover:bg-[#344b7d] hover:text-white transition-colors duration-300">
              <Link to="https://www.gob.pe/81110-municipalidad-provincial-de-maynas-comite-provincial-de-seguridad-ciudadana-coprosec" className="block w-full font-semibold">
                COPROSEC
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Programas;
