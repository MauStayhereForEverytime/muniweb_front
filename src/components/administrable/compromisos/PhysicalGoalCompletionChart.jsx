import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import './grafic.css';

ChartJS.register(ArcElement, Title, Tooltip, Legend, CategoryScale, LinearScale);

const PhysicalGoalCompletionChart = () => {
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [commitments, setCommitments] = useState([]);
  const [years, setYears] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(apiUrl + 'commitments/')
      .then(res => res.json())
      .then(setCommitments)
      .catch(err => console.error('Error al cargar los compromisos:', err));

    fetch(apiUrl + 'commitments_value/')
      .then(res => res.json())
      .then(data => {
        const availableYears = [...new Set(data.map(item => item.cov_int_year))];
        setYears(availableYears);
        if (availableYears.length && !selectedYear) {
          setSelectedYear(availableYears[0].toString());
        }
      })
      .catch(err => console.error('Error al cargar los años:', err));
  }, []);

  useEffect(() => {
    if (selectedYear) fetchDataByYear(selectedYear);
  }, [selectedYear]);

  const fetchDataByYear = (year) => {
    fetch(`${apiUrl}commitments_value/?year=${year}`)
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error('Error al cargar los datos filtrados:', err));
  };

  const handleYearChange = (e) => setSelectedYear(e.target.value);

  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#6366F1', '#EC4899', '#8B5CF6', '#22D3EE', '#F97316', '#14B8A6'];
  const commitmentColors = data.map((_, idx) => colors[idx % colors.length]);

  const chartData = {
    labels: data.map(d => commitments.find(c => c.com_int_id === d.com_int_id)?.com_txt_name || 'Desconocido'),
    datasets: [
      {
        label: 'Meta Física Completada (%)',
        data: data.map(d => d.cov_double_physicalgoalcomplete),
        backgroundColor: commitmentColors,
        hoverOffset: 12,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: ({ label, formattedValue }) => `${label}: ${formattedValue}%`,
        },
      },
      legend: {
        position: 'bottom',
        labels: {
          color: '#4B5563',
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: `Meta Física Completada por año`,
        color: '#111827',
        font: {
          size: 16,
          weight: 'bold',
        },
        padding: {
          top: 6,
          bottom: 15,
        },
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 bg-white shadow-xl rounded-2xl border border-gray-200">
      <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
      Meta Física Completada por Año
      </h2>
      <div className="flex justify-center mb-6">
        <select
          id="yearSelect"
          value={selectedYear}
          onChange={handleYearChange}
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
        >
          <option value="">Seleccionar Año</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      
      {data.length > 0 ? (
  <div className="flex justify-center">
    <div className="w-full max-w-2xl">
      <Pie data={chartData} options={options} width={500} height={500} />
    </div>
  </div>
) : (
  <p className="text-center text-gray-500">No hay datos disponibles para el año seleccionado.</p>
)}

    </div>
  );
};

export default PhysicalGoalCompletionChart;
