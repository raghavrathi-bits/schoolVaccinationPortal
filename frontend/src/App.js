import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Home';
import ManageStudents from './components/ManageStudents';
import VaccinationDrives from './components/VaccinationDrives';
import Report from './components/Report'
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/manageStudents" element={<ManageStudents />} />
          <Route path="/manageDrives" element={<VaccinationDrives />}/>
          <Route path="/reports" element={<Report />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
