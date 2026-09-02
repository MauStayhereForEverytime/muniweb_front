import React from 'react';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Mensaje de bienvenida */}
      <h1>Bienvenido a tu Dashboard</h1>
      <p>En este espacio puedes gestionar tus imágenes y noticias de manera sencilla.</p>

      {/* Instrucciones para imágenes */}
      <section className="dashboard-section">
        <h2>Gestiona tus imágenes</h2>
        <p>
          Si deseas editar, agregar o eliminar imágenes, dirígete a la sección <strong>"Imágenes"</strong> y elige el
          módulo correspondiente que desees cambiar.
        </p>
      </section>

      {/* Estilos opcionales (puedes modificar o agregar clases CSS) */}
      <style>{`
        .dashboard-container {
          padding: 20px;
          background-color: #f4f4f9;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          max-width: 900px;
          margin: 20px auto;
        }
        .dashboard-section {
          margin-bottom: 20px;
        }
        h1 {
          color: #2b2d42;
        }
        h2 {
          color: #8d99ae;
        }
        p {
          font-size: 1.1rem;
          color: #4a4e69;
        }
        strong {
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
