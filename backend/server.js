const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/db');
const authController = require('./controllers/authController');
const studentController = require('./controllers/studentController');
const vaccineController = require('./controllers/vaccineController');
const driveController = require('./controllers/driveController');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.post('/api/auth/login', authController.login);
app.get('/api/students', studentController.getAllStudents);
app.post('/api/registeredVaccinatedStudents', studentController.getRegisteredVaccinatedStudents)
app.post('/api/students', studentController.addStudent);
app.put('/api/students/:id', studentController.updateStudent)
app.post('/api/registeredStudents', studentController.getRegisteredStudentForVaccine);
app.post('/api/vaccinatedStudents', studentController.getVaccinatedStudentForVaccine);
app.get('/api/vaccines', vaccineController.getAllVaccine);
app.post('/api/drive', driveController.addVaccineDrive)


app.get('/api/version', async (req, res) => {
    res.json({ 
      name: 'School Vaccination Portal',  
      version: '1.0.0',
      timestamp: new Date().toISOString()
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 