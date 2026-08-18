import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Documentos = () => {
  const [isDocumentosOpen, setIsDocumentosOpen] = useState(false);

  const handleDocumentosMouseEnter = () => setIsDocumentosOpen(true);
  const handleDocumentosMouseLeave = () => setIsDocumentosOpen(false);

  return (
    <div className="relative group">
      <Link
        to="#"
        className="text-[#23355B] text-[21px] font-bold px-6 group-hover:text-white group-hover:bg-[#23355B] transition-colors duration-300 block"
        onMouseEnter={handleDocumentosMouseEnter}
        onMouseLeave={handleDocumentosMouseLeave}
      >
        Documentos
      </Link>
      {/* Contenedor del submenú */}
      <div
        className={`absolute left-0 hidden w-full bg-white shadow-md rounded-lg group-hover:block group-focus-within:block ${isDocumentosOpen ? 'block' : 'hidden'}`}
      >
        <ul className="text-[#23355B] text-sm">
          {/* Submenú */}
          <li className="menu-item font-semibold">
            Normas y Documentos
            <ul className="submenu max-h-60 overflow-y-auto">
              <li>
                <Link
                  to="https://www.gob.pe/institucion/munimaynas/normas-legales/tipos/108-acuerdo-de-concejo"
                  className="block px-4 hover:bg-[#344b7d] hover:text-white transition-colors duration-300"
                >
                  Acuerdo de Concejo
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.gob.pe/institucion/munimaynas/normas-legales/tipos/781-acuerdo-municipal"
                  className="block px-4 hover:bg-[#344b7d] hover:text-white transition-colors duration-300"
                >
                  Acuerdo Municipal
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.gob.pe/institucion/munimaynas/normas-legales/tipos/25-convenio"
                  className="block px-4 hover:bg-[#344b7d] hover:text-white transition-colors duration-300"
                >
                  Convenio
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.gob.pe/institucion/munimaynas/normas-legales/tipos/96-decreto-de-alcaldia"
                  className="block px-4 hover:bg-[#344b7d] hover:text-white transition-colors duration-300"
                >
                  Decreto de Alcaldía
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.gob.pe/institucion/munimaynas/normas-legales/tipos/28-directiva"
                  className="block px-4 hover:bg-[#344b7d] hover:text-white transition-colors duration-300"
                >
                  Directiva
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.gob.pe/institucion/munimaynas/normas-legales/tipos/7-ley"
                  className="block px-4 hover:bg-[#344b7d] hover:text-white transition-colors duration-300"
                >
                  Ley
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.gob.pe/institucion/munimaynas/normas-legales/tipos/13-ordenanza"
                  className="block px-4 hover:bg-[#344b7d] hover:text-white transition-colors duration-300"
                >
                  Ordenanza
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.gob.pe/institucion/munimaynas/normas-legales/tipos/111-ordenanza-municipal"
                  className="block px-4 hover:bg-[#344b7d] hover:text-white transition-colors duration-300"
                >
                  Ordenanza Municipal
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.gob.pe/institucion/munimaynas/normas-legales/tipos/56-proyecto-de-ley"
                  className="block px-4 hover:bg-[#344b7d] hover:text-white transition-colors duration-300"
                >
                  Proyecto de Ley
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.gob.pe/institucion/munimaynas/normas-legales/tipos/10-resolucion"
                  className="block px-4 hover:bg-[#344b7d] hover:text-white transition-colors duration-300"
                >
                  Resolución
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.gob.pe/institucion/munimaynas/normas-legales/tipos/89-resolucion-de-alcaldia"
                  className="block px-4 hover:bg-[#344b7d] hover:text-white transition-colors duration-300"
                >
                  Resolución de Alcaldía
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.gob.pe/institucion/munimaynas/normas-legales/tipos/110-resolucion-de-gerencia"
                  className="block px-4 hover:bg-[#344b7d] hover:text-white transition-colors duration-300"
                >
                  Resolución de Gerencia
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.gob.pe/institucion/munimaynas/normas-legales/tipos/211-resolucion-de-gerencia-de-administracion-y-finanzas"
                  className="block px-4 hover:bg-[#344b7d] hover:text-white transition-colors duration-300"
                >
                  Resolución de Gerencia de Administración y Finanzas
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.gob.pe/institucion/munimaynas/normas-legales/tipos/53-resolucion-de-gerencia-general"
                  className="block px-4 hover:bg-[#344b7d] hover:text-white transition-colors duration-300"
                >
                  Resolución de Gerencia General
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.gob.pe/institucion/munimaynas/normas-legales/tipos/159-resolucion-de-gerencia-municipal"
                  className="block px-4 hover:bg-[#344b7d] hover:text-white transition-colors duration-300"
                >
                  Resolución de Gerencia Municipal
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.gob.pe/institucion/munimaynas/normas-legales/tipos/145-resolucion-de-sala-plena"
                  className="block px-4 hover:bg-[#344b7d] hover:text-white transition-colors duration-300"
                >
                  Resolución de Sala Plena
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.gob.pe/institucion/munimaynas/normas-legales/tipos/22-resolucion-de-secretaria-general"
                  className="block px-4 hover:bg-[#344b7d] hover:text-white transition-colors duration-300"
                >
                  Resolución de Secretaría General
                </Link>
              </li>
            </ul>
          </li>

          <li className="menu-item font-semibold">
            Informes y Publicaciones
            <ul className="submenu max-h-60 overflow-y-auto">
              <li>
                <Link
                  to="https://www.gob.pe/institucion/munimaynas/informes-publicaciones/tipos/30-acta"
                  className="block px-4 hover:bg-[#344b7d] hover:text-white transition-colors duration-300"
                >
                  Acta
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.gob.pe/institucion/munimaynas/informes-publicaciones/tipos/1244-acta-de-sesion-extraordinaria-de-concejo"
                  className="block px-4 hover:bg-[#344b7d] hover:text-white transition-colors duration-300"
                >
                  Acta de Sesión Extraordinaria de Concejo
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.gob.pe/institucion/munimaynas/informes-publicaciones/tipos/451-acta-de-sesion-ordinaria-de-concejo"
                  className="block px-4 hover:bg-[#344b7d] hover:text-white transition-colors duration-300"
                >
                  Acta de Sesión Ordinaria de Concejo
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.gob.pe/institucion/munimaynas/informes-publicaciones/tipos/17-archivo"
                  className="block px-4 hover:bg-[#344b7d] hover:text-white transition-colors duration-300"
                >
                  Archivo
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.gob.pe/institucion/munimaynas/informes-publicaciones/tipos/6-articulo"
                  className="block px-4 hover:bg-[#344b7d] hover:text-white transition-colors duration-300"
                >
                  Artículo
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.gob.pe/institucion/munimaynas/informes-publicaciones/tipos/319-aviso-de-sinceramiento"
                  className="block px-4 hover:bg-[#344b7d] hover:text-white transition-colors duration-300"
                >
                  Aviso de sinceramiento
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.gob.pe/institucion/munimaynas/informes-publicaciones/tipos/107-concurso-publico"
                  className="block px-4 hover:bg-[#344b7d] hover:text-white transition-colors duration-300"
                >
                  Concurso público
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.gob.pe/institucion/munimaynas/informes-publicaciones/tipos/104-convenio"
                  className="block px-4 hover:bg-[#344b7d] hover:text-white transition-colors duration-300"
                >
                  Convenio
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.gob.pe/institucion/munimaynas/informes-publicaciones/tipos/80-convocatoria-de-trabajo"
                  className="block px-4 hover:bg-[#344b7d] hover:text-white transition-colors duration-300"
                >
                  Convocatoria de trabajo
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.gob.pe/institucion/munimaynas/informes-publicaciones/tipos/27-documento-de-gestion"
                  className="block px-4 hover:bg-[#344b7d] hover:text-white transition-colors duration-300"
                >
                  Documento de Gestión
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.gob.pe/institucion/munimaynas/informes-publicaciones/tipos/58-formato"
                  className="block px-4 hover:bg-[#344b7d] hover:text-white transition-colors duration-300"
                >
                  Formato
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.gob.pe/institucion/munimaynas/informes-publicaciones/tipos/60-informe"
                  className="block px-4 hover:bg-[#344b7d] hover:text-white transition-colors duration-300"
                >
                  Informe
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.gob.pe/institucion/munimaynas/informes-publicaciones/tipos/214-informe-legal"
                  className="block px-4 hover:bg-[#344b7d] hover:text-white transition-colors duration-300"
                >
                  Informe legal
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.gob.pe/institucion/munimaynas/informes-publicaciones/tipos/170-plan"
                  className="block px-4 hover:bg-[#344b7d] hover:text-white transition-colors duration-300"
                >
                  Plan
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.gob.pe/institucion/munimaynas/informes-publicaciones/tipos/168-reglamento"
                  className="block px-4 hover:bg-[#344b7d] hover:text-white transition-colors duration-300"
                >
                  Reglamento
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.gob.pe/institucion/munimaynas/informes-publicaciones/tipos/14-reporte"
                  className="block px-4 hover:bg-[#344b7d] hover:text-white transition-colors duration-300"
                >
                  Reporte
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.gob.pe/institucion/munimaynas/informes-publicaciones/tipos/16-tupa"
                  className="block px-4 hover:bg-[#344b7d] hover:text-white transition-colors duration-300"
                >
                  TUPA
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Documentos;
