const express = require('express');
const mysql = require('mysql12');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: 'idontknow',
    database: 'employees_db',
  },
  console.log(`Connected to the employees_db database.`)
);

app.use((req, res) => {
  res.status(404).end();
});
