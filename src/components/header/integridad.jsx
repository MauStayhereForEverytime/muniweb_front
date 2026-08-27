import { useState, useEffect, useMemo } from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaCheck, FaChevronLeft, FaChevronRight } from "react-icons/fa";

import Header from "../Header";
import Footer from "../Footer";
import SectionHeader from "../home/SectionHeader";
import "../home/carrousel/home-carousel.css";

import maynas2 from "../../assets/img/sargentolorespalza.jpg";
import grafico from "../../assets/img/raficooo.png";
import image from "../../assets/img/image.png";
import plaza from "../../assets/img/plazasarg.png";
import integridad from "../../assets/img/integridad.jpg";
import servdania from "../../assets/img/serviciociudadania.jpg";
import pubwebfi from "../../assets/img/pubwebfi.png";
import integridad2 from "../../assets/img/integridad2.png";

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

const data = [
  {
    fecha: "05/02/2026",
    detalle: "COMPROMISO DE INTEGRIDAD INSTITUCIONAL",
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
      "Resolución de Secretaría de Integridad Pública N° 004-2023-PCM/SIP: Modificación de los numerales 5.1.3 y 5.1.4 de la Directiva N° 001-2022-PCM/SIP “Lineamientos para asegurar la integridad y transparencia en las gestiones de intereses y otras actividades a través del Registro de Visitas en Línea y Registro de Agendas Oficiales”",
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
      "Resolución de Secretaría de Integridad Pública N° 001-2022-PCM-SIP: 'Lineamientos para asegurar la integridad y transparencia en las gestiones de intereses y otras actividades a través del Registro de Visitas en Línea y Registro de Agendas Oficiales'",
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
      "Decreto Supremo N° 120-2019-PCM: Se aprueba el Reglamento de la Ley Nº 28024 - Ley que regula la gestión de intereses en la administración pública, que consta de cinco (5) Títulos, diecinueve (19) Artículos, cuatro (4) Disposiciones Complementarias Finales y cuatro (4) Disposiciones Complementarias Transitorias, los cuales forman parte integrante del presente decreto supremo",
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

const sliderImages = [maynas2, plaza, grafico, image];

// eslint-disable-next-line react/prop-types
const PrevArrow = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label="Anterior"
    className={`absolute left-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-maynas-red transition-colors duration-200 ${focusRing}`}
  >
    <FaChevronLeft />
  </button>
);

// eslint-disable-next-line react/prop-types
const NextArrow = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label="Siguiente"
    className={`absolute right-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-maynas-red transition-colors duration-200 ${focusRing}`}
  >
    <FaChevronRight />
  </button>
);

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
  arrows: true,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
};

const noticias = [
  {
    titulo: "¡CAPACITACIÓN: IMPLEMENTACIÓN DE MODELO DE INTEGRIDAD!",
    fecha: "Fecha de publicación: 26/09/2025",
    imagen: integridad2,
    enlace: "https://www.facebook.com/share/1EWd1rd8gF/",
  },
  {
    titulo:
      "¿Cuál es el Rol de la Unidad Funcional de Integridad Institucional de Maynas?",
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

const funcionBullets = [
  "La implementación del modelo de integridad,",
  "El desarrollo de mecanismos dirigidos a promover la integridad; y",
  "La observancia e interiorización de los valores y principios vinculados con el uso adecuado de los fondos, recursos, activos y atribuciones de la función pública.",
];

const objetivos = [
  "Promover e instalar una cultura de integridad y de ética pública en los/las servidores/as civiles.",
  "Desarrollar canales de denuncias de actos o actuaciones de corrupción, o que sean contrarias a la ética pública.",
  "Garantizar la transparencia y el acceso a la información pública.",
  "Fortalecer la gestión de riesgos al interior de la entidad.",
  "Consolidar una gestión de información integrada para la prevención de la corrupción.",
  "Instalar y consolidar la gestión de conflictos de intereses y la gestión de intereses.",
  "Fortalecer el mecanismo para la gestión de denuncias por presuntos actos de corrupción.",
  "Impulsar una carrera pública meritocrática.",
  "Garantizar la integridad en las contrataciones de obras, bienes y servicios.",
  "Reforzar los sistemas disciplinarios.",
];

const conceptos = [
  {
    titulo: "Cultura de Integridad Pública",
    descripcion:
      "Es la expresión de saberes y prácticas compartidas en una institución donde se actúa de manera consistente con sus valores organizacionales y en coherencia con el cumplimiento de los principios, deberes y normas destinados a privilegiar el interés general, luchar contra la corrupción y elevar permanentemente los estándares de la actuación pública.",
  },
  {
    titulo: "Índice de capacidad preventiva frente a la corrupción",
    descripcion:
      "Es la expresión de saberes y prácticas compartidas en una institución donde se actúa de manera consistente con sus valores organizacionales y en coherencia con el cumplimiento de los principios, deberes y normas destinados a privilegiar el interés general, luchar contra la corrupción y elevar permanentemente los estándares de la actuación pública.",
  },
  {
    titulo: "Enfoque de integridad",
    descripcion:
      "Es un enfoque transversal de gestión destinado a evaluar y fortalecer el desempeño ético de los servidores y funcionarios/as públicos, mitigando los riesgos que pudieran conducir o facilitar en una entidad la comisión de prácticas contrarias a la ética o corruptas, de modo que se actúe con prevención, debida diligencia y de manera oportuna.",
  },
  {
    titulo: "Programa de integridad",
    descripcion:
      "Es un enfoque transversal de gestión destinado a evaluar y fortalecer el desempeño ético de los servidores y funcionarios/as públicos, mitigando los riesgos que pudieran conducir o facilitar en una entidad la comisión de prácticas contrarias a la ética o corruptas, de modo que se actúe con prevención, debida diligencia y de manera oportuna.",
  },
];

const ufiiFunciones = [
  "Conducir la gestión de riesgos que afectan la integridad pública, en coordinación con la máxima autoridad administrativa y los órganos o unidades orgánicas de la entidad;",
  "Proponer ante la máxima autoridad administrativa de la entidad el programa de integridad y lucha contra la corrupción; así como supervisar su cumplimiento;",
  "Articular con la Secretaría de Integridad Pública la implementación del Modelo de Integridad en su entidad;",
  "Proponer la incorporación de objetivos y acciones de integridad en los planes estratégicos de la entidad;",
  "Implementar, conducir y dirigir la estrategia institucional de integridad y lucha contra la corrupción, así como supervisar su cumplimiento;",
  "Supervisar el cumplimiento de la normativa vigente de transparencia, gestión de intereses y conflicto de intereses;",
  "Coordinar con la máxima autoridad administrativa y los demás órganos o unidades orgánicas de la entidad, la planificación, ejecución, seguimiento y evaluación del sistema de control interno;",
  "Coordinar e implementar el desarrollo de actividades de capacitación en materia de ética pública, transparencia y acceso a la información pública, gestión de intereses, conflicto de intereses, control interno y otras materias vinculadas con la integridad y lucha contra la corrupción;",
  "Recibir, evaluar y derivar las denuncias que sobre supuestos actos de corrupción se reciban a través de los mecanismos habilitados por la entidad, asegurando la reserva de información cuando corresponda; asimismo, realizar el seguimiento y sistematización de la información relativa a la atención de denuncias;",
  "Otorgar las medidas de protección al denunciante o testigos cuando corresponda;",
  "Orientar y asesorar a los servidores civiles sobre dudas, problemas éticos, situaciones de conflicto de interés, así como sobre los canales de denuncias y medidas de protección existentes en la entidad y otros aspectos en materia de integridad;",
  "Monitorear la implementación del modelo de integridad en la entidad;",
  "Aquellas que por mandato normativo y en razón de la materia o especialidad le sean asignadas.",
];

const fieldClass =
  "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm focus:border-maynas-red focus:outline-none focus:ring-2 focus:ring-maynas-red/30";
const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maynas-red/50";

const categoriaBadge = (cat) =>
  cat === "Nacional"
    ? "bg-maynas-red/10 text-maynas-red"
    : "bg-maynas-navy/10 text-maynas-navy";

export default function IntegridadInstitucional() {
  const [filtroDetalle, setFiltroDetalle] = useState("");
  const [filtroMes, setFiltroMes] = useState("");
  const [filtroAño, setFiltroAño] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNoticia, setSelectedNoticia] = useState(null);

  const openModal = (noticia) => {
    setSelectedNoticia(noticia);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedNoticia(null);
  };

  useEffect(() => {
    if (!modalOpen) return undefined;
    const handleKey = (e) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [modalOpen]);

  const filteredData = useMemo(
    () =>
      data.filter((row) => {
        const [, mes, anio] = row.fecha.split("/");
        return (
          row.detalle.toLowerCase().includes(filtroDetalle.toLowerCase()) &&
          (filtroMes === "" || parseInt(mes, 10) === parseInt(filtroMes, 10)) &&
          (filtroAño === "" || anio === filtroAño) &&
          (filtroCategoria === "" || row.categoria === filtroCategoria)
        );
      }),
    [filtroDetalle, filtroMes, filtroAño, filtroCategoria]
  );

  return (
    <div className="bg-maynas-paper min-h-screen flex flex-col">
      <Header />

      <main id="integridad" className="flex-grow pt-20 md:pt-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="pb-12 md:pb-16">
            <div className="home-carousel-scope integridad-carousel-scope relative h-[420px] sm:h-[480px] md:h-[560px] lg:h-[640px] overflow-hidden bg-gray-200 rounded-xl">
              <Slider {...settings}>
                {sliderImages.map((img, i) => (
                  <div key={i} className="relative h-full w-full">
                    <img
                      src={img}
                      alt={`Integridad Institucional ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="pointer-events-none absolute left-4 md:left-6 lg:left-8 bottom-16 md:bottom-20 z-20 max-w-[60%] md:max-w-[50%]">
                      <div className="bg-maynas-navy/85 backdrop-blur-sm px-4 md:px-6 py-2 md:py-3 rounded-lg shadow-lg">
                        <p className="font-display text-lg md:text-xl lg:text-2xl font-bold text-white line-clamp-2 drop-shadow">
                          Integridad Institucional
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </section>

          <section className="py-12 md:py-16">
            <SectionHeader
              eyebrow="Marco institucional"
              title="Integridad pública"
            />

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="lg:col-span-3 bg-white rounded-xl ring-1 ring-gray-200 shadow-sm p-6 md:p-8">
                <h3 className="font-display text-xl md:text-2xl font-bold text-maynas-navy">
                  Función de integridad
                </h3>
                <p className="mt-4 text-gray-700 leading-relaxed">
                  Son las facultades y competencias asignadas a los órganos que
                  ejercen la función de integridad, destinadas a facilitar,
                  implementar, supervisar, y orientar a los distintos órganos y
                  unidades orgánicas sobre la correcta y oportuna
                  implementación de las normas, herramientas y/o mecanismos
                  establecidos para elevar los estándares de integridad pública.
                </p>
                <p className="mt-4 text-gray-700 leading-relaxed">
                  Estas funciones se ejercen preferentemente sobre la base del
                  Modelo de Integridad, que contiene lineamientos y/o parámetros
                  destinados a fortalecer la capacidad de prevención a la
                  corrupción y actuaciones contrarias a la ética de las
                  entidades públicas.
                </p>
                <p className="mt-4 text-gray-700 leading-relaxed">
                  Se fortalece la función de integridad a partir de:
                </p>
                <ul className="mt-3 space-y-2">
                  {funcionBullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700">
                      <span
                        className="mt-2 h-2 w-2 rounded-full bg-maynas-red flex-shrink-0"
                        aria-hidden="true"
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-2 bg-maynas-navy rounded-xl shadow-sm p-6 md:p-8">
                <h3 className="font-display text-xl md:text-2xl font-bold text-white">
                  Objetivos
                </h3>
                <p className="mt-2 text-white/80">
                  Los principales objetivos de la función de integridad son:
                </p>
                <ul className="mt-4 space-y-2.5">
                  {objetivos.map((objetivo, i) => (
                    <li key={i} className="flex items-start gap-2 text-white">
                      <FaCheck
                        className="mt-1 text-maynas-red flex-shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-sm leading-relaxed">{objetivo}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="py-12 md:py-16">
            <SectionHeader
              eyebrow="Conceptos clave"
              title="El modelo en 4 ideas"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {conceptos.map((concepto, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl ring-1 ring-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300 p-6 border-t-2 border-maynas-red"
                >
                  <h3 className="font-display text-xl font-bold text-maynas-navy">
                    {concepto.titulo}
                  </h3>
                  <p className="mt-3 text-gray-600 leading-relaxed">
                    {concepto.descripcion}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="py-12 md:py-16">
            <SectionHeader
              eyebrow="Actualidad"
              title="Difusiones y noticias"
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <button
                  type="button"
                  onClick={() => openModal(noticias[0])}
                  className={`group flex flex-col h-full w-full text-left bg-white rounded-xl overflow-hidden ring-1 ring-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 ${focusRing}`}
                >
                  <div className="flex-1 min-h-64 md:min-h-80 bg-gray-100 overflow-hidden">
                    <img
                      src={noticias[0].imagen}
                      alt={noticias[0].titulo}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5 md:p-6 bg-maynas-navy flex flex-col">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-white/70">
                      Noticia destacada
                    </p>
                    <h3 className="font-display font-bold text-xl md:text-2xl text-white mt-1 leading-snug line-clamp-2">
                      {noticias[0].titulo}
                    </h3>
                    <p className="mt-1.5 text-xs text-white/85">
                      {noticias[0].fecha}
                    </p>
                    <span className="mt-auto pt-2 inline-flex items-center gap-1 text-sm font-semibold text-maynas-red group-hover:underline">
                      Ver más →
                    </span>
                  </div>
                </button>
              </div>

              <div className="flex flex-col gap-6">
                {noticias.slice(1).map((noticia, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => openModal(noticia)}
                    className={`group flex flex-col flex-1 min-h-0 w-full text-left bg-white rounded-xl overflow-hidden ring-1 ring-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 ${focusRing}`}
                  >
                    <div className="flex-1 min-h-32 md:min-h-40 bg-gray-100 overflow-hidden">
                      <img
                        src={noticia.imagen}
                        alt={noticia.titulo}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4 flex flex-col">
                      <h3 className="font-display font-bold text-maynas-navy group-hover:text-maynas-red transition-colors duration-200 line-clamp-2">
                        {noticia.titulo}
                      </h3>
                      <p className="mt-1.5 text-xs text-gray-500">
                        {noticia.fecha}
                      </p>
                      <span className="mt-auto pt-2 inline-flex items-center gap-1 text-sm font-semibold text-maynas-red group-hover:underline">
                        Ver más →
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="py-12 md:py-16">
            <SectionHeader
              eyebrow="UFII"
              title="Unidad Funcional de Integridad"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ufiiFunciones.map((funcion, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl ring-1 ring-gray-200 shadow-sm p-6"
                >
                  <p
                    className="font-display text-4xl font-extrabold text-maynas-red leading-none"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-3 text-gray-700 leading-relaxed">
                    {funcion}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="py-12 md:py-16">
            <SectionHeader eyebrow="Marco legal" title="Normativas" />

            <div className="bg-white rounded-xl ring-1 ring-gray-200 shadow-sm overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-5 md:p-6">
                <div>
                  <label
                    htmlFor="filtro-detalle"
                    className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500"
                  >
                    Detalle
                  </label>
                  <input
                    id="filtro-detalle"
                    type="text"
                    className={fieldClass}
                    placeholder="Buscar por detalle"
                    value={filtroDetalle}
                    onChange={(e) => setFiltroDetalle(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="filtro-mes"
                    className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500"
                  >
                    Mes
                  </label>
                  <select
                    id="filtro-mes"
                    className={fieldClass}
                    value={filtroMes}
                    onChange={(e) => setFiltroMes(e.target.value)}
                  >
                    <option value="">Todos los meses</option>
                    {meses.map((mes, index) => (
                      <option key={index} value={index + 1}>
                        {mes}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="filtro-año"
                    className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500"
                  >
                    Año
                  </label>
                  <select
                    id="filtro-año"
                    className={fieldClass}
                    value={filtroAño}
                    onChange={(e) => setFiltroAño(e.target.value)}
                  >
                    <option value="">Año: Seleccionar</option>
                    {años.map((año, i) => (
                      <option key={i} value={año}>
                        {año}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="filtro-categoria"
                    className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500"
                  >
                    Categoría
                  </label>
                  <select
                    id="filtro-categoria"
                    className={fieldClass}
                    value={filtroCategoria}
                    onChange={(e) => setFiltroCategoria(e.target.value)}
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

              <p className="px-5 md:px-6 pb-3 text-xs text-gray-500">
                Mostrando {filteredData.length} de {data.length} normativas
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-maynas-navy text-white">
                    <tr>
                      <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                        Fecha
                      </th>
                      <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider">
                        Detalle
                      </th>
                      <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider">
                        Categoría
                      </th>
                      <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider">
                        PDF
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((row, i) => (
                      <tr
                        key={i}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-5 py-4 font-semibold text-maynas-navy whitespace-nowrap">
                          {row.fecha}
                        </td>
                        <td className="px-5 py-4 text-gray-700 leading-relaxed">
                          {row.detalle}
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${categoriaBadge(row.categoria)}`}
                          >
                            {row.categoria}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <a
                            href={row.pdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-1 bg-maynas-navy text-white text-xs font-semibold px-3 py-1.5 rounded-md hover:bg-maynas-red transition-colors whitespace-nowrap ${focusRing}`}
                          >
                            Ver PDF
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredData.length === 0 && (
                  <p className="px-5 py-10 text-center text-gray-500">
                    No se encontraron resultados.
                  </p>
                )}
              </div>
            </div>
          </section>
        </div>

        <section className="mt-12 md:mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-maynas-red font-semibold">
                  Programa
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-maynas-navy mt-1 border-l-4 border-maynas-red pl-4">
                  Programa de integridad
                </h2>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  El Programa de Integridad de la MPH para el presente período
                  2024, contiene acciones comprendidas en los meses de setiembre
                  a diciembre del presente año, las cuales nos permitirán dar
                  inicio para el cierre de brechas existentes.
                </p>

                <h3 className="font-display text-xl font-bold text-maynas-navy mt-8">
                  Componentes del modelo de integridad
                </h3>
                <p className="mt-3 text-gray-600 leading-relaxed">
                  Modelo de Integridad para las entidades del sector público (D.
                  S N° 044-2018-PCM, Plan Nacional de Integridad y Lucha contra
                  la Corrupción 2018-2021). Este modelo se organiza en 9
                  componentes con sus respectivos subcomponentes, los que
                  constituyen el estándar peruano de integridad. Los requisitos
                  a cumplir para cada componente y subcomponente son precisados
                  en la Directiva N° 002-2021-PCM/SIP, Lineamientos para
                  fortalecer una cultura de integridad en las entidades del
                  sector público, aprobados por Resolución SIP N° 002-2021-PCM/SIP.
                </p>

                <h3 className="font-display text-xl font-bold text-maynas-navy mt-8">
                  Material informativo
                </h3>
                <div className="mt-3 flex flex-wrap gap-3">
                  <a
                    href="https://repo.munihuamanga.gob.pe/Documentos_mph/Munitransparencia/integridad_institucional/taller_modelo_integridad.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 border border-maynas-navy text-maynas-navy px-4 py-2 rounded-md text-sm font-semibold hover:bg-maynas-navy hover:text-white transition-colors ${focusRing}`}
                  >
                    Taller sobre el Modelo de Integridad
                  </a>
                  <a
                    href="https://www.youtube.com/watch?v=RcYKK8SXCkE"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 border border-maynas-navy text-maynas-navy px-4 py-2 rounded-md text-sm font-semibold hover:bg-maynas-navy hover:text-white transition-colors ${focusRing}`}
                  >
                    Modelo de Integridad para las entidades del sector público
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-lg">
                <img
                  src={image}
                  alt="Modelo de Integridad"
                  className="w-full h-auto object-contain rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {modalOpen && selectedNoticia && (
        <div
          className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full bg-gray-100 flex items-center justify-center flex-shrink-0">
              <img
                src={selectedNoticia.imagen}
                alt={selectedNoticia.titulo}
                className="max-h-[55vh] w-full object-contain"
              />
              <button
                type="button"
                onClick={closeModal}
                aria-label="Cerrar"
                title="Cerrar (Esc)"
                className={`absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg leading-none ${focusRing}`}
              >
                ×
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              <h3 className="font-display text-2xl font-bold text-maynas-navy break-words">
                {selectedNoticia.titulo}
              </h3>
              <p className="mt-2 text-gray-500">{selectedNoticia.fecha}</p>
            </div>

            {selectedNoticia.enlace && (
              <div className="p-4 border-t bg-gray-50 flex justify-end items-center flex-shrink-0">
                <a
                  href={selectedNoticia.enlace}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`bg-maynas-navy text-white px-5 py-2.5 rounded-md font-semibold hover:bg-maynas-red transition-colors ${focusRing}`}
                >
                  Ver más →
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}