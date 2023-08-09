const inquirer = require(`inquirer`);
const mysql = require(`mysql2`);
const queries = require('./db/queries');
const { query } = require('express');

function mainMenu() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Exit',
        ],
      },
    ])
    .then((answer) => {
      switch (answer.choice) {
        case 'View all departments':
          viewAllDepartments();
          break;
        case 'View all roles':
          viewAllRoles();
          break;
        case 'View all employees':
          viewAllEmployees();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Update an employee role':
          updateEmployeeRole();
          break;
        case 'Exit':
          console.log('Goodbye!');
          connection.end();
          process.exit();
      }
    });
}

const viewAllDepartments = () => {
  queries.getAllDepartments();
  mainMenu();
};

const viewAllRoles = () => {
  queries.getAllRoles();
  mainMenu();
};

const viewAllEmployees = () => {
  queries.getAllEmployees();
  mainMenu();
};

const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the department you would like to add?',
      },
    ])
    .then((answers) => {
      queries.addDepartment(answers.name);
      mainMenu();
    });
};

const addRole = () => {
  const departmentsArr = [];
  sql.query('SELECT department_name FROM departments', (err, results) => {
    for (let i = 0; i < results.length; i++) {
      departmentsArr.push(results[i].name);
    }
  });
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'title',
        message: 'What is the title of this role?',
      },
      {
        type: 'input',
        name: 'salary',
        message: 'What is the salary for this role?',
      },
      {
        type: 'list',
        name: 'department',
        choices: departmentsArr,
      },
    ])
    .then((answers) => {
      sql.query('SELECT id FROM departments WHERE name = ?', (err, depId) => {
        queries.addRole(answers.title, answers.salary, depId);
      });
      mainMenu();
    });
};

const addEmployee = () => {
  const rolesArr = [];
  sql.query('SELECT title FROM roles', (err, results) => {
    for (let i = 0; i < results.length; i++) {
      rolesArr.push(results[i].title);
    }
  });
  sql.query(
    'SELECT CONCAT (first_name, " ", last_name) FROM employees AS Name',
    (err, results) => {
      const employeesArr = [];
      employeesArr.push['None'];
      for (let i = 0; i < results.length; i++) {
        employeesArr.push(result[i]['CONCAT (first_name, " ", last_name)']);
      }
      inquirer
        .prompt([
          {
            type: `input`,
            name: `firstName`,
            message: `What is this employee's First Name?`,
          },
          {
            type: `input`,
            name: `lastName`,
            message: `What is this employee's Last Name?`,
          },
          {
            type: `list`,
            name: `role`,
            message: `What is this employee's role?`,
            choices: rolesArr,
          },
          {
            type: `list`,
            name: `manager`,
            message: `Who is this employee's manager?`,
            choices: employeesArr,
          },
        ])
        .then((answers) => {
          let managerName = '';
          if (answers.manager === 'None') {
            managerName = null;
          } else {
            managerName = results.manager;
          }
          sql.query(
            'SELECT id FROM roles WHERE title = ?',
            answers.role,
            (err, roleId) => {
              sql.query(
                'SELECT id FROM employees WHERE CONCAT (first_name," ",last_name) = ?',
                managerName,
                (err, managerId) => {
                  query.addEmployee(
                    results.firstName,
                    results.lastName,
                    roleId,
                    managerId
                  );
                }
              );
            }
          );
          mainMenu();
        });
    }
  );
};

const updateEmployeeRole = () => {
  const rolesArr = [];
  sql.query('SELECT title FROM roles', (err, results) => {
    for (let i = 0; i < results.length; i++) {
      rolesArr.push(results[i].title);
    }
  });
  sql.query(
    'SELECT CONCAT (first_name, " ", last_name) FROM employees AS Name',
    (err, results) => {
      const employeesArr = [];
      employeesArr.push['None'];
      for (let i = 0; i < results.length; i++) {
        employeesArr.push(result[i]['CONCAT (first_name, " ", last_name)']);
      }
      inquirer
        .prompt([
          {
            type: `list`,
            name: `employee`,
            message: `Which employee would you like to edit the role of?`,
            choices: employeesArr,
          },
          {
            type: `list`,
            name: `newRole`,
            message: `What is this employee's new position (role)?`,
            choices: rolesArr,
          },
        ])
        .then((answers) => {
          sql.query(
            'SELECT id FROM roles WHERE title = ?',
            answers.newRole,
            (err, roleId) => {
              sql.query(
                'SELECT id FROM employees WHERE CONCAT (first_name," ",last_name) = ?',
                employee,
                (err, employeeId) => {
                  query.addEmployee(
                    results.firstName,
                    results.lastName,
                    roleId,
                    employeeId
                  );
                }
              );
            }
          );
        });
      mainMenu();
    }
  );
};
