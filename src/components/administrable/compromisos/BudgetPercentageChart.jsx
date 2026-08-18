import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

// Registrar los elementos necesarios
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const BudgetPercentageChart = () => {
  const [data, setData] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  

  useEffect(() => {
    // Obtener los datos desde la API
    fetch(apiUrl+'commitments_value/')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.error('Error al cargar los datos:', error));
  }, []);

  if (data.length === 0) {
    return <div>Cargando datos...</div>;  // Mostrar algo mientras se cargan los datos
  }

  const chartData = {
    labels: data.map((item) => item.cov_int_year),  // Obtener los años
    datasets: [
      {
        label: 'Presupuesto %',
        data: data.map((item) => item.cov_double_budgetpercentage),  // Obtener el porcentaje de presupuesto
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Porcentaje de Presupuesto</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default BudgetPercentageChart;
