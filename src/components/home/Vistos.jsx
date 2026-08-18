import React from 'react';
import munipay from "../../assets/img/munipay.png";
import camion from "../../assets/img/camion.png";
import violencia from "../../assets/img/violencia.png";
import SectionHeader from './SectionHeader';

const cards = [
  {
    img: munipay,
    alt: "Munipay",
    title: "Munipay",
    description:
      "Es la plataforma de pagos en línea en donde los contribuyentes podrán pagar sus impuestos prediales desde la comodidad de sus hogares.",
  },
  {
    img: camion,
    alt: "Iquitos-Limpio",
    title: "Iquitos-Limpio",
    description:
      "Es un aplicativo en el cual el vecino de Iquitos podrá recibir alertas cuando el camión de basura pase cerca de su domicilio.",
  },
  {
    img: violencia,
    alt: "IQTSEG",
    title: "IQTSEG",
    description:
      "Es una aplicación en la que el ciudadano podrá subir sus incidencias en tiempo real y la municipalidad responderá de manera inmediata.",
  },
];

const Vistos = () => {
  return (
    <div className="pt-12 md:pt-16">
      <SectionHeader
        eyebrow="Servicios digitales"
        title="Maynas rumbo a la digitalización"
        linkTo="/innovation"
        linkLabel="Ver todos"
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
