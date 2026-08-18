import React, { useState } from "react";
import { Link } from "react-router-dom";
import Organigrama from "../../pages/Organigrama/Organigrama";

const Municipalidad = () => {
  const [isMunicipalidadOpen, setIsMunicipalidadOpen] = useState(false);
  // Maneja la apertura y cierre de los menús
  const handleMunicipalidadMouseEnter = () => setIsMunicipalidadOpen(true);
  const handleMunicipalidadMouseLeave = () => setIsMunicipalidadOpen(false);

  return (
    <div>
      {/* Menú Municipalidad */}
      <nav className="hidden md:flex justify-center">
        <div className="relative group">
          <Link
            to=""
            className="text-[#23355B] text-[21px] font-bold px-4 group-hover:text-white group-hover:bg-[#23355B] transition-colors duration-300 block"
            onMouseEnter={handleMunicipalidadMouseEnter}
            onMouseLeave={handleMunicipalidadMouseLeave}
          >
            Municipalidad
          </Link>
          {/* Contenedor del menú */}
          <div
            className={`absolute left-0 hidden w-full bg-white shadow-md rounded-lg group-hover:block group-focus-within:block ${
              isMunicipalidadOpen ? "block" : "hidden"
            }`}
          >
            <ul className="text-[#23355B] text-sm font-semibold">
              <Link
                to="https://www.gob.pe/institucion/munimaynas/funcionarios"
                target="_blank"
              >
                <li className="px-4 py-2 hover:bg-[#344b7d] hover:text-white transition-colors duration-300">
                  FUNCIONARIOS
                </li>
              </Link>
              <Link
                to="https://www.gob.pe/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6MTY3MDkyLCJwdXIiOiJibG9iX2lkIn19--b0afc26b91b791810814a769277de7c2f4513436/ORGANIGRAMA%20ESTRUCTURAL%20DE%20LA%20MPM%202019%20-CONSOLIDADO.pdf"
                target="_blank"
              >
                <li className="px-4 py-2 hover:bg-[#344b7d] hover:text-white transition-colors duration-300">
                  ORGANIGRAMA
                </li>
              </Link>
              <Link
                to="https://cdn.www.gob.pe/uploads/document/file/1892018/ROF%202020.pdf.pdf?v=1620930425"
                target="_blank"
              >
                <li className="px-4 py-2 hover:bg-[#344b7d] hover:text-white transition-colors duration-300">
                  ESTRUCTURA FUNCIONAL
                </li>
              </Link>

              <Link to="/integridad">
                <li className="px-4 py-2 hover:bg-[#344b7d] hover:text-white transition-colors duration-300">
                  INTEGRIDAD
                </li>
              </Link>
              <Link to="/boletin">
                <li className="px-4 py-2 hover:bg-[#344b7d] hover:text-white transition-colors duration-300">
                  BOLETÍN ESTADÍSTICO
                </li>
              </Link>
              
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Municipalidad;
