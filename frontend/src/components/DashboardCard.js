import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './DashboardCard.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const DashboardCard = ({ title, value, percentage, icon }) => {
  return (
    <div className="dashboard-card">
      {icon && <div className="card-icon">{icon}</div>}
      <h3>{title}</h3>
      <p className="stat-number">{value}</p>
      {percentage !== undefined && (
        <p className="stat-percentage">{percentage}%</p>
      )}
    </div>
  );
};

const DashboardPieChart = ({vaccineName, registeredCount, vaccinatedCount }) => {
  const chartData = {
    title: `Vaccination Status for ${vaccineName}`,
    labels: ['Vaccinated', 'Not Vaccinated'],
    datasets: [
      {
        data: [vaccinatedCount, registeredCount - vaccinatedCount],
        backgroundColor: ['#304674', '#c6d3e3'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'bottom',
      }
    },
  };

  return (
    <div className="chart-container">
        <h2>{chartData.title}</h2>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export { DashboardCard, DashboardPieChart }; 