const mysql = require('mysql2');
const cTable = require(`console.table`);

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'idontknow',
  database: 'employees_db', // Change to your database name
});

const queries = {
  getAllDepartments: () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM department';
      connection.query(sql, (error, results) => {
        if (error) reject(error);
        console.table(results);
      });
    });
  },

  getAllRoles: () => {
    return new Promise((resolve, reject) => {
      const sql =
        'SELECT role.title AS Title, role.salary AS Salary, department.name AS Department FROM role LEFT JOIN department on deparment..id = role.department_id';
      connection.query(sql, (error, results) => {
        if (error) reject(error);
        console.table(results);
      });
    });
  },

  getAllEmployees: () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM employee';
      connection.query(sql, (error, results) => {
        if (error) reject(error);
        console.table(results);
      });
    });
  },

  addDepartment: (name) => {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO department (name) VALUES (?)';
      connection.query(sql, [name], (error, result) => {
        if (error) reject(error);
        console.log('New Department added');
      });
    });
  },

  addRole: (title, salary, departmentId) => {
    return new Promise((resolve, reject) => {
      const sql =
        'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
      connection.query(sql, [title, salary, departmentId], (error, result) => {
        if (error) reject(error);
        console.log('New role added');
      });
    });
  },

  addEmployee: (firstName, lastName, roleId, managerId) => {
    return new Promise((resolve, reject) => {
      const sql =
        'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
      connection.query(
        sql,
        [firstName, lastName, roleId, managerId],
        (error, result) => {
          if (error) reject(error);
          console.log(
            firstName,
            '',
            lastName,
            'has been added to the database'
          );
        }
      );
    });
  },

  updateEmployeeRole: (employeeId, newRoleId) => {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE employee SET role_id = ? WHERE id = ?';
      connection.query(sql, [newRoleId, employeeId], (error, result) => {
        if (error) reject(error);
        console.log('Role has been updated');
      });
    });
  },
};

module.exports = queries;
