import React, { useState } from "react";
import { FaFacebook, FaYoutube, FaGooglePlay } from 'react-icons/fa';

const Footer = () => {
  const [isAboutUsOpen, setIsAboutUsOpen] = useState(false);
  const [isConvocatoriasOpen, setIsConvocatoriasOpen] = useState(false);
  const [isContactosOpen, setIsContactosOpen] = useState(false);

  return (
    <footer className="relative w-full bg-[#23355B]">
      {/* Contenedor principal */}
      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Estructura de dos columnas, ajustando en pantallas pequeñas */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 text-white text-base font-normal">

          {/* Columna principal (80%) */}
          <div className="col-span-3 md:col-span-4">
            {/* Encabezado de "Sobre Nosotros" */}
            <div className="text-lg font-semibold mb-4 flex justify-between items-center">
              <span>Sobre Nosotros:</span>
              <button
                onClick={() => setIsAboutUsOpen(!isAboutUsOpen)}
                className="md:hidden text-white"
              >
                {isAboutUsOpen ? "Ocultar" : "Ver"}
              </button>
            </div>
            <hr className="border-red-700 border-2 mb-4" />

            {/* Tabla de Categorías */}
            <div className={`${isAboutUsOpen ? '' : 'hidden'} md:block`}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Primer bloque de categorías */}
                <div>
                  <ul>
                    <li><a href="/ciudad" className="hover:text-[#AB0A0A]">CIUDAD</a></li>
                    <li><a href="https://www.gob.pe/institucion/munimaynas/funcionarios" className="hover:text-[#AB0A0A]">FUNCIONARIOS</a></li>
                    <li><a href="/testimonios" className="hover:text-[#AB0A0A]">TESTIMONIOS</a></li>
                  </ul>
                </div>

                {/* Segundo bloque de categorías */}
                <div>
                  <ul>
                    <li><a href="https://www.gob.pe/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6MTY3MDkyLCJwdXIiOiJibG9iX2lkIn19--b0afc26b91b791810814a769277de7c2f4513436/ORGANIGRAMA%20ESTRUCTURAL%20DE%20LA%20MPM%202019%20-CONSOLIDADO.pdf" className="hover:text-[#AB0A0A]">ORGANIGRAMA</a></li>
                    <li><a href="/noticias" className="hover:text-[#AB0A0A]">NOTICIAS</a></li>
                    <li><a href="https://www.gob.pe/81110-municipalidad-provincial-de-maynas-comite-provincial-de-seguridad-ciudadana-coprosec" className="hover:text-[#AB0A0A]">COPROSEC</a></li>
                  </ul>
                </div>

                {/* Tercer bloque de categorías */}
                <div>
                  <ul>
                    <li><a href="https://cdn.www.gob.pe/uploads/document/file/1892018/ROF%202020.pdf.pdf?v=1620930425" className="hover:text-[#AB0A0A]">ESTRUCTURA FUNCIONAL</a></li>
                    {/* <li><a href="/blog" className="hover:text-[#AB0A0A]">BLOG</a></li> */}
                    <li><a href="/compromiso" className="hover:text-[#AB0A0A]">COMPROMISOS</a></li>
                  </ul>
                </div>
              </div>
            </div>

              <br />

            <div className="text-lg font-semibold mb-4 flex justify-between items-center">
              <span>Enlaces externos:</span>
              <button
                onClick={() => setIsAboutUsOpen(!isAboutUsOpen)}
                className="md:hidden text-white"
              >
                {isAboutUsOpen ? "Ocultar" : "Ver"}
              </button>
            </div>
            <hr className="border-red-700 border-2 mb-4" />

            <div className={`${isAboutUsOpen ? '' : 'hidden'} md:block`}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Primer bloque de categorías */}
                <div>
                  <ul>
                    <li><a href="http://www.sencico.gob.pe/" className="hover:text-[#AB0A0A]">SENCICO</a></li>
                  </ul>
                </div>

              </div>
              </div>
          </div>














          {/* Columna secundaria (20%) */}
          <div className="col-span-2 md:col-span-1">
            {/* Encabezado de "Convocatorias" */}
            <div className="text-lg font-semibold mb-4 flex justify-between items-center">
              <span>Convocatorias:</span>
              <button
                onClick={() => setIsConvocatoriasOpen(!isConvocatoriasOpen)}
                className="md:hidden text-white"
              >
                {isConvocatoriasOpen ? "Ocultar" : "Ver"}
              </button>
            </div>
            <hr className="border-red-700 border-2 mb-4" />

            {/* Cuerpo de "Convocatorias" */}
            <div className={`${isConvocatoriasOpen ? '' : 'hidden'} md:block`}>
              <div className="text-base font-normal text-left">
                <ul>
                  <li><a href="https://www.gob.pe/institucion/munimaynas/colecciones/50968-convocatorias-de-trabajo-muni-maynas" className="hover:text-[#AB0A0A]">Contrataciones CAS</a></li>
                </ul>
              </div>
            </div>

            {/* Encabezado de "Contactos" */}
            <div className="text-lg font-semibold mt-6 mb-4 flex justify-between items-center">
              <span>Contactos:</span>
              <button
                onClick={() => setIsContactosOpen(!isContactosOpen)}
                className="md:hidden text-white"
              >
                {isContactosOpen ? "Ocultar" : "Ver"}
              </button>
            </div>
            <hr className="border-red-700 border-2 mb-4" />

            {/* Cuerpo de "Contactos" */}
            <div className={`${isContactosOpen ? '' : 'hidden'} md:block`}>
              <div className="text-base font-normal text-left">
                <ul>
                  <li><a href="https://reclamos.servicios.gob.pe/?institution_id=313" className="hover:text-[#AB0A0A]">Libro de reclamaciones</a></li>
                  <li><a href="https://facilita.gob.pe/t/466" className="hover:text-[#AB0A0A]">Mesa de partes</a></li>
                  <li><a href="https://www.transparencia.gob.pe/enlaces/pte_transparencia_enlaces.aspx?id_entidad=1605#.Y9fNiHbMIdU" className="hover:text-[#AB0A0A]">Portal de Transparencia</a></li>
                  <li><a href="https://www.gob.pe/institucion/munimaynas/contacto-y-numeros-de-emergencias" className="hover:text-[#AB0A0A]">Contactanos</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Línea roja debajo de "Todas las categorias" */}
        <div className="border-t-6 border-[#AB0A0A] mt-6"></div>

        {/* Iconos de Redes Sociales */}
        <div className="flex justify-center gap-6 mt-4">
          <a href="https://web.facebook.com/munimaynasperu" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-white text-2xl hover:text-[#AB0A0A]" />
          </a>
          <a href="https://www.youtube.com/@municipalidadprovincialdem9756" target="_blank" rel="noopener noreferrer">
            <FaYoutube className="text-white text-2xl hover:text-[#AB0A0A]" />
          </a>
          <a href="https://play.google.com/store/apps/dev?id=6024497551091084073" target="_blank" rel="noopener noreferrer">
            <FaGooglePlay className="text-white text-2xl hover:text-[#AB0A0A]" />
          </a>
        </div>
      </div>

      {/* Pie de página */}
      <div className="w-full bg-[#1E1E1E] text-white text-xs font-normal text-center py-2 mt-6">
        <p>© 2025 Municipalidad Provincial de Maynas - Derechos Reservados. Desarrollado por: OSTI-MPM</p>
      </div>
    </footer>
  );
};

export default Footer;
