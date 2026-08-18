import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const EstructuraFuncional = () => {
  const [isEstructuraOpen, setIsEstructuraOpen] = useState(false);

  const handleEstructuraMouseEnter = () => setIsEstructuraOpen(true);
  const handleEstructuraMouseLeave = () => setIsEstructuraOpen(false);

  return (
    <div>
      {/* Menú Estructura Funcional */}
      <nav className="hidden md:flex justify-center">
        <div className="relative group">
          <Link
            to="#"
            className="text-[#23355B] text-[21px] font-bold px-6 group-hover:text-white group-hover:bg-[#23355B] transition-colors duration-300 block"
            onMouseEnter={handleEstructuraMouseEnter}
            onMouseLeave={handleEstructuraMouseLeave}
          >
            Convocatorias y Noticias
          </Link>
          {/* Contenedor del menú */}
          <div
            className={`absolute left-0 hidden w-full h-50 bg-white shadow-md rounded-lg group-hover:block group-focus-within:block ${
              isEstructuraOpen ? 'block' : 'hidden'
            }`}
          >
            <ul className="text-[#23355B] text-sm">
              <li className="px-4 py-1 hover:bg-[#344b7d] hover:text-white transition-colors duration-300">
                <Link to="https://www.gob.pe/institucion/munimaynas/colecciones/50968-convocatorias-de-trabajo-muni-maynas" className="block w-full font-semibold">
                  CONVOCATORIAS LABORALES
                </Link>

              </li>
              <li className="px-4 py-1 hover:bg-[#344b7d] hover:text-white transition-colors duration-300">
                <Link to="https://www.gob.pe/institucion/munimaynas/colecciones/94670-comprago" className="block w-full font-semibold">
                  CONVOCATORIAS COMPRAGRO
                </Link>

              </li>
              <li className="px-4 py-1 hover:bg-[#344b7d] hover:text-white transition-colors duration-300">
                <Link to="https://www.gob.pe/institucion/munimaynas/noticias" className="block w-full font-semibold">
                  NOTICIA
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default EstructuraFuncional;
