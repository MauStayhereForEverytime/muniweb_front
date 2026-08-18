import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './style.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BudgetChart from '../components/administrable/compromisos/BudgetChart';
import BudgetPercentageChart from '../components/administrable/compromisos/BudgetPercentageChart';
import PhysicalGoalCompletionChart from '../components/administrable/compromisos/PhysicalGoalCompletionChart';

const Compromiso = () => {
  const [compromisosValue, setCompromisosValue] = useState([]);
  const [commitments, setCommitments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(apiUrl+'commitments/')
      .then((response) => setCommitments(response.data))
      .catch((error) => console.error('Error al cargar los compromisos:', error));

    axios.get(apiUrl+'commitments_value/')
      .then((response) => setCompromisosValue(response.data))
      .catch((error) => console.error('Error al cargar los valores de compromisos:', error));
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = compromisosValue.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(compromisosValue.length / itemsPerPage);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col pt-10 md:pt-28">
      <Header />
      <div className="container w-[90%] sm:w-[80%] mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-4">Compromisos</h1>
        <div className="overflow-x-auto pb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 grid-rows-3 sm:grid-rows-2 gap-8 pb-10 sm:pb-20">
            <div className="w-full sm:w-[90%] mx-auto h-auto">
              <BudgetPercentageChart compromisosValue={compromisosValue} />
            </div>
            <div className="w-full sm:row-span-2 sm:w-[90%]">
              <PhysicalGoalCompletionChart compromisosValue={compromisosValue} commitments={commitments} />
            </div>
            <div className="w-full sm:w-[90%] mx-auto h-auto">
              <BudgetChart compromisosValue={compromisosValue} />
            </div>
          </div>

          <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-orange-500 text-white">
                <th className="px-6 py-3 border"></th>
                <th className="px-6 py-3 border">Año</th>
                <th className="px-6 py-3 border">Presupuesto Ejecutado</th>
                <th className="px-6 py-3 border">Presupuesto %</th>
                <th className="px-6 py-3 border">Meta Física Completada</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((compromisoValue, index) => (
                <tr
                  key={compromisoValue.cov_int_id}
                  className={`text-center ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-gray-400 transition-colors`}
                >
                  <td className="px-6 py-3 border font-semibold text-gray-700">
                    {commitments.find(c => c.com_int_id === compromisoValue.com_int_id)?.com_txt_name || 'N/A'}
                  </td>
                  <td className="px-6 py-3 border text-gray-600">{compromisoValue.cov_int_year}</td>
                  <td className="px-6 py-3 border text-green-600 font-bold">{compromisoValue.cov_double_projectedbudget}</td>
                  <td className="px-6 py-3 border text-orange-500 font-medium">{compromisoValue.cov_double_budgetpercentage}%</td>
                  <td className="px-6 py-3 border text-blue-500 font-medium">{compromisoValue.cov_double_physicalgoalcomplete}%</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-4">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
              disabled={currentPage === 1}
              className="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50"
            >
              Anterior
            </button>
            <span className="px-4 py-2 mx-2 text-gray-700">Página {currentPage} de {totalPages}</span>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
              disabled={currentPage === totalPages}
              className="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50"
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Compromiso;
