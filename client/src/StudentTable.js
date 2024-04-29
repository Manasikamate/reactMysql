// components/StudentTable.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    PRN: '',
    name: '',
    branch: '',
    year_of_studying: '',
  });

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/users');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    fetchData();
  };

  const handleInsert = async () => {
    try {
      await axios.post('http://localhost:8081/users', formData);
      alert('Student data inserted successfully');
      fetchData();
      setFormData({
        id: '',
        PRN: '',
        name: '',
        branch: '',
        year_of_studying: '',
      });
    } catch (error) {
      console.error('Error inserting student data:', error);
      alert('Error inserting student data');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/users/${id}`);
      alert('Student data deleted successfully');
      fetchData();
    } catch (error) {
      console.error('Error deleting student data:', error);
      alert('Error deleting student data');
    }
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:8081/users/${id}`, formData);
      alert('Student data updated successfully');
      fetchData();
      setFormData({
        id: '',
        PRN: '',
        name: '',
        branch: '',
        year_of_studying: '',
      });
    } catch (error) {
      console.error('Error updating student data:', error);
      alert('Error updating student data');
    }
  };

  return (
    <div>
      <h2>Student Table</h2>
      <button onClick={handleRefresh}>Refresh</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>PRN</th>
            <th>Name</th>
            <th>Branch</th>
            <th>Year of Studying</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.id}</td>
              <td>{student.PRN}</td>
              <td>{student.name}</td>
              <td>{student.branch}</td>
              <td>{student.year_of_studying}</td>
              <td>
                <button onClick={() => handleDelete(student.id)}>Delete</button>
                <button onClick={() => setFormData(student)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>Insert Student</h2>
        <form onSubmit={handleInsert}>
          <label>
            ID:
            <input type="number" name="id" value={formData.id} onChange={(e) => setFormData({ ...formData, id: e.target.value })} />
          </label>
          <br />
          <label>
            PRN:
            <input type="number" name="PRN" value={formData.PRN} onChange={(e) => setFormData({ ...formData, PRN: e.target.value })} />
          </label>
          <br />
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          </label>
          <br />
          <label>
            Branch:
            <input type="text" name="branch" value={formData.branch} onChange={(e) => setFormData({ ...formData, branch: e.target.value })} />
          </label>
          <br />
          <label>
            Year of Studying:
            <input type="text" name="year_of_studying" value={formData.year_of_studying} onChange={(e) => setFormData({ ...formData, year_of_studying: e.target.value })} />
          </label>
          <br />
          <button type="submit">Insert</button>
        </form>
      </div>
    </div>
  );
};

export default StudentTable;
