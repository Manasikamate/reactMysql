// StudentForm.js
import React, { useState } from 'react';
import axios from 'axios';

const StudentForm = () => {
  const [formData, setFormData] = useState({
    id: '',
    PRN: '',
    name: '',
    branch: '',
    year_of_studying: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8081/users', formData);
      alert('Student data submitted successfully');
    } catch (error) {
      console.error('Error submitting student data:', error);
      alert('Error submitting student data');
    }
  };

  return (
    <div>
      <h2>Student Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          ID:
          <input type="number" name="id" value={formData.id} onChange={handleChange} />
        </label>
        <br />
        <label>
          PRN:
          <input type="number" name="PRN" value={formData.PRN} onChange={handleChange} />
        </label>
        <br />
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <br />
        <label>
          Branch:
          <input type="text" name="branch" value={formData.branch} onChange={handleChange} />
        </label>
        <br />
        <label>
          Year of Studying:
          <input type="text" name="year_of_studying" value={formData.year_of_studying} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default StudentForm;
