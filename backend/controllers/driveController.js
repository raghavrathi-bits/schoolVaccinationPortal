const User = require('../models/user').default;
const express = require('express');
const Drives = require('../models/drives');
const app = express();
app.use(express.json());

const driveController = {
    addVaccineDrive: async (req, res) => {
        try {
          const { vaccineName, date, numberVaccine } = req.body;
          await Drives.addDrive(vaccineName, date, numberVaccine);
          res.json({
            message: 'Vaccination drive added successfully',
            status: 201
          });
        } catch (error) {
          console.error('Error fetching vaccine:', error);
          res.status(500).json({
            error: 'An error occurred while fetching vaccine'
          });
        }
      }
}


module.exports = driveController;