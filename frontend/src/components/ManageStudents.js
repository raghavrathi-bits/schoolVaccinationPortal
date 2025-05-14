import React, { useState, useEffect } from 'react';
import Menu from './Menu';
import './ManageStudents.css';
import api from '../services/api';

const ManageStudents = () => {
  useEffect(() => {
    document.title = 'Vaccination Portal - Manage Students';
    fetchStudents();
  }, []);

  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    student_name: '',
    grade: '',
    age: '',
    gender: '',
  });
  const [message, setMessage] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('name');
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const fetchStudents = async () => {
    try {
      const response = await api.getStudents();
      console.log(response.students);
      setStudents(response.students || []);
    } catch (error) {
      console.error('Error fetching students:', error);
      setStudents([]);
    }
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Update existing student
        console.log(editingId);
        await api.updateStudent(editingId, formData);
        await fetchStudents();
        setIsEditing(false);
        setEditingId(null);
      } else {
        // Add new student
        const response = await api.addStudent(formData);
        setMessage(response.message);
        await fetchStudents();
      }
      setFormData({
        student_name: '',
        grade: '',
        age: '',
        gender: '',
      });
    } catch (error) {
      console.error('Error saving student:', error);
    }
  };

  const handleEdit = student => {
    setFormData(student);
    setIsEditing(true);
    setEditingId(student.std_id);
  };

  const handleDelete = async id => {
    try {
      await api.deleteStudent(id);
      await fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const filteredStudents = students.filter(student => {
    if (!student) return false;
    const searchValue = searchTerm.toLowerCase();
    switch (searchBy) {
      case 'name':
        return student.student_name?.toLowerCase().includes(searchValue);
      case 'grade':
        return student.grade?.toLowerCase().includes(searchValue);
      default:
        return true;
    }
  });

  return (
    <div className="manage-students-container">
      <Menu />
      <div className="student-section">
        <div className="student-form-section">
          <h2>{isEditing ? 'Edit Student' : 'Add New Student'}</h2>
          <div>{message}</div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Student Name</label>
              <input
                type="text"
                id="name"
                name="student_name"
                value={formData.student_name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="grade">Grade</label>
              <input
                type="text"
                id="grade"
                name="grade"
                value={formData.grade}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input
                type="text"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
                className="form-select"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="form-actions">
              <button type="submit" className="submit-button">
                {isEditing ? 'Update Student' : 'Add Student'}
              </button>
              {isEditing && (
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => {
                    setIsEditing(false);
                    setEditingId(null);
                    setFormData({
                      student_name: '',
                      grade: '',
                      age: '',
                      gender: '',
                    });
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="student-search-section">
          <h2>Search Students</h2>
          <div className="search-controls">
            <select
              value={searchBy}
              onChange={e => setSearchBy(e.target.value)}
              className="search-select"
            >
              <option value="name">Name</option>
              <option value="grade">Grade</option>
            </select>
            <input
              type="text"
              placeholder={`Search by ${searchBy}...`}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="students-list">
          <h2>Students List</h2>
          {filteredStudents.length === 0 ? (
            <div className="no-results-message">
              {searchTerm
                ? 'No students found matching your search criteria.'
                : 'No students found.'}
            </div>
          ) : (
            <table className="students-table">
              <thead>
                <tr role="row">
                  <th role="columnheader">Name</th>
                  <th role="columnheader">Grade</th>
                  <th role="columnheader">Gender</th>
                  <th role="columnheader">Age</th>
                  <th role="columnheader">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map(student => (
                  <tr key={student.std_id} role="row">
                    <td role="cell">{student.student_name || 'N/A'}</td>
                    <td role="cell">{student.grade || 'N/A'}</td>
                    <td role="cell">{student.gender || 'N/A'}</td>
                    <td role="cell">{student.age || 'N/A'}</td>
                    <td role="cell">
                      <button
                        className="edit-button"
                        onClick={() => handleEdit(student)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(student.std_id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageStudents;
