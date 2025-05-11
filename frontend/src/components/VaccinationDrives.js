import React, { useState, useEffect } from 'react';
import Menu from './Menu';
import './VaccinationDrives.css';

const VaccinationDrives = () => {
  useEffect(() => {
    document.title = 'Vaccination Portal - Manage Vaccination Drives';
  }, []);

  const [formData, setFormData] = useState({
    vaccine_name: '',
    date: '',
    numberVaccine: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
        // const response = await api.addStudent(formData);
        // setMessage(response.message);
      setFormData({
        vaccine_name: '',
        date: '',
        numberVaccine: ''
      });
  };
 
  return (
    <div className="manage-drives-container">
      <Menu/>
      <div className="content-section">
      <div className="form-section">
          <h2>Add Vaccination Drive</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Vaccination Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.vaccinationName}
                onChange={handleInputChange}
                required
              />
            </div>
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
    </div>
  );
};

export default VaccinationDrives; 