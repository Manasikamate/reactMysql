const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'MySQL@!#23', // Corrected typo in 'password'
  database: 'student' // Corrected typo in 'database'
});

app.get('/', (req, res) => {
  return res.json("from backend side");
});

app.get('/users', (req, res) => { // Changed endpoint from '/user' to '/users' to match axios request
  const sql = "SELECT * FROM stud";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post('/users', (req, res) => { // Added POST endpoint to handle form submission
  const { id, PRN, name, branch, year_of_studying } = req.body;
  const sql = `INSERT INTO stud (id, PRN, name, branch, year_of_studying) VALUES (${id}, ${PRN}, '${name}', '${branch}', '${year_of_studying}')`;
  db.query(sql, (err, result) => {
    if (err) return res.json(err);
    return res.json({ message: 'Student data submitted successfully' });
  });
});

app.listen(8081, () => {
  console.log('Connection successful');
});
