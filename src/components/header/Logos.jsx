import React from 'react';
import { Link } from 'react-router-dom';

import logoMaynasSinLema from './../../assets/img/logo-maynas-sin-lema.png';
import libro from './../../assets/img/libro.svg';
import portal from './../../assets/img/portal.svg';
import mesaparte from './../../assets/img/mesa.svg';
import visitas from './../../assets/img/lineavisita.png';

const Logos = () => {
  return (
    <div className="flex items-center justify-evenly px-6 max-w-screen-xl mx-auto w-full">
      {/* Logo principal a la izquierda (solo visible en móvil) */}
      <img
        className="w-[150px] md:w-[250px] h-auto pl-5"
        src={logoMaynasSinLema}
        alt="Logo principal"
      />

      {/* Logos adicionales a la derecha (solo visibles en escritorio) */}
      <div className="hidden md:flex space-x-1 scale-90 justify-center">
        <Link
          to="https://reclamos.servicios.gob.pe/?institution_id=313"
          className="h-auto flex justify-center pt-1"
          target="_blank"
        >
          <img
            className="w-[150px] md:w-[200px] h-auto"
            src={libro}
            alt="Logo 2"
          />
        </Link>
        <Link
          to="https://www.transparencia.gob.pe/enlaces/pte_transparencia_enlaces.aspx?id_entidad=1605#.Y9fNiHbMIdU"
          className="h-auto flex justify-center"
          target="_blank"
        >
          <img
            className="w-[150px] md:w-[250px] h-auto"
            src={portal}
            alt="Logo 3"
          />
        </Link>
        <Link
          to="https://facilita.gob.pe/t/466"
          className="h-auto flex justify-center"
          target="_blank"
        >
          <img
            className="w-[150px] md:w-[250px] h-auto"
            src={mesaparte}
            alt="Logo 4"
          />
        </Link>
        
      <Link
          to="https://visitas.servicios.gob.pe/consultas/"
          className="h-auto flex justify-center"
          target="_blank"
        >
          <img
            className="w-[150px] md:w-[250px] h-auto"
            src={visitas}
            alt="Logo 4"
          />
        </Link>

      </div>
    </div>
  );
};

export default Logos;
