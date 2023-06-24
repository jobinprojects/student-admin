const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const connection = mysql.createConnection({
  host: 'localhost', // Replace with your MySQL host
  user: 'root', // Replace with your MySQL username
  password: '123456', // Replace with your MySQL password
  database: 'stu_database', // Replace with your MySQL database name
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// API endpoints
app.post('/api/students', (req, res) => {
  const { enrollmentNo, fullName, email, mobile, year, paymentMode, amount } = req.body;

  const sql = 'INSERT INTO students (enrollmentNo, fullName, email, mobile, year, paymentMode, amount) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const values = [enrollmentNo, fullName, email, mobile, year, paymentMode, amount];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting student data:', err);
      res.status(500).json({ error: 'An error occurred while inserting student data.' });
    } else {
      console.log('Student data inserted:', result);
      res.status(200).json({ message: 'Student data inserted successfully.' });
    }
  });
});

app.get('/api/students', (req, res) => {
  const sql = 'SELECT * FROM students';

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching student data:', err);
      res.status(500).json({ error: 'An error occurred while fetching student data.' });
    } else {
      console.log('Fetched student data:', results);
      res.status(200).json(results);
    }
  });
});

// Start the server
const port = 3001; // You can change the port if needed
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
