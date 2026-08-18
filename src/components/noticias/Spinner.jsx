// Spinner.jsx
import React from 'react';
import './Spinner.css';  // Importamos el archivo de estilo para el spinner

const Spinner = () => {
  return (
    <div className="spinner-overlay">
      <div className="spinner"></div>
    </div>
  );
};

export default Spinner;
