import React, { useState, useEffect } from "react";

import "../css/integridad.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Header from "../../components/Header"; // Agregamos el Header
import maynas2 from "../../assets/img/sargentolorespalza.jpg";
import grafico from "../../assets/img/raficooo.png";
import image from "../../assets/img/image.png";
import plaza from "../../assets/img/plazasarg.png";
import integridad from "../../assets/img/integridad.jpg";
import servdania from "../../assets/img/serviciociudadania.jpg";
import pubwebfi from "../../assets/img/pubwebfi.png";
import integridad2 from "../../assets/img/integridad2.png";
import Footer from "../../components/Footer"; // Agregamos el Footer
import "../css/bulma-scoped.css";

import rm_256_17092024_pcm from "../../assets/docs/rm_256_17092024_pcm.pdf";
import rsip_005_30072024_pcm from "../../assets/docs/rsip_005_30072024_pcm.pdf";
import rsip_004_03072024_pcm from "../../assets/docs/rsip_004_03072024_pcm.pdf";
import rsip_001_29022024_pcm from "../../assets/docs/rsip_001_29022024_pcm.pdf";
import ds_082_19072023_pcm from "../../assets/docs/ds_082_19072023_pcm.pdf";
import rsip_004_05062023_pcm from "../../assets/docs/rsip_004_05062023_pcm.pdf";
import rsip_001_05012023_pcm from "../../assets/docs/rsip_001_05012023_pcm.pdf";
import rsip_001_25022022_pcm from "../../assets/docs/rsip_001_25022022_pcm.pdf";
import ds_185_17122021_pcm from "../../assets/docs/ds_185_17122021_pcm.pdf";
import rsip_002_28062021_pcm from "../../assets/docs/rsip_002_28062021_pcm.pdf";
import ds_120_01072019_pcm from "../../assets/docs/ds_120_01072019_pcm.pdf";
import ds_044_26042018_pcm from "../../assets/docs/ds_044_26042018_pcm.pdf";
import dl_1327_06012017 from "../../assets/docs/dl_1327_06012017.pdf";
import ley_28024_23062003 from "../../assets/docs/ley_28024_23062003.pdf";

export default function IntegridadInstitucional() {
  const [filtroDetalle, setFiltroDetalle] = useState("");
  const [filtroMes, setFiltroMes] = useState("");
  const [filtroAño, setFiltroAño] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("");

  const [modalOpen, setModalOpen] = useState(false); // Estado del modal
  const [selectedNoticia, setSelectedNoticia] = useState(null); // Noticia seleccionada

  // Funciones para abrir/cerrar el modal
  const openModal = (noticia) => {
    setSelectedNoticia(noticia);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedNoticia(null);
  };

  const data = [
    {
      fecha: "05/02/2026",
      detalle:
        "COMPROMISO DE INTEGRIDAD INSTITUCIONAL",
      categoria: "Institucional",
      pdf: "https://www.munimaynas.gob.pe/DOCUMENTOS_VARIOS/COMPROMISO DE INTEGRIDAD INSTITUCIONAL_0001.pdf",
    },
    {
      fecha: "21/01/2026",
      detalle:
        "Resolución de Secretaría de Integridad Pública N.° 002-2026-PCM/SIP",
      categoria: "Nacional",
      pdf: "https://www.gob.pe/institucion/pcm/normas-legales/7644478-002-2026-pcm-sip",
    },
    {
      fecha: "26/08/2025",
      detalle:
        "Resolución de Alcaldía N.° 279-2025-A-MPM: ASIGNAR los roles de Alta Dirección, Conductor, Técnico y Consultivo para el proceso de identificación, evaluación y tratamiento de riesgos que afectan a la integridad pública.",
      categoria: "Institucional",
      pdf: "https://cdn.www.gob.pe/uploads/document/file/8702886/7200487-resolucion-de-alcaldia-n-279-2025-a-mpm.pdf?v=1758660375",
    },
    {
      fecha: "27/06/2025",
      detalle:
        "Programa de Integridad 2025 - Unidad Funcional de Integridad - Gerencia Municipal",
      categoria: "Institucional",
      pdf: "https://cdn.www.gob.pe/uploads/document/file/8455195/7017696-programa-de-integridad-2025-unidad-funcional-de-integridad-gerencia-municipal.pdf?v=1754585301",
    },

    {
      fecha: "27/06/2025",
      detalle: "Resolución de Alcaldía N.° 220-2025-A-MPM",
      categoria: "Institucional",
      pdf: "https://cdn.www.gob.pe/uploads/document/file/8455194/7017696-resolucion-de-alcaldia-n-220-2025-a-mpm.pdf?v=1754585300",
    },
    {
      fecha: "27/06/2025",
      detalle:
        "Resolución de Alcaldía N.º 192-2023-A-MPM, de fecha 24 de abril de 2023, por encontrarse sustentada en una directiva expresamente derogada (Directiva N.º 001-2019-PCM/SIP).",
      categoria: "Institucional",
      pdf: "https://cdn.www.gob.pe/uploads/document/file/8304076/6922013-resolucion-de-alcaldia-n-219-2025-a-mpm.pdf?v=1753973471",
    },
    {
      fecha: "18/09/2024",
      detalle:
        "Resolución Ministerial N° 256-2024-PCM: Declarar la segunda semana de diciembre de cada año como la “Semana de la Integridad”, en el marco del Día Internacional contra la Corrupción, instituido por la Asamblea General de las Naciones Unidas con el fin de involucrar a las personas e instituciones en la promoción de un conjunto de valores y medidas destinadas a fomentar la defensa del bien común y el ejercicio ético de la función pública, institucionalizando la promoción de una cultura de integridad con la participación del sector público, del sector privado y de la sociedad civil.",
      categoria: "Nacional",
      pdf: rm_256_17092024_pcm,
    },
    {
      fecha: "30/07/2024",
      detalle:
        "Resolución de Secretaría de Integridad Pública N° 005-2024-PCM/SIP: Resolución que aprueba la Metodología de determinación del ICP y las Guías de evaluación del Modelo de Integridad etapas N° 1, 2 y 3.",
      categoria: "Nacional",
      pdf: rsip_005_30072024_pcm,
    },
    {
      fecha: "03/07/2024",
      detalle:
        "Resolución de Secretaría de Integridad Pública N° 004-2024-PCM/SIP: Resolución que modifica la Cuarta Disposición Complementaria Final de la Directiva N° 002-2023-PCM-SIP 'Directiva para la gestión de denuncias y solicitudes de medidas de protección al denunciante de actos de corrupción recibidas a través de la Plataforma Digital Única de Denuncias del Ciudadano', aprobada por Resolución de Secretaría de Integridad Pública N° 005-2023-PCM-SIP",
      categoria: "Nacional",
      pdf: rsip_004_03072024_pcm,
    },
    {
      fecha: "29/02/2024",
      detalle:
        "Resolución de Secretaría de Integridad Pública N° 001-2024-PCM/SIP: Aprobar la Directiva N° 001-2024-PCM/SIP “Directiva para la incorporación y ejercicio de la función de integridad en las entidades de la administración pública”",
      categoria: "Nacional",
      pdf: rsip_001_29022024_pcm,
    },

    {
      fecha: "19/07/2023",
      detalle:
        "Decreto Supremo N° 082-2023-PCM: Decreto Supremo que aprueba el Reglamento de la Ley N° 31564, Ley de prevención y mitigación del conflicto de intereses en el acceso y salida de personal del servicio público",
      categoria: "Nacional",
      pdf: ds_082_19072023_pcm,
    },

    {
      fecha: "05/06/2023",
      detalle:
        "	Resolución de Secretaría de Integridad Pública N° 004-2023-PCM/SIP: Modificación de los numerales 5.1.3 y 5.1.4 de la Directiva N° 001-2022-PCM/SIP “Lineamientos para asegurar la integridad y transparencia en las gestiones de intereses y otras actividades a través del Registro de Visitas en Línea y Registro de Agendas Oficiales”",

      categoria: "Nacional",
      pdf: rsip_004_05062023_pcm,
    },

    {
      fecha: "05/01/2023",
      detalle:
        "Resolución de Secretaría de Integridad Pública N° 001-2023-PCM/SIP: Aprobar la Guía para la gestión de riesgos que afectan la integridad pública que como Anexo forma parte integrante de la presente Resolución.",
      categoria: "Nacional",
      pdf: rsip_001_05012023_pcm,
    },

    {
      fecha: "25/02/2022",
      detalle:
        "	Resolución de Secretaría de Integridad Pública N° 001-2022-PCM-SIP: 'Lineamientos para asegurar la integridad y transparencia en las gestiones de intereses y otras actividades a través del Registro de Visitas en Línea y Registro de Agendas Oficiales'",

      categoria: "Nacional",
      pdf: rsip_001_25022022_pcm,
    },

    {
      fecha: "17/12/2021",
      detalle:
        "Decreto Supremo N° 185-2021-PCM: Decreto Supremo que crea la Plataforma de Debida Diligencia del Sector Público",

      categoria: "Nacional",
      pdf: ds_185_17122021_pcm,
    },

    {
      fecha: "28/06/2021",
      detalle:
        "Resolución de Secretaría de Integridad Pública N° 002-2021-PCM/SIP: Se aprueba la Directiva N° 002-2021-PCM/SIP “Lineamientos para fortalecer una cultura de integridad en las entidades del sector público” que como Anexo forma parte integrante de la presente Resolución. La Directiva aprobada por la presente Resolución es de alcance nacional a todas las entidades de la Administración Pública comprendidas en el artículo I del Título Preliminar del Texto Único Ordenado de la Ley N° 27444, Ley del Procedimiento Administrativo General, aprobado mediante Decreto Supremo N° 004-2019-JUS.",

      categoria: "Nacional",
      pdf: rsip_002_28062021_pcm,
    },
    {
      fecha: "24/07/2019",
      detalle:
        "Resolución de Secretaría de Integridad Pública - Ley N° 27444, Ley del Procedimiento Administrativo General, aprobado mediante el Decreto Supremo N° 004-2019-JUS.",
      categoria: "Nacional",
      pdf: "https://cdn.www.gob.pe/uploads/document/file/348398/RSIP_N_001-2019-PCM-SIP.pdf?v=1564600141",
    },
    {
      fecha: "01/07/2019",
      detalle:
        "	Decreto Supremo N° 120-2019-PCM: Se aprueba el Reglamento de la Ley Nº 28024 - Ley que regula la gestión de intereses en la administración pública, que consta de cinco (5) Títulos, diecinueve (19) Artículos, cuatro (4) Disposiciones Complementarias Finales y cuatro (4) Disposiciones Complementarias Transitorias, los cuales forman parte integrante del presente decreto supremo",
      categoria: "Nacional",
      pdf: ds_120_01072019_pcm,
    },
    {
      fecha: "26/04/2018",
      detalle:
        "Decreto Supremo N° 044-2018-PCM: Decreto Supremo que aprueba el Plan Nacional de Integridad y Lucha contra la Corrupción 2018-2021",

      categoria: "Nacional",
      pdf: ds_044_26042018_pcm,
    },
    {
      fecha: "06/01/2017",
      detalle:
        "Decreto Legislativo N° 1327: Decreto Legislativo que establece medidas de protección para el denunciante de actos de corrupción y sanciona las denuncias realizadas de mala fe",
      categoria: "Nacional",
      pdf: dl_1327_06012017,
    },
    {
      fecha: "23/06/2003",
      detalle:
        "Ley Nº 28024: Ley que regula la gestión de intereses en el ámbito de la administración pública",

      categoria: "Nacional",
      pdf: ley_28024_23062003,
    },
  ];

  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const años = [
    "2003",
    "2017",
    "2018",
    "2019",
    "2020",
    "2021",
    "2022",
    "2023",
    "2024",
    "2025",
  ];
  const categorias = ["Nacional", "Institucional"];

  const filteredData = data.filter((row) => {
    // Extraer día, mes y año desde "dd/mm/yyyy"
    const [dia, mes, anio] = row.fecha.split("/");

    return (
      row.detalle.toLowerCase().includes(filtroDetalle.toLowerCase()) &&
      (filtroMes === "" || parseInt(mes, 10) === parseInt(filtroMes, 10)) &&
      (filtroAño === "" || anio === filtroAño) &&
      (filtroCategoria === "" || row.categoria === filtroCategoria)
    );
  });

  const sliderImages = [
    maynas2,
    plaza,
    grafico,
    image, // agrega todas las imágenes que quieras
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false, // puedes activar flechas si quieres
  };

  //AQUI ES PARA ACTUALZIAR LAS DIFUSIONES Y NOTICIAS LAS IMAGENES
  const noticias = [
    {
      titulo: "¡CAPACITACIÓN: IMPLEMENTACIÓN DE MODELO DE INTEGRIDAD!",
      fecha: "Fecha de publicación: 26/09/2025",
      imagen: integridad2,
      enlace: "https://www.facebook.com/share/1EWd1rd8gF/",
    },
    {
      titulo: "¿Cuál es el Rol de la Unidad Funcional de Integridad Institucional de Maynas?",
      fecha: "Fecha de publicación: 30/06/2025",
      imagen: integridad,
    },
    {
      titulo: "!Estamos al Servicio de la Ciudadanía!",
      fecha: "Fecha de publicación: 26/07/2025",
      imagen: servdania,
    },
    {
      titulo: "Principales Funciones de la Unidad Funcional de Integridad",
      fecha: "Fecha de publicación: 25/08/2025",
      imagen: pubwebfi,
    },
  ];

  return (
    <div
      className="section has-text-centered"
      style={{ margin: "0 auto", padding: "0" }}
    >
      {/* Header */}

      <Header />
      {/* Hero */}

      <div id="integridad-scope">
        <div
          style={{
            width: "100%",
            height: "100vh",
            margin: 0,
            padding: 0,
            overflow: "hidden",
          }}
        >
          <Slider {...settings}>
            {sliderImages.map((img, i) => (
              <div key={i} style={{ width: "100%", height: "100vh" }}>
                <section
                  style={{
                    width: "100vw",
                    height: "80vh",
                    // backgroundImage: `url(${img})`,
                    backgroundImage: `linear-gradient(to right, rgba(17, 15, 53, 1), rgba(0, 0, 0, 0)), url(${img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <h1
                    className="title is-2 has-text-weight-bold"
                    style={{
                      color: "white",
                      fontSize: "2.5rem",
                      textShadow: "2px 2px 6px rgba(0,0,0,0.8)",
                      marginRight: "60%",
                      marginTop: "7%",
                    }}
                  >
                    Integridad Institucional
                  </h1>
                </section>
              </div>
            ))}
          </Slider>
        </div>

        {/* Main content */}
        <main
          id="integridad"
          className="section"
          style={{ marginTop: -100, paddingTop: "0.0rem" }}
        >
          <div className="section has-text-black">
            <div className="container">
              {/* Título principal */}
              <h1
                className="title has-text-black has-text-centered"
                style={{
                  fontSize: "1.5rem", // más grande que 1.5rem
                  fontWeight: "800", // mucho más grueso
                  letterSpacing: "1px", // espacio entre letras
                  color: "#10263bff",
                  marginBottom: "1rem", // espacio debajo
                  marginTop: "-60px",
                }}
              >
                INTEGRIDAD PÚBLICA
              </h1>

              {/* Dos columnas con separación */}
              <div className="columns mt-5">
                {/* Columna izquierda */}
                <div
                  className="column"
                  style={{
                    borderRight: "1px solid #ccc",
                    textAlign: "justify",
                  }}
                >
                  <h2 className="title is-4 has-text-black">
                    Función de integridad
                  </h2>
                  <p>
                    Son las facultades y competencias asignadas a los órganos
                    que ejercen la función de integridad, destinadas a
                    facilitar, implementar, supervisar, y orientar a los
                    distintos órganos y unidades orgánicas sobre la correcta y
                    oportuna implementación de las normas, herramientas y/o
                    mecanismos establecidos para elevar los estándares de
                    integridad pública.
                  </p>
                  <p>
                    Estas funciones se ejercen preferentemente sobre la base del
                    Modelo de Integridad, que contiene lineamientos y/o
                    parámetros destinados a fortalecer la capacidad de
                    prevención a la corrupción y actuaciones contrarias a la
                    ética de las entidades públicas.
                  </p>
                  <p>Se fortalece la función de integridad a partir de:</p>
                  <ul>
                    <li>La implementación del modelo de integridad,</li>
                    <li>
                      El desarrollo de mecanismos dirigidos a promover la
                      integridad; y
                    </li>
                    <li>
                      La observancia e interiorización de los valores y
                      principios vinculados con el uso adecuado de los fondos,
                      recursos, activos y atribuciones de la función pública.
                    </li>
                  </ul>
                </div>

                {/* Columna derecha */}

                <div className="column" style={{ textAlign: "justify" }}>
                  <h2 className="title is-4 has-text-black">Objetivos</h2>
                  <p>
                    Los principales objetivos de la función de integridad son:
                  </p>
                  <ul style={{ listStyleType: "disc", paddingLeft: "1.5rem" }}>
                    <li>
                      Promover e instalar una cultura de integridad y de ética
                      pública en los/las servidores/as civiles.
                    </li>
                    <li>
                      Desarrollar canales de denuncias de actos o actuaciones de
                      corrupción, o que sean contrarias a la ética pública.
                    </li>
                    <li>
                      Garantizar la transparencia y el acceso a la información
                      pública.
                    </li>
                    <li>
                      Fortalecer la gestión de riesgos al interior de la
                      entidad.
                    </li>
                    <li>
                      Consolidar una gestión de información integrada para la
                      prevención de la corrupción.
                    </li>
                    <li>
                      Instalar y consolidar la gestión de conflictos de
                      intereses y la gestión de intereses.
                    </li>
                    <li>
                      Fortalecer el mecanismo para la gestión de denuncias por
                      presuntos actos de corrupción.
                    </li>
                    <li>Impulsar una carrera pública meritocrática.</li>
                    <li>
                      Garantizar la integridad en las contrataciones de obras,
                      bienes y servicios.
                    </li>
                    <li>Reforzar los sistemas disciplinarios.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* CULTURA DE INTEGRIDAD PUBLICA  */}

          <div className="section has-text-black">
            <div className="container">
              <div className="columns mt-5">
                {/* Columna izquierda (Cultura + Índice) */}
                <div
                  className="column"
                  style={{
                    borderRight: "1px solid #ccc",
                    textAlign: "justify",
                  }}
                >
                  <h2 className="title is-8 has-text-black">
                    Cultura de Integridad Pública
                  </h2>

                  <p>
                    Es la expresión de saberes y prácticas compartidas en una
                    institución donde se actúa de manera consistente con sus
                    valores organizacionales y en coherencia con el cumplimiento
                    de los principios, deberes y normas destinados a privilegiar
                    el interés general, luchar contra la corrupción y elevar
                    permanentemente los estándares de la actuación pública.
                  </p>

                  <h2 className="title is-4 has-text-black mt-5">
                    Índice de capacidad preventiva frente a la corrupción
                  </h2>
                  <p>
                    Es la expresión de saberes y prácticas compartidas en una
                    institución donde se actúa de manera consistente con sus
                    valores organizacionales y en coherencia con el cumplimiento
                    de los principios, deberes y normas destinados a privilegiar
                    el interés general, luchar contra la corrupción y elevar
                    permanentemente los estándares de la actuación pública.
                  </p>
                </div>

                {/* Columna derecha (Enfoque + Programa) */}
                <div className="column" style={{ textAlign: "justify" }}>
                  <h2 className="title is-4 has-text-black">
                    Enfoque de integridad
                  </h2>
                  <p>
                    Es un enfoque transversal de gestión destinado a evaluar y
                    fortalecer el desempeño ético de los servidores y
                    funcionarios/as públicos, mitigando los riesgos que pudieran
                    conducir o facilitar en una entidad la comisión de prácticas
                    contrarias a la ética o corruptas, de modo que se actúe con
                    prevención, debida diligencia y de manera oportuna.
                  </p>

                  <h2 className="title is-4 has-text-black mt-5">
                    Programa de integridad
                  </h2>
                  <p>
                    Es un enfoque transversal de gestión destinado a evaluar y
                    fortalecer el desempeño ético de los servidores y
                    funcionarios/as públicos, mitigando los riesgos que pudieran
                    conducir o facilitar en una entidad la comisión de prácticas
                    contrarias a la ética o corruptas, de modo que se actúe con
                    prevención, debida diligencia y de manera oportuna.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* SECCION DE DIFUSIONES Y NOTICIAS PARA ACTUALIZAR LAS IMAGENES */}
          <section className="section">
            <div className="container">
              <h2
                className="title has-text-centered"
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "800",
                  marginBottom: "1.5rem",
                  color: "#2c3e50",
                  letterSpacing: "1px",
                  marginTop: "-60px",
                }}
              >
                DIFUSIONES Y NOTICIAS
              </h2>

              <div className="columns">
                {/* BLOQUE PRINCIPAL */}
                <div className="column is-two-thirds">
                  <div
                    style={{ position: "relative", cursor: "pointer" }}
                    onClick={() => openModal(noticias[0])}
                  >
                    <figure className="image is-16by9">
                      <img
                        src={noticias[0].imagen}
                        alt={noticias[0].titulo}
                        style={{
                          borderRadius: "4px",
                          objectFit: "cover",
                          width: "100%",
                        }}
                      />
                    </figure>

                    {/* Texto superpuesto */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: "0",
                        left: "0",
                        right: "0",
                        background: "rgba(0,0,0,0.7)",
                        color: "#fff",
                        padding: "0.8rem",
                        fontSize: "0.9rem",
                      }}
                    >
                      <strong>{noticias[0].titulo}</strong>
                      <br />
                      <span style={{ fontSize: "0.8rem" }}>
                        {noticias[0].fecha}
                      </span>
                    </div>
                  </div>
                </div>

                {/* LATEST POSTS CON TEXTO SUPERPUESTO */}
                <div className="column is-one-third">
                  <h4
                    className="has-text-weight-bold"
                    style={{
                      backgroundColor: "#050b41ff",
                      color: "#fff",
                      padding: "0.5rem",
                      fontSize: "0.9rem",
                    }}
                  >
                    ÚLTIMAS NOTICIAS
                  </h4>
                  <br />
                  <div>
                    {noticias.slice(1).map((noticia, index) => (
                      <div
                        key={index}
                        style={{
                          marginBottom: "0.5rem",
                          cursor: "pointer",
                          overflow: "hidden",
                          borderRadius: "6px",
                          height: "120px",
                          position: "relative",
                        }}
                        onClick={() => openModal(noticia)}
                      >
                        <img
                          src={noticia.imagen}
                          alt={noticia.titulo}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            transition: "transform 0.3s ease",
                          }}
                        />

                        {/* Texto superpuesto en las miniaturas */}
                        <div
                          style={{
                            position: "absolute",
                            bottom: "0",
                            left: "0",
                            right: "0",
                            background: "rgba(0,0,0,0.6)",
                            color: "#fff",
                            padding: "0.3rem 0.5rem",
                            fontSize: "0.75rem",
                          }}
                        >
                          <strong style={{ fontSize: "0.8rem" }}>
                            {noticia.titulo}
                          </strong>
                          <br />
                          <span>{noticia.fecha}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* MODAL */}
              {modalOpen && selectedNoticia && (
                <div
                  className="modal-overlay"
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    backgroundColor: "rgba(0,0,0,0.6)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 1000,
                  }}
                  onClick={closeModal}
                >
                  <div
                    className="modal-content"
                    style={{
                      backgroundColor: "#fff",
                      padding: "1rem",
                      borderRadius: "10px",
                      maxWidth: "600px",
                      width: "90%",
                      position: "relative",
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={closeModal}
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        background: "none",
                        border: "none",
                        fontSize: "1.5rem",
                        cursor: "pointer",
                      }}
                    >
                      ×
                    </button>
                    <img
                      src={selectedNoticia.imagen}
                      alt={selectedNoticia.titulo}
                      style={{ width: "100%", borderRadius: "8px" }}
                    />
                    <h3 style={{ marginTop: "1rem" }}>
                      {selectedNoticia.titulo}
                    </h3>
                    <p style={{ fontWeight: "bold", marginTop: "0.4rem" }}>
                      {selectedNoticia.fecha}
                    </p>

                    {selectedNoticia.enlace && (
                      <button
                        onClick={() =>
                          window.open(selectedNoticia.enlace, "_blank")
                        }
                        style={{
                          marginTop: "1rem",
                          padding: "0.5rem 1rem",
                          backgroundColor: "#2c3e50",
                          color: "#fff",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                      >
                        Ver más →
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </section>

          <div className="section has-text-black has-background-gray-lighter">
            <div className="container">
              {/* Título principal */}
              {/* <h1
                className="title is-3 has-text-weight-bold has-text-black"
                style={{ textTransform: "uppercase" }}
              >
                UNIDAD FUNCIONAL DE INTEGRIDAD INSTITUCIONAL – UFII
              </h1> */}

              {/* Título principal */}
              <h1
                className="title has-text-black has-text-centered"
                style={{
                  fontSize: "1.5rem", // más grande que 1.5rem
                  fontWeight: "800", // mucho más grueso
                  letterSpacing: "1px", // espacio entre letras
                  color: "#10263bff",
                  marginBottom: "1rem", // espacio debajo
                  marginTop: "-60px",
                }}
              >
                UNIDAD FUNCIONAL DE INTEGRIDAD INSTITUCIONAL – UFII
              </h1>

              {/* Subtítulo */}
              <h2 className="title is-5 has-text-black">
                Funciones de la Unidad Funcional de Integridad Institucional -
                UFII
              </h2>

              {/* Lista numerada */}
              <ol style={{ textAlign: "justify", marginLeft: "1.2rem" }}>
                <li>
                  1. Conducir la gestión de riesgos que afectan la integridad
                  pública, en coordinación con la máxima autoridad
                  administrativa y los órganos o unidades orgánicas de la
                  entidad;
                </li>
                <li>
                  2. Proponer ante la máxima autoridad administrativa de la
                  entidad el programa de integridad y lucha contra la
                  corrupción; así como supervisar su cumplimiento;
                </li>
                <li>
                  3. Articular con la Secretaría de Integridad Pública la
                  implementación del Modelo de Integridad en su entidad;
                </li>
                <li>
                  4. Proponer la incorporación de objetivos y acciones de
                  integridad en los planes estratégicos de la entidad;
                </li>
                <li>
                  5. Implementar, conducir y dirigir la estrategia institucional
                  de integridad y lucha contra la corrupción, así como
                  supervisar su cumplimiento;
                </li>
                <li>
                  6. Supervisar el cumplimiento de la normativa vigente de
                  transparencia, gestión de intereses y conflicto de intereses;
                </li>
                <li>
                  7. Coordinar con la máxima autoridad administrativa y los
                  demás órganos o unidades orgánicas de la entidad, la
                  planificación, ejecución, seguimiento y evaluación del sistema
                  de control interno;
                </li>
                <li>
                  8. Coordinar e implementar el desarrollo de actividades de
                  capacitación en materia de ética pública, transparencia y
                  acceso a la información pública, gestión de intereses,
                  conflicto de intereses, control interno y otras materias
                  vinculadas con la integridad y lucha contra la corrupción;
                </li>
                <li>
                  9. Recibir, evaluar y derivar las denuncias que sobre
                  supuestos actos de corrupción se reciban a través de los
                  mecanismos habilitados por la entidad, asegurando la reserva
                  de información cuando corresponda; asimismo, realizar el
                  seguimiento y sistematización de la información relativa a la
                  atención de denuncias;
                </li>
                <li>
                  10. Otorgar las medidas de protección al denunciante o
                  testigos cuando corresponda;
                </li>
                <li>
                  11. Orientar y asesorar a los servidores civiles sobre dudas,
                  problemas éticos, situaciones de conflicto de interés, así
                  como sobre los canales de denuncias y medidas de protección
                  existentes en la entidad y otros aspectos en materia de
                  integridad;
                </li>
                <li>
                  12. Monitorear la implementación del modelo de integridad en
                  la entidad;
                </li>
                <li>
                  13. Aquellas que por mandato normativo y en razón de la
                  materia o especialidad le sean asignadas.
                </li>
              </ol>
            </div>
          </div>

          {/* Nueva sección: Normativas */}
          <div className="section">
            <div className="container">
              {/* Título principal */}
              <h1
                className="title has-text-black has-text-centered"
                style={{
                  fontSize: "1.5rem", // más grande que 1.5rem
                  fontWeight: "800", // mucho más grueso
                  letterSpacing: "1px", // espacio entre letras
                  color: "#10263bff",
                  marginBottom: "1rem", // espacio debajo
                  marginTop: "-60px",
                }}
              >
                NORMATIVAS
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
                      fontWeight: "bold", // Texto en negrita
                    }}
                  />
                </div>

                <div className="column is-one-third">
                  <div className="select is-fullwidth">
                    <select
                      value={filtroMes}
                      onChange={(e) => setFiltroMes(e.target.value)}
                      style={{ fontWeight: "bold", fontSize: "1rem" }}
                    >
                      <option value="">Todos los meses</option>
                      {meses.map((mes, index) => (
                        <option key={index} value={index + 1}>
                          {mes}
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
                        fontWeight: "bold", // Texto en negrita
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

                <div className="column is-one-quarter">
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
                      <option value="">Categoría: Seleccionar</option>
                      {categorias.map((cat, i) => (
                        <option key={i} value={cat}>
                          {cat}
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
                      <th className="has-text-black">Detalle</th>
                      <th className="has-text-black">Categoría</th>
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
                            style={{ whiteSpace: "nowrap" }}
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

        <section
          className="section"
          style={{
            backgroundImage: `url(${plaza})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            padding: 0,
            minHeight: "100vh",
          }}
        >
          <div
            className="columns is-vcentered"
            style={{ margin: 0, minHeight: "100vh" }}
          >
            {/* Columna izquierda (texto) */}
            <div
              className="column is-half"
              style={{
                backgroundColor: "rgba(0, 119, 167, 0.9)", // azul semi-transparente
                color: "white",
                textAlign: "justify",
                padding: "3rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center", // centra verticalmente el texto
              }}
            >
              <h2
                className="has-text-white"
                style={{
                  fontFamily: "Arial, sans-serif",
                  fontSize: "24px",
                }}
              >
                PROGRAMA DE INTEGRIDAD
              </h2>

              <p
                className="mb-5"
                style={{ fontSize: "12px", fontFamily: "Arial, sans-serif" }}
              >
                El Programa de Integridad de la MPH para el presente período
                2024, contiene acciones comprendidas en los meses de setiembre a
                diciembre del presente año, las cuales nos permitirán dar inicio
                para el cierre de brechas existentes.
              </p>

              <h2
                className="has-text-white"
                style={{
                  fontFamily: "Arial, sans-serif",
                  fontSize: "24px",
                }}
              >
                COMPONENTES DEL MODELO DE INTEGRIDAD
              </h2>

              <p
                className="mb-5"
                style={{ fontSize: "12px", fontFamily: "Arial, sans-serif" }}
              >
                Modelo de Integridad para las entidades del sector público (D. S
                N° 044-2018-PCM, Plan Nacional de Integridad y Lucha contra la
                Corrupción 2018-2021). Este modelo se organiza en 9 componentes
                con sus respectivos subcomponentes, los que constituyen el
                estándar peruano de integridad. Los requisitos a cumplir para
                cada componente y subcomponente son precisados en la Directiva
                N° 002-2021-PCM/SIP, Lineamientos para fortalecer una cultura de
                integridad en las entidades del sector público, aprobados por
                Resolución SIP N° 002-2021-PCM/SIP.
              </p>

              <h2 className="title is-4 has-text-white has-text-weight-bold">
                MATERIAL INFORMATIVO
              </h2>
              <ul style={{ listStyleType: "disc", paddingLeft: "1.5rem" }}>
                <li>
                  <a
                    href="https://repo.munihuamanga.gob.pe/Documentos_mph/Munitransparencia/integridad_institucional/taller_modelo_integridad.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="has-text-weight-semibold"
                    style={{
                      color: "yellow",
                      fontSize: "0.85rem",
                      fontWeight: "600",
                    }}
                  >
                    Taller sobre el Modelo de Integridad
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/watch?v=RcYKK8SXCkE"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="has-text-weight-semibold"
                    style={{
                      color: "yellow",
                      fontSize: "0.85rem",
                      fontWeight: "600",
                    }}
                  >
                    Modelo de Integridad para las entidades del sector público
                  </a>
                </li>
              </ul>
            </div>

            {/* Columna derecha (imagen circular) */}
            <div
              className="column is-half has-text-centered"
              style={{
                backgroundColor: "white", //  fondo blanco
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "1rem",
              }}
            >
              <img
                src={image}
                alt="Modelo de Integridad"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            </div>
          </div>
        </section>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}
