import React, { useState } from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import * as FaIcons from "react-icons/fa";
import { Navigate } from "react-router-dom";
import 'react-pro-sidebar/dist/css/styles.css';
import CompromisoForm from '../components/administrable/compromisos/CompromisoForm';
// import ActasForm from '../components/administrable/documents/Actasform';
import Dashboard1 from '../components/administrable/dashboard/Dashboard1';
import Modal1 from '../components/administrable/imagenes/Modal1';
import Testimonios1 from '../components/administrable/testimonios/Testimonios1';
import Usuarios from '../components/administrable/usuarios/Usuarios';
import Home from './Home';

// Obtener ícono basado en nombre
const getIcon = (iconName) => {
  const icon = FaIcons[iconName];
  return icon ? React.createElement(icon) : <FaIcons.FaQuestion />;
};

const Dashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeContent, setActiveContent] = useState(<Dashboard1 />); // Estado para el contenido activo
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Opciones de menú (puedes personalizarlas o cargarlas de una API)

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const menuData = [
    {
      label: "Home",
      icon: 'FaTachometerAlt', // Renderiza el icono correctamente
      content: <Navigate to="/home" replace />, // Asegura una navegación correcta
      items: null,
    },
    {
      label: 'Dashboard',
      icon: 'FaTachometerAlt',
      content: <Dashboard1 />, // El contenido de Dashboard
      items: null,
    },
    {
      label: 'Compromisos',
      icon: 'FaCopyright',
      content: <CompromisoForm />, // Su contenido correspondiente
      items: null,
    },
    {
      label: 'Imágenes',
      icon: 'FaImages',
      items: [
        {
          label: 'Modal de Inicio',
          icon: 'FaImages',
          content: <Modal1 />, // Aquí puedes agregar contenido específico
          items: null,
        },
      ],
    },
    {
      label: 'Testimonios',
      icon: 'FaFileAlt',
      content: <Testimonios1 />, // Su contenido correspondiente
      items: null,
    },
    {
      label: 'Usuarios',
      icon: 'FaUser',
      content: <Usuarios />, // Su contenido correspondiente
      items: null,
    },
    
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('id');
    window.location.href = '/login'; // Redirige al login después de eliminar el token
  };

  const handleToggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Manejador de clic para actualizar el contenido principal
  const handleContentChange = (content, action) => {
    if (action === 'logout') {
      handleLogout(); // Si la acción es logout, ejecuta el cierre de sesión
    } else {
      setActiveContent(content); // Si no, cambia el contenido normalmente
    }
  };



  return (
    <div className="flex min-h-screen">
      {/* Sidebar usando react-pro-sidebar */}
      {/* Sidebar usando react-pro-sidebar */}
      <ProSidebar
        breakPoint="md"
        collapsed={isCollapsed}
        width={isCollapsed ? '80px' : '250px'}
        style={{ zIndex: '49', height: '100vh' }}
      >
        <Menu iconShape="circle">
          {/* Mapeo del menú */}
          {menuData.map((menuItem, index) => (
            <React.Fragment key={index}>
              {/* Si no tiene subitems */}
              {menuItem.items === null ? (
                <MenuItem
                  icon={getIcon(menuItem.icon)}
                  onClick={() => handleContentChange(menuItem.content)} // Cambia el contenido
                >
                  {menuItem.label}
                </MenuItem>
              ) : (
                // Si tiene subitems
                <SubMenu title={menuItem.label} icon={getIcon(menuItem.icon)}>
                  {menuItem.items.map((subItem, subIndex) => (
                    <React.Fragment key={subIndex}>
                      {/* Si no tiene sub-subitems */}
                      {subItem.items === null ? (
                        <MenuItem
                          icon={getIcon(subItem.icon)}
                          onClick={() => handleContentChange(subItem.content)} // Cambia el contenido o ejecuta logout
                        >
                          {subItem.label}
                        </MenuItem>
                      ) : (
                        <SubMenu title={subItem.label} icon={getIcon(subItem.icon)}>
                          {/* Tercer nivel del menú */}
                          {subItem.items.map((subSubItem, subSubIndex) => (
                            <MenuItem
                              key={subSubIndex}
                              icon={getIcon(subSubItem.icon)}
                              onClick={() => handleContentChange(subSubItem.content)} // Cambia el contenido
                            >
                              {subSubItem.label}
                            </MenuItem>
                          ))}
                        </SubMenu>
                      )}
                    </React.Fragment>
                  ))}
                </SubMenu>
              )}
            </React.Fragment>
          ))}
        </Menu>
      </ProSidebar> 

      {/* Contenido principal */}
      <div className="flex-grow flex flex-col">
        {/* Header */}
        <header style={{ backgroundColor: '#1B3C6C' }} className="bg-blue-600 text-white p-4 flex justify-between items-center">
          <button
            className="text-white text-lg px-4 py-2 bg-blue-500 rounded hover:bg-blue-700"
            onClick={handleToggleSidebar} // Toggle de la barra lateral
          >
            {/* Icono de toggle */}
            <svg className="inline-block w-8 h-8 transition-colors duration-200 fill-current stroke-current text-[#166658] group-hover:text-red-600 group-hover:fill-[#189A2E]" width="20px" height="20px" viewBox="0 0 25.00 25.00" fill="none" xmlns="http://www.w3.org/2000/svg" 
                    transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier"> 
                        <path d="M19 3.32001H16C14.8954 3.32001 14 4.21544 14 5.32001V8.32001C14 9.42458 14.8954 10.32 16 10.32H19C20.1046 10.32 21 9.42458 21 8.32001V5.32001C21 4.21544 20.1046 3.32001 19 3.32001Z" stroke="#FFFFFF" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"></path> 
                        <path d="M8 3.32001H5C3.89543 3.32001 3 4.21544 3 5.32001V8.32001C3 9.42458 3.89543 10.32 5 10.32H8C9.10457 10.32 10 9.42458 10 8.32001V5.32001C10 4.21544 9.10457 3.32001 8 3.32001Z" stroke="#FFFFFF" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"></path> 
                        <path d="M19 14.32H16C14.8954 14.32 14 15.2154 14 16.32V19.32C14 20.4246 14.8954 21.32 16 21.32H19C20.1046 21.32 21 20.4246 21 19.32V16.32C21 15.2154 20.1046 14.32 19 14.32Z" stroke="#FFFFFF" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"></path> 
                        <path d="M8 14.32H5C3.89543 14.32 3 15.2154 3 16.32V19.32C3 20.4246 3.89543 21.32 5 21.32H8C9.10457 21.32 10 20.4246 10 19.32V16.32C10 15.2154 9.10457 14.32 8 14.32Z" stroke="#FFFFFF" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"></path> 
                    </g>
                </svg>
          </button>

          {/* Título con botón de toggle para el menú de configuración */}
          <div className="relative">
            <h3
              className="text-xl font-bold cursor-pointer"
              onClick={handleToggleDropdown} // Abrir/Cerrar el dropdown al hacer clic en NETTO
            >
              MUNIWEB
            </h3>

            {/* Menú desplegable */}
            {isDropdownOpen && (
              <div style={{zIndex:2000}} className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl z-50">
                <button
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                  onClick={() => console.log('Configuración')} // Acción para "Configuración"
                >
                  Configuración
                </button>
                <button
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                  onClick={handleLogout} // Ejecuta el logout
                >
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </header>
       
        <div className="items-center justify-between w-full h-full bg-white-100">
  {activeContent}
</div>





      </div>
    </div>
  );
};

export default Dashboard;
