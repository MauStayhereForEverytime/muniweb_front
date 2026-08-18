import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Vistauno from "./pages/Vistauno";
import Ciudad from "./pages/Ciudad";
import Noticias from "./pages/Noticias";
import Actas from "./pages/Documentos/Actas";
import Resoluciones from "./pages/Documentos/Resoluciones";
import Ordenanzas from "./pages/Documentos/Ordenanzas";
// import Blog from "./pages/Blog";
import Innovation from "./pages/Innovation";
import Compromiso from "./pages/Compromiso";
import Testimonios from "./pages/Testimonios";
import NewsInfo from "./components/noticias/NewsInfo";
// import BlogInfo from "./components/blog/BlogInfo";
import InnovationInfo from "./components/Innovacion/InnovationInfo";
import EventosTodos from "./components/home/eventos/EventosTodos";
import EventosInfo from "./components/home/eventos/EventosInfo";
import IntegridadInstitucional from "./components/header/integridad";
import BoletinEstadistico from "./components/header/boletin";

// Verificar si el usuario está autenticado
const isAuthenticated = () =>
  !!localStorage.getItem("accessToken") ||
  !!localStorage.getItem("refreshToken");

// Componente de Ruta Privada
const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

// Definir rutas
const AppRoutes = () => (
  <Router>
    <Routes>
      {/* Redirigir desde la raíz "/" */}
      <Route
        path="/"
        element={
          isAuthenticated() ? (
            <Navigate to="/dashboard" />
          ) : (
            <Navigate to="/home" />
          )
        }
      />

      {/* Rutas públicas */}
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/products" element={<Vistauno />} />
      <Route path="/ciudad" element={<Ciudad />} />
      <Route path="/noticias" element={<Noticias />} />
      <Route path="/actas" element={<Actas />} />
      <Route path="/resoluciones" element={<Resoluciones />} />
      <Route path="/ordenanzas" element={<Ordenanzas />} />
      {/* <Route path="/blog" element={<Blog/>} /> */}
      <Route path="/testimonios" element={<Testimonios/>} />
      <Route path="/news/:id" element={<NewsInfo/>} />
      {/* <Route path="/blog/:id" element={<BlogInfo/>} /> */}
      <Route path="/innovation/:id" element={<InnovationInfo/>} />
      <Route path="/eventos/edit/:id" element={<EventosInfo/>} />
      <Route path="/compromiso" element={<Compromiso/>} />
      <Route path="/innovation" element={<Innovation/>} />
      <Route path="/eventos-todos" element={<EventosTodos/>} />
      <Route path="/integridad" element={<IntegridadInstitucional/>} />
      <Route path="/boletin" element={<BoletinEstadistico/>} />

      {/* Rutas privadas */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      {/* Ruta de redirección por defecto si no coincide con ninguna */}
      <Route
        path="*"
        element={<Navigate to={isAuthenticated() ? "/dashboard" : "/home"} />}
      />
    </Routes>
  </Router>
);

export default AppRoutes;
