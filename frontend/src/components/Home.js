import React, { useEffect, useState } from 'react';
import Menu from './Menu';
import './Home.css';
import { DashboardCard, DashboardPieChart } from './DashboardCard';
import VaccineSelector from './VaccineSelector';
import api from '../services/api';

const Dashboard = () => {
  const [registeredStudents, setRegisteredStudents] = useState([]);
  const [vaccinatedStudents, setVaccinatedStudents] = useState([]);
  const [selectedVaccine, setSelectedVaccine] = useState('Tetanus TT-10');
  const [vaccines, setVaccines] = useState([]);

  useEffect(() => {
    document.title = 'Vaccination Portal - Dashboard';
    fetchRegisteredStudents(selectedVaccine);
    fetchVaccinatedStudents(selectedVaccine);
  }, []);


  const fetchRegisteredStudents = async () => {
    try {
      const response = await api.getRegisteredStudentsForVaccine('All');
      console.log("Registered students:", response.students);
      setRegisteredStudents(response.students || []);
    } catch (error) {
      console.error('Error fetching registered students:', error);
      setRegisteredStudents([]);
    }
  };

  const fetchVaccinatedStudents = async () => {
    try {
      const response = await api.getVaccinatedStudentsForVaccine('All');
      console.log("Vaccinated students:", response.students);
      setVaccinatedStudents(response.students || []);
    } catch (error) {
      console.error('Error fetching vaccinated students:', error);
      setVaccinatedStudents([]);
    }
  };
  // Calculate statistics
  const registeredCount = registeredStudents.length;
  const vaccinatedCount = vaccinatedStudents.length;
  const vaccinationPercentage = Math.round((vaccinatedCount / registeredCount) * 100);

  return (
    <div className="dashboard-container">
      <Menu />
      <div className="dashboard-section">
        <h2>Dashboard</h2>
        <div className="dashboard-cards">
          <DashboardCard
            title={`Total Registration for Vaccine`}
            value={registeredCount}
            icon="👥"
          />
          <DashboardCard
            title={`Number of Students Vaccinated`}
            value={vaccinatedCount}
            percentage={vaccinationPercentage}
            icon="💉"
          />
        </div>
        
        <div className="upcoming-drives">
          <h3>Upcoming Vaccination Drives</h3>
          <div className="drives-list">
            <div className="drive-card">
              <p className="drive-date">2024-05-15</p>
              <p className="drive-vaccine">{selectedVaccine}</p>
              <p className="drive-location">School Auditorium</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 