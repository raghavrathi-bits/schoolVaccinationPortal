// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

const getHeaders = () => {
  return {
    'Content-Type': 'application/json'
  };
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Something went wrong');
  }
  return response.json();
};

const api = {
  login: async (username, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ username, password })
      });
      return handleResponse(response);
    } catch (error) {
      throw new Error(error.error || 'Login failed');
    }
  },

  getStudents: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/students`, {
        method: 'GET',
        headers: getHeaders()
      });
      return handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch students');
    }
  },

  getStudentsRegisterOrVaccinated: async (vaccineName) =>{
    try {
      const response = await fetch(`${API_BASE_URL}/registeredVaccinatedStudents`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ vaccineName })
      });
      return handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch students');
    }
  },

  addStudent: async (studentData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/students`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(studentData)
      });
      return handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to add student');
    }
  },

  updateStudent: async (id, studentData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/students/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(studentData)
      });
      return handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to update student');
    }
  },

  deleteStudent: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/students/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      return handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to delete student');
    }
  },

  getRegisteredStudentsForVaccine: async (vaccineName) => {
    try {
      const response = await fetch(`${API_BASE_URL}/registeredStudents`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ vaccineName })
      });
      return handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch registered students');
    }
  },

  getVaccinatedStudentsForVaccine: async (vaccineName) => {
    try {
      const response = await fetch(`${API_BASE_URL}/vaccinatedStudents`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ vaccineName })
      });
      return handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch vaccinated students');
    }
  },
  
  getVaccines: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/vaccines`, {
        method: 'GET',
        headers: getHeaders()
      });
      return handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch vaccines');
    }
  }
};

export default api; 