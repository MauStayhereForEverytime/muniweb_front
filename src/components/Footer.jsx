import { FaFacebook, FaYoutube } from "react-icons/fa";
import escudoMaynas from "../assets/img/Escudo_de_Iquitos.png";

const municipalidadLinks = [
  { label: "Ciudad", href: "/ciudad" },
  { label: "Funcionarios", href: "https://www.gob.pe/institucion/munimaynas/funcionarios", external: true },
  { label: "Organigrama", href: "https://www.gob.pe/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6MTY3MDkyLCJwdXIiOiJibG9iX2lkIn19--b0afc26b91b791810814a769277de7c2f4513436/ORGANIGRAMA%20ESTRUCTURAL%20DE%20LA%20MPM%202019%20-CONSOLIDADO.pdf", external: true },
  { label: "Estructura funcional", href: "https://cdn.www.gob.pe/uploads/document/file/1892018/ROF%202020.pdf.pdf?v=1620930425", external: true },
  { label: "Noticias", href: "https://www.gob.pe/institucion/munimaynas/noticias", external: true },
  { label: "COPROSEC", href: "https://www.gob.pe/81110-municipalidad-provincial-de-maynas-comite-provincial-de-seguridad-ciudadana-coprosec", external: true },
];

const serviciosLinks = [
  { label: "Mesa de partes", href: "https://facilita.gob.pe/t/466", external: true },
  { label: "Portal de Transparencia", href: "https://www.transparencia.gob.pe/enlaces/pte_transparencia_enlaces.aspx?id_entidad=1605#.Y9fNiHbMIdU", external: true },
  { label: "Libro de reclamaciones", href: "https://reclamos.servicios.gob.pe/?institution_id=313", external: true },
  { label: "Convocatorias CAS", href: "https://www.gob.pe/institucion/munimaynas/colecciones/50968-convocatorias-de-trabajo-muni-maynas", external: true },
];

const contactoLinks = [
  { label: "Contáctanos", href: "https://www.gob.pe/institucion/munimaynas/contacto-y-numeros-de-emergencias", external: true },
  { label: "SENCICO", href: "http://www.sencico.gob.pe/", external: true },
];

const redesSociales = [
  {
    label: "Facebook de la Municipalidad Provincial de Maynas",
    href: "https://web.facebook.com/munimaynasperu",
    icon: FaFacebook,
  },
  {
    label: "YouTube de la Municipalidad Provincial de Maynas",
    href: "https://www.youtube.com/@municipalidadprovincialdem9756",
    icon: FaYoutube,
  },
];

const FooterColumn = ({ title, links }) => (
  // eslint-disable-next-line react/prop-types
  <nav aria-label={title}>
    <h3 className="text-[15px] md:text-base font-semibold tracking-wide text-white uppercase mb-4 relative inline-block">
      {title}
      <span
        aria-hidden="true"
        className="absolute left-0 -bottom-1 h-[2px] w-6 bg-maynas-red rounded-full"
      />
    </h3>
    <ul className="space-y-2 text-[14px] leading-relaxed">
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            className="text-white/80 hover:text-white hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-maynas-navy rounded-sm transition-colors"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-maynas-navy text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col items-center text-center">
            <a
              href="/"
              className="inline-flex items-center gap-3 mb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-maynas-navy rounded-md"
              aria-label="Ir al inicio - Municipalidad Provincial de Maynas"
            >
              <img
                src={escudoMaynas}
                alt="Escudo de la Municipalidad Provincial de Maynas"
                className="h-20 w-auto bg-white/95 rounded-md p-1.5"
                width="80"
                height="80"
              />
              <span className="sr-only">Municipalidad Provincial de Maynas</span>
            </a>
            <p className="text-[15px] font-semibold leading-snug">
              Municipalidad Provincial de Maynas
            </p>
            <p className="mt-1 text-sm text-white/75">
              Iquitos · Loreto · Perú
            </p>

            <div className="mt-6 w-full">
              <p className="text-xs uppercase tracking-wider text-white/70 mb-3">
                Síguenos
              </p>
              <ul className="flex items-center justify-center gap-3">
                {redesSociales.map(({ label, href, icon: Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-maynas-red hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-maynas-navy transition-colors"
                    >
                      <Icon className="text-lg" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <FooterColumn title="Municipalidad" links={municipalidadLinks} />
          <FooterColumn title="Servicios al ciudadano" links={serviciosLinks} />
          <FooterColumn title="Contacto y enlaces" links={contactoLinks} />
        </div>
      </div>

      <div className="bg-maynas-navyDark border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 pl-4 sm:pl-28 md:pl-32 lg:pl-32 flex flex-col sm:flex-row items-center justify-between gap-2 text-[13px] text-white/80">
          <p className="text-center sm:text-left">
            © {year} Municipalidad Provincial de Maynas · Desarrollado por OSTI-MPM
          </p>
          <p className="text-center sm:text-right text-white/60">
            Todos los derechos reservados
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
