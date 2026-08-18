import React, { useState } from "react";
import "../css/boletin.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "../css/bulma-scoped.css";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import maynas2 from "../../assets/img/1.png";
import grafico from "../../assets/img/2.png";
import image from "../../assets/img/3.png";

export default function BoletinEstadistico() {
  const [filtroDetalle, setFiltroDetalle] = useState("");
  const [filtroAño, setFiltroAño] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("");

  const data = [
    {
      fecha: "24/09/2025",
      detalle: "BOLETÍN ESTADÍSTICO PRIMER SEMESTRE 2025",
      categoria: "PRIMER SEMESTRE",
      pdf: "https://cdn.www.gob.pe/uploads/document/file/8784031/7260784-boletin-estadistco-1er-sem-2025.pdf?v=1759765101",
    },
    {
      fecha: "16/09/2024",
      detalle: "BOLETÍN ESTADÍSTICO PRIMER SEMESTRE 2023",
      categoria: "PRIMER SEMESTRE",
      pdf: "https://cdn.www.gob.pe/uploads/document/file/6998099/5995669-boletin-estadistico-primer-semestre-2023.pdf?v=1727357256",
    },
    {
      fecha: "16/09/2024",
      detalle: "BOLETÍN ESTADÍSTICO SEGUNDO SEMESTRE 2023",
      categoria: "SEGUNDO SEMESTRE",
      pdf: "https://cdn.www.gob.pe/uploads/document/file/6950340/5995669-boletin-estadistico-segundo-semestre-2023.pdf?v=1726590381",
    },
  ];

  const años = ["2003", "2023", "2024", "2025"];
  const categorias = ["PRIMER SEMESTRE", "SEGUNDO SEMESTRE"];
  const sliderImages = [maynas2,grafico, image];

  const filteredData = data.filter((row) => {
    const anio = row.fecha.split("/")[2];
    return (
      row.detalle.toLowerCase().includes(filtroDetalle.toLowerCase()) &&
      (filtroCategoria === "" || row.categoria === filtroCategoria) &&
      (filtroAño === "" || anio === filtroAño)
    );
  });

  // 🔹 Flechas personalizadas
  const PrevArrow = ({ onClick }) => (
    <div
      onClick={onClick}
      className="slider-arrow prev-arrow"
      style={{
        left: "2%",
      }}
    >
      <FaChevronLeft />
    </div>
  );

  const NextArrow = ({ onClick }) => (
    <div
      onClick={onClick}
      className="slider-arrow next-arrow"
      style={{
        right: "2%",
      }}
    >
      <FaChevronRight />
    </div>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <div className="section has-text-centered" style={{ margin: 0, padding: 0 }}>
      <Header />

      {/* Slider */}
      <div id="integridad-scope" style={{ position: "relative" }}>
        <div
          style={{
            width: "100%",
            height: "86vh",
            overflow: "hidden",
            backgroundColor: "#ffffffff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Slider {...settings} style={{ width: "90%", height: "85%" }}>
            {sliderImages.map((img, i) => (
              <div key={i}>
                <div
                  style={{
                    width: "100%",
                    height: "60vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={img}
                    alt={`slide-${i}`}
                    style={{
                      width: "90%",
                      height: "70vh",
                      objectFit: "cover",
                      borderRadius: "20px",
                      border: "5px solid white",
                      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.5)",
                      margin: "auto",
                    }}
                  />
                </div>
              </div>
            ))}
          </Slider>

 
        </div>

        {/* Contenido principal */}
        <main id="integridad" className="section" style={{ marginTop: 0, paddingTop: "2rem" }}>
          <div className="section has-text-black has-background-gray-lighter">
            <div className="container">
              <h1
                className="title has-text-black has-text-centered"
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "800",
                  letterSpacing: "1px",
                  color: "#10263bff",
                  marginBottom: "1rem",
                }}
              >
                BOLETÍN ESTADÍSTICO
              </h1>

              <ol style={{ textAlign: "justify", marginLeft: "1.2rem" }}>
                <li>
                  La Municipalidad Provincial de Maynas, a través de la Subgerencia de Racionalización y Estadística adscrita a la Gerencia de Planeamiento y Organización, presenta su Boletín Estadístico Institucional, el cual reúne información relevante sobre las actividades administrativas y de servicios desarrolladas por las diferentes gerencias y unidades orgánicas de la institución.

                </li>
                <br />
                <li>
                  Este documento contiene cuadros y gráficos estadísticos elaborados a partir de los datos recopilados por los órganos y unidades orgánicas, reflejando los avances, logros y cumplimiento de metas institucionales en beneficio de la ciudadanía.

                </li>
                <br />
                <li>
                  El boletín se estructura en diversos apartados que incluyen la presentación institucional, el marco legal, la visión, misión, políticas y lineamientos, así como información sobre las comisiones de regidores, el organigrama estructural y las principales actividades municipales ejecutadas durante el periodo correspondiente.

                </li>
              </ol>
            </div>
          </div>

          {/* Tabla de Boletines */}
          <div className="section">
            <div className="container">
              <h1
                className="title has-text-black has-text-centered"
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "800",
                  letterSpacing: "1px",
                  color: "#10263bff",
                  marginBottom: "1rem",
                }}
              >
                BOLETINES
              </h1>

              {/* Filtros */}
              <div className="columns is-multiline mb-4 filtros">
                <div className="column is-one-third">
                  <input
                    type="text"
                    className="input"
                    placeholder="Detalle"
                    value={filtroDetalle}
                    onChange={(e) => setFiltroDetalle(e.target.value)}
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      border: "1px solid #ccc",
                      fontWeight: "bold",
                    }}
                  />
                </div>

                <div className="column is-one-third">
                  <div className="select is-fullwidth">
                    <select
                      value={filtroCategoria}
                      onChange={(e) => setFiltroCategoria(e.target.value)}
                      style={{
                        backgroundColor: "white",
                        color: "black",
                        border: "1px solid #ccc",
                        fontWeight: "bold",
                      }}
                    >
                      <option value="">Semestre: Seleccionar</option>
                      {categorias.map((cat, i) => (
                        <option key={i} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="column is-one-third">
                  <div className="select is-fullwidth">
                    <select
                      value={filtroAño}
                      onChange={(e) => setFiltroAño(e.target.value)}
                      style={{
                        backgroundColor: "white",
                        color: "black",
                        border: "1px solid #ccc",
                        fontWeight: "bold",
                      }}
                    >
                      <option value="">Año: Seleccionar</option>
                      {años.map((año, i) => (
                        <option key={i} value={año}>
                          {año}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Tabla */}
              <div className="table-container">
                <table className="table is-fullwidth is-hoverable custom-table">
                  <thead>
                    <tr>
                      <th className="has-text-black">Fecha</th>
                      <th className="has-text-black">Descripción</th>
                      <th className="has-text-black">Semestre</th>
                      <th className="has-text-black">PDF</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((row, i) => (
                      <tr key={i}>
                        <td className="fecha-azul">{row.fecha}</td>
                        <td className="has-text-black text-justify">
                          {row.detalle}
                        </td>
                        <td className="has-text-black">{row.categoria}</td>
                        <td>
                          <a
                            href={row.pdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="button is-small custom-download"
                            style={{
                              backgroundColor: "#10263b",
                              color: "white",
                              border: "none",
                              fontWeight: "bold",
                            }}
                          >
                            Ver PDF
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredData.length === 0 && (
                  <p className="has-text-grey has-text-centered">
                    No se encontraron resultados.
                  </p>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
