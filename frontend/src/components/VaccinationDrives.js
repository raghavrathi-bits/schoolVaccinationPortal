import React, { useState, useEffect } from 'react';
import Menu from './Menu';
import './VaccinationDrives.css';
import api from '../services/api';
import VaccineSelector from './VaccineSelector';

const VaccinationDrives = () => {
  useEffect(() => {
    document.title = 'Vaccination Portal - Manage Vaccination Drives';
    fetchVaccines();
  }, []);

  const [formData, setFormData] = useState({
    vaccine_name: '',
    date: '',
    numberVaccine: '',
  });

  const handleVaccineChange = e => {
    setSelectedVaccine(e.target.value);
  };


  const [message, setMessage] = useState([]);
  const [selectedVaccine, setSelectedVaccine] = useState('Tetanus TT-10');
  const [vaccines, setVaccines] = useState([]);
  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
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

  const handleSubmit = async e => {
    e.preventDefault();
    formData.vaccine_name = selectedVaccine;
    const response = await api.addVaccinationDrive(formData);
    setMessage(response.message);
    setFormData({
      vaccine_name: '',
      date: '',
      numberVaccine: '',
    });
  };

  return (
    <div className="manage-drives-container">
      <Menu />
      <div className="drive-section">
        <h2>Add Vaccination Drive</h2>
        <div>{message}</div>
        <form onSubmit={handleSubmit}>
          <VaccineSelector
            vaccines={vaccines}
            selectedVaccine={selectedVaccine}
            onVaccineChange={handleVaccineChange}
            // {selected => {
            //   setFormData(prevState => ({
            //     ...prevState,
            //     vaccine_name: selected,
            //   }));
            //   setSelectedVaccine(selected);
            // }}
          />
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="availVaccine">Available Vaccines</label>
            <input
              type="text"
              id="numberVaccine"
              name="numberVaccine"
              value={formData.numberVaccine}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="submit-button">
              Add Vaccination Drive
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VaccinationDrives;
