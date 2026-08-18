import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const BudgetChart = ({ compromisosValue }) => {

  const chartData = {
    labels: compromisosValue.map((item) => item.cov_int_year),  // Año como etiqueta
    datasets: [
      {
        label: 'Presupuesto Proyectado',
        data: compromisosValue.map((item) => item.cov_double_projectedbudget),  // Datos de presupuesto
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default BudgetChart;
