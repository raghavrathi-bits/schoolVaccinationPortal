import React, { useState, useEffect } from 'react';
import Menu from './Menu';
import { DashboardCard, DashboardPieChart } from './DashboardCard';
import VaccineSelector from './VaccineSelector';
import api from '../services/api';
import './Report.css';

const Report = () => {
  const [registeredStudents, setRegisteredStudents] = useState([]);
  const [vaccinatedStudents, setVaccinatedStudents] = useState([]);
  const [selectedVaccine, setSelectedVaccine] = useState('Tetanus TT-10');
  const [selectStatus, setSelectStatus] = useState('All');
  const [vaccines, setVaccines] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    document.title = 'Vaccination Portal - Reports';
    fetchRegisteredStudents(selectedVaccine);
    fetchVaccinatedStudents(selectedVaccine);
    fetchVaccines();
    fetchRegisteredVaccinatedStudents(selectedVaccine);
  }, [selectedVaccine]);

  const handleVaccineChange = e => {
    setSelectedVaccine(e.target.value);
  };

  const handleStatusChange = e => {
    setSelectStatus(e.target.value);
  };

  const fetchVaccines = async () => {
    try {
      const response = await api.getVaccines();
      const vaccineList = response.vaccine.map(
        vaccine => vaccine.vaccination_name
      );
      setVaccines(vaccineList);
      if (!selectedVaccine && vaccineList.length > 0) {
        setSelectedVaccine(vaccineList[0]);
      }
    } catch (error) {
      console.error('Error fetching Vaccines:', error);
      setVaccines([]);
    }
  };

  const fetchRegisteredVaccinatedStudents = async vaccineName => {
    try {
      const response = await api.getStudentsRegisterOrVaccinated(vaccineName);
      console.log('11');
      console.log(response.students);
      setStudents(response.students || []);
    } catch (error) {
      console.error('Error fetching students:', error);
      setStudents([]);
    }
  };

  const fetchRegisteredStudents = async vaccineName => {
    try {
      const response = await api.getRegisteredStudentsForVaccine(vaccineName);
      setRegisteredStudents(response.students || []);
    } catch (error) {
      console.error('Error fetching registered students:', error);
      setRegisteredStudents([]);
    }
  };

  const fetchVaccinatedStudents = async vaccineName => {
    try {
      const response = await api.getVaccinatedStudentsForVaccine(vaccineName);
      setVaccinatedStudents(response.students || []);
    } catch (error) {
      console.error('Error fetching vaccinated students:', error);
      setVaccinatedStudents([]);
    }
  };

  const registeredCount = registeredStudents.length;
  const vaccinatedCount = vaccinatedStudents.length;
  const vaccinationPercentage = Math.round(
    (vaccinatedCount / registeredCount) * 100
  );

  const filteredStudents = students.filter(student => {
    if (!student) return false;
    if (selectStatus === 'All') return student;
    const searchValue = selectStatus;
    return student.status?.includes(searchValue);
  });

  return (
    <div className="report-container">
      <Menu />
      <div className="report-section">
        <h2>Reports</h2>
        <VaccineSelector
          vaccines={vaccines}
          selectedVaccine={selectedVaccine}
          onVaccineChange={handleVaccineChange}
        />
        <div className="report-cards">
          <DashboardCard
            title={`Total Students registered for ${selectedVaccine}`}
            value={registeredCount}
            icon="👥"
          />
          <DashboardCard
            title={`Number of Students Vaccinated with ${selectedVaccine}`}
            value={vaccinatedCount}
            percentage={vaccinationPercentage}
            icon="💉"
          />
        </div>

        <DashboardPieChart
          registeredCount={registeredCount}
          vaccinatedCount={vaccinatedCount}
          vaccineName={selectedVaccine}
        />

        <div className="vaccine-status-section">
          <label htmlFor="vaccine-status">Vaccination Status:</label>
          <select
            id="vaccine-status"
            value={selectStatus}
            onChange={handleStatusChange}
            className="vaccine-select"
          >
            <option value="All">Select Status</option>
            <option value="Vaccinated">Vaccinated</option>
            <option value="Registered">Registered</option>
          </select>
        </div>

        <div className="students-list">
          <h2>Students List ({selectedVaccine})</h2>
          <table className="students-table">
            <thead>
              <tr role="row">
                <th role="columnheader">Name</th>
                <th role="columnheader">Vaccination Date</th>
                <th role="columnheader">Gender</th>
                <th role="columnheader">Age</th>
                <th role="columnheader">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(student => (
                <tr key={student.std_id} role="row">
                  <td role="cell">{student.student_name || 'N/A'}</td>
                  <td role="cell">{student.vaccination_date || 'N/A'}</td>
                  <td role="cell">{student.gender || 'N/A'}</td>
                  <td role="cell">{student.age || 'N/A'}</td>
                  <td role="cell">{student.status || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Report;
