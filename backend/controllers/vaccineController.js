const User = require('../models/user').default;
const express = require('express');
const Vaccine = require('../models/vaccines');
const app = express();
app.use(express.json());

const vaccineController = {
    getAllVaccine: async (req, res) => {
        try {
          const vaccine = await Vaccine.findAllVaccine();
          res.json({
            message: 'Vaccines fetched successfully',
            status: 200,
            vaccine: vaccine  
          });
        } catch (error) {
          console.error('Error fetching vaccine:', error);
          res.status(500).json({
            error: 'An error occurred while fetching vaccine'
          });
        }
      }
}


module.exports = vaccineController;