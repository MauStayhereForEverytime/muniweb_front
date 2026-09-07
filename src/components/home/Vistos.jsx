import React from 'react';
import mesaAyuda from "../../assets/img/mesa-ayuda-baml.svg";
import siscolas from "../../assets/img/siscolas.svg";
import sgtdLogo from "../../assets/img/sgtd_logo_blanco.png";
import SectionHeader from './SectionHeader';

const cards = [
  {
    img: mesaAyuda,
    alt: "Mesa de ayuda BAML",
    title: "Mesa de ayuda BAML",
    description:
      "Es el sistema de mesa de ayuda personalizado a medida a nivel interno de la municipalidad.",
  },
  {
    img: siscolas,
    alt: "SISCOLAS",
    title: "SISCOLAS",
    description:
      "Es el nuevo sistema de colas en la recepción de la Municipalidad Provincial de Maynas.",
  },
  {
    img: sgtdLogo,
    alt: "SGTD",
    title: "SGTD",
    description:
      "El nuevo sistema de gestión documentaria que mejora la eficiencia en el seguimiento de documentos que permite hacer consultar a la ciudadanía.",
  },
];

const Vistos = () => {
  return (
    <div className="pt-12 md:pt-16">
      <SectionHeader
        eyebrow="Servicios digitales"
        title="Maynas rumbo a la digitalización"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((card, index) => (
          <div
            key={index}
            className="group bg-white rounded-2xl ring-1 ring-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300 p-6 text-center border-t-2 border-maynas-red"
          >
            <img
              src={card.img}
              alt={card.alt}
              className="w-32 h-32 mx-auto object-contain mb-4"
            />
            <h3 className="font-display text-xl font-bold text-maynas-navy group-hover:text-maynas-red transition-colors duration-200 mb-2">
              {card.title}
            </h3>
            <p className="text-gray-600 text-base">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vistos;
