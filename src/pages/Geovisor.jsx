import React from 'react';
import Header from '../components/Header';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const GeovisorPage = () => {
  const handleLogin = () => {
    localStorage.setItem('token', 'dummy-token');
    window.location.href = '/dashboard';
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header onLogin={handleLogin} />

      {/* Mapa con Leaflet */}
      <div className="flex-grow">
        <MapContainer 
          center={[51.505, -0.09]} 
          zoom={13} 
          style={{ width: '100%', height: '100%' }} // Mapa ocupa el 100% de la altura disponible
        >
          {/* Capa de mapa de OpenStreetMap */}
          <TileLayer 
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
          />
          {/* Un marcador en el mapa */}
          <Marker position={[51.505, -0.09]}>
            <Popup>
              ¡Hola! Este es un marcador en el mapa.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default GeovisorPage;
