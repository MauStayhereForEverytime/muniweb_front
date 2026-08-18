import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import banner from "../assets/img/banner.jpeg";
import maynas from "../assets/img/LOGO-MAYNAS-02.png";
import "leaflet/dist/leaflet.css";
import iquitos from "../assets/jsonmap/iquitos.json";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";

function Ciudad() {
  const [lineCoordinates, setLineCoordinates] = useState([]);

  const center = {
    lat: -3.7461126326410694,
    lng: -73.25342656851653,
  };

  useEffect(() => {
    // Extraer las coordenadas del LineString del JSON
    const coordinates = iquitos.features[0].geometry.coordinates.map(
      ([lng, lat]) => [lat, lng]
    );
    setLineCoordinates(coordinates);
  }, []);

  return (
    <div className="">
      <Header />
      {/* Banner principal */}
      <div className="relative mt-40">
        <img
          className="w-auto h-auto max-w-full max-h-full object-cover"
          src={banner}
          alt="Banner principal de Maynas"
          
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg">
            Bienvenidos a Maynas
          </h1>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="px-6 md:px-[10%] py-10 space-y-12">
        {/* Sección del artículo */}
        <section className="bg-white shadow-lg rounded-lg p-6 md:p-10">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 border-b-2 border-red-600 pb-2">
            Reseña Histórica de la Provincia de Maynas
          </h1>
          <div className="py-3 text-gray-600 flex flex-wrap items-center gap-2 text-sm">
            <span className="text-red-700 font-semibold">Por:</span>
            <span className="font-medium">Nombre del Autor</span>
            <span className="hidden md:inline-block font-semibold text-gray-500">|</span>
            <span className="font-medium text-gray-500">2024-11-30</span>
          </div>
          <p className="text-base md:text-lg leading-relaxed text-justify text-gray-700 mt-4">
            La provincia de Maynas, ubicada en el departamento de Loreto, Perú,
            es una región emblemática de la Amazonía peruana. Su historia está
            profundamente ligada a la colonización y exploración de la selva
            amazónica. Durante la época colonial, Maynas fue parte de una vasta
            región habitada por diversas comunidades indígenas que vivían en
            armonía con la naturaleza. En 1802, la Real Cédula de Carlos IV
            incorporó la región al Virreinato del Perú, estableciendo la
            Gobernación de Maynas, con el objetivo de controlar y evangelizar
            las poblaciones indígenas. Durante el siglo XIX, la provincia ganó
            relevancia durante el auge del caucho, atrayendo migrantes y
            comerciantes que buscaron explotar los recursos naturales de la
            zona, aunque esto también trajo explotación y desplazamiento de las
            comunidades originarias. Hoy en día, Maynas, con su capital en
            Iquitos, es una región clave para la preservación de la
            biodiversidad amazónica y el desarrollo sostenible, además de ser
            un importante centro turístico gracias a su rica cultura, paisajes
            naturales y tradiciones.
          </p>
        </section>

        {/* Mapa y logo */}
        <section className="flex flex-col md:flex-row gap-10 items-center bg-white shadow-lg rounded-lg p-6">
          {/* Mapa interactivo */}
          <div className="w-full md:w-3/3">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Mapa de Iquitos</h2>
            <MapContainer
              center={center}
              zoom={13}
              style={{
                height: "400px",
                width: "100%",
                borderRadius: "8px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
              }}
              className="z-0"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> Muni-Maynas'
              />
              {lineCoordinates.length > 0 && (
                <Polyline positions={lineCoordinates} color="red" />
              )}
            </MapContainer>
          </div>

          {/* Logo de Maynas */}
          {/* <div className="w-full md:w-1/3 flex flex-col items-center text-center">
            <img
              src={maynas}
              alt="Logo de Maynas"
              className="h-auto max-w-full rounded-lg shadow-md"
            />
            <p className="text-sm text-gray-600 mt-4">
              Logo oficial de la Provincia de Maynas.
            </p>
          </div> */}
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Ciudad;
