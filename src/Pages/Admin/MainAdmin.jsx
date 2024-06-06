import React, { useState, useEffect } from 'react';
import Sidebar from "../../Components/Dashboard/Sidebar";
import withAuth from "../../Components/withAuth.jsx";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "../../index.css"

function MainAdmin() {
  const [barChartData, setBarChartData] = useState(null);
  const [lineChartData, setLineChartData] = useState(null);

  useEffect(() => {
    // Dados para os gráficos de barras
    const barData = [
      { name: 'Janeiro', consultas: 12 },
      { name: 'Fevereiro', consultas: 19 },
      { name: 'Março', consultas: 3 },
      { name: 'Abril', consultas: 5 },
      { name: 'Maio', consultas: 2 },
      { name: 'Junho', consultas: 3 },
    ];

    // Dados para o gráfico de linha
    const lineData = [
      { name: 'Jan', consultas: 300 },
      { name: 'Fev', consultas: 50 },
      { name: 'Mar', consultas: 100 },
      { name: 'Abr', consultas: 40 },
      { name: 'Mai', consultas: 120 },
      { name: 'Jun', consultas: 30 },
    ];

    setBarChartData(barData);
    setLineChartData(lineData);
  }, []); // Executar apenas uma vez ao montar o componente

  return (
    <main className="flex flex-col md:flex-row">
      <Sidebar />
      <section className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div className="mb-8 border rounded-2xl shadow-2xl p-4 graph-container">
          <h2 className="text-xl font-semibold mb-4">Consultas por mês</h2>
          <div style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer>
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="consultas" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="border rounded-2xl shadow-2xl p-4 graph-container">
          <h2 className="text-xl font-semibold mb-4">Distribuição de pacientes</h2>
          <div style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer>
              <LineChart data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="consultas" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </main>
  );
}

export default withAuth(MainAdmin);
