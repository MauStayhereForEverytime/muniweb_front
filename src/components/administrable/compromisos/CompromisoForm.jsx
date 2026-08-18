import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../components/items-style.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FormularioCompromiso = ({ onAddCompromiso, commitments }) => {
  const [newCompromisoValue, setNewCompromisoValue] = useState({
    cov_int_year: '',
    cov_double_projectedbudget: '',
    cov_double_budgetpercentage: '',
    cov_double_physicalgoalcomplete: '',
    com_int_id: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCompromisoValue(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCompromiso(newCompromisoValue);
    setNewCompromisoValue({
      cov_int_year: '',
      cov_double_projectedbudget: '',
      cov_double_budgetpercentage: '',
      cov_double_physicalgoalcomplete: '',
      com_int_id: '',
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white border-2 border-indigo-300 rounded-lg mt-8 shadow-lg">
      <h2 className="text-xl font-bold text-gray-800 text-center mb-4">Agregar Nuevo Compromiso</h2>
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        {/* Select de compromiso */}
        <select name="com_int_id" value={newCompromisoValue.com_int_id} onChange={handleChange} className="p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-600 bg-white text-gray-800 w-1/6">
          <option value="">Compromiso</option>
          {commitments.map(commitment => (
            <option key={commitment.com_int_id} value={commitment.com_int_id}>{commitment.com_txt_name}</option>
          ))}
        </select>

        {/* Inputs en la misma fila */}
        <input type="text" name="cov_int_year" value={newCompromisoValue.cov_int_year} onChange={handleChange} placeholder="Año" className="p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-600 w-1/6" />
        <input type="number" name="cov_double_projectedbudget" value={newCompromisoValue.cov_double_projectedbudget} onChange={handleChange} placeholder="Presupuesto" className="p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-600 w-1/6" />
        <input type="number" name="cov_double_budgetpercentage" value={newCompromisoValue.cov_double_budgetpercentage} onChange={handleChange} placeholder="% Presupuesto" className="p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-600 w-1/6" />
        <input type="number" name="cov_double_physicalgoalcomplete" value={newCompromisoValue.cov_double_physicalgoalcomplete} onChange={handleChange} placeholder="Meta Física" className="p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-600 w-1/6" />

        {/* Botón de agregar */}
        <button type="submit" className="bg-orange-600 text-white p-2 rounded-lg shadow-lg hover:bg-orange-700 w-1/6">Agregar</button>
      </form>
    </div>
  );
};

const TablaCompromiso = ({ compromisosValue, commitments, currentPage, setCurrentPage, itemsPerPage }) => {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = compromisosValue.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(compromisosValue.length / itemsPerPage);

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">

<h2 className="text-xl font-bold text-gray-800 text-center mb-4">Lista de Compromisos</h2>
      <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-orange-500 text-white">
            <th className="px-2 py-1 border">Compromiso</th>
            <th className="px-2 py-1 border">Año</th>
            <th className="px-2 py-1 border">Presupuesto</th>
            <th className="px-2 py-1 border">% Presupuesto</th>
            <th className="px-2 py-1 border">Meta Física</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(compromisoValue => (
            <tr key={compromisoValue.cov_int_id} className="text-center bg-gray-100 hover:bg-gray-300 transition">
              <td className="px-1 py-1 border">{commitments.find(c => c.com_int_id === compromisoValue.com_int_id)?.com_txt_name || 'N/A'}</td>
              <td className="px-1 py-1 border">{compromisoValue.cov_int_year}</td>
              <td className="px-1 py-1 border text-green-600 font-bold">{compromisoValue.cov_double_projectedbudget}</td>
              <td className="px-1 py-1 border text-orange-500">{compromisoValue.cov_double_budgetpercentage}%</td>
              <td className="px-1 py-1 border text-blue-500">{compromisoValue.cov_double_physicalgoalcomplete}%</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50">Anterior</button>
        <span className="px-4 py-2 mx-2 text-gray-700">Página {currentPage} de {totalPages}</span>
        <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50">Siguiente</button>
      </div>
    </div>
  );
};

const Compromiso = () => {
  const [compromisosValue, setCompromisosValue] = useState([]);
  const [commitments, setCommitments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(apiUrl + 'commitments/').then(response => setCommitments(response.data)).catch(error => console.error(error));
    axios.get(apiUrl + 'commitments_value/').then(response => setCompromisosValue(response.data)).catch(error => console.error(error));
  }, []);

  const addCompromiso = (newCompromiso) => {
    axios.post(apiUrl + 'commitments_value/', newCompromiso)
      .then(response => setCompromisosValue([...compromisosValue, response.data]))
      .catch(error => console.error(error));
  };

  return (
    <>
      <FormularioCompromiso onAddCompromiso={addCompromiso} commitments={commitments} />
      <TablaCompromiso compromisosValue={compromisosValue} commitments={commitments} currentPage={currentPage} setCurrentPage={setCurrentPage} itemsPerPage={itemsPerPage} />
    </>
  );
};

export default Compromiso;