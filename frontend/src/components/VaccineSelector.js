import React from 'react';
import './VaccineSelector.css';

const VaccineSelector = ({ vaccines, selectedVaccine, onVaccineChange }) => {
  return (
    <div className="vaccine-selector">
      <label htmlFor="vaccine-select">Select Vaccine:</label>
      <select 
        id="vaccine-select" 
        value={selectedVaccine} 
        onChange={onVaccineChange}
        className="vaccine-select"
      >
        {vaccines.map((vaccine) => (
          <option key={vaccine} value={vaccine}>
            {vaccine}
          </option>
        ))}
      </select>
    </div>
  );
};

export default VaccineSelector; 