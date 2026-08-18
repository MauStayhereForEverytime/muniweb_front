import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./items-style.css";
import MenuMovil from "./header/MenuMovil";
import Documents from "./header/Documents";
import Municipalidad from "./header/Municipalidad";
import EstructuraFuncional from "./header/EstructuraFuncional";
import Programas from "./header/Programas";
import Logos from "./header/Logos";

const Header2 = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("id");
    window.location.href = "/home";
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header>
      {/* Logos arriba */}
      <div className="has-background-white">
        <Logos />
      </div>

      {/* Navbar de Bulma */}
      <nav
        className="navbar is-white has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          {/* Botón hamburguesa móvil */}
          <a
            role="button"
            className={`navbar-burger ${menuOpen ? "is-active" : ""}`}
            aria-label="menu"
            aria-expanded="false"
            onClick={toggleMenu}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div className={`navbar-menu ${menuOpen ? "is-active" : ""}`}>
          <div className="navbar-start">
            <Link to="/home" className="navbar-item has-text-weight-bold">
              Inicio
            </Link>

            <Link to="/ciudad" className="navbar-item has-text-weight-bold">
              Ciudad
            </Link>

            {/* Componentes dropdown */}
            <Municipalidad />
            <EstructuraFuncional />
            <Documents />
            <Programas />

            <Link
              to="/blog"
              className="navbar-item has-text-weight-bold"
              target="_blank"
            >
              Blog
            </Link>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <button
                className="button is-danger is-small"
                onClick={handleLogout}
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Menú móvil (si tienes custom) */}
      <MenuMovil menuOpen={menuOpen} />
    </header>
  );
};

export default Header2;
