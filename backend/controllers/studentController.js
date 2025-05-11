const User = require('../models/user').default;
const express = require('express');
const Students = require('../models/students');
const app = express();
app.use(express.json());

const studentController = {
  getAllStudents: async (req, res) => {
    try {
      const students = await Students.findAllStudents();
      res.json({
        message: 'Students fetched successfully',
        status: 200,
        students: students  
      });
    } catch (error) {
      console.error('Error fetching students:', error);
      res.status(500).json({
        error: 'An error occurred while fetching students'
      });
    }
  },
  getRegisteredVaccinatedStudents: async (req, res) => {
    try {
      const { vaccineName } = req.body;
      if (!vaccineName) {
        return res.status(400).json({
          error: 'vaccineName is required'
        });
      }
      const students = await Students.findRegisteredVaccinatedStudents(vaccineName);
      res.json({
        message: 'Students fetched successfully',
        status: 200,
        students: students,
        vaccineName: vaccineName
      });
    } catch (error) {
      console.error('Error fetching registered vaccinated students:', error);
      res.status(500).json({
        error: 'An error occurred while fetching registered vaccinated students'
      });
    }
  },
  addStudent: async (req, res) => {
    try {
      const { name, grade, gender, age } = req.body;
      const students = await Students.addStudent(name, grade, gender, age);
      res.json({
        message: 'Students added successfully',
        status: 201 
      });
    } catch (error) {
      console.error('Error adding students:', error);
      res.status(500).json({
        error: 'An error occurred while adding students'
      });
    }
  },
  updateStudent: async (req, res) => {
    try {
      const studentId = parseInt(req.params.id);
      const { name, grade, gender, age } = req.body;
      const students = await Students.updateStudent(studentId, name, grade, gender, age);
      res.json({
        message: 'Students updated successfully',
        status: 200
      });
    } catch (error) {
      console.error('Error updating students:', error);
      res.status(500).json({
        error: 'An error occurred while updating students'
      });
    }
  },
  getRegisteredStudentForVaccine: async (req, res) => {
    try {
      const { vaccineName } = req.body;
      const registeredStudents = await Students.findRegisteredStudentsForVaccine(vaccineName);
      res.json({
        message: 'Registered students fetched successfully',
        status: 200,
        students: registeredStudents
      });
    } catch (error) {
      console.error('Error fetching registered students:', error);
      res.status(500).json({
        error: 'An error occurred while fetching registered students'
      });
    }
  },
  getVaccinatedStudentForVaccine: async (req, res) => {
    try {
      const { vaccineName } = req.body;
      const vaccinatedStudents = await Students.findVaccinatedStudentsForVaccine(vaccineName);
      res.json({
        message: 'Vaccinated students fetched successfully',
        status: 200,
        students: vaccinatedStudents
      });
    } catch (error) {
      console.error('Error fetching vaccinated students:', error);
      res.status(500).json({
        error: 'An error occurred while fetching vaccinated students'
      });
    }
  }
};

module.exports = studentController;