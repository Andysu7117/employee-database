const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'idontknow',
  database: 'employees_db',
});

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
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM department';
    connection.query(sql, (error, results) => {
      if (error) reject(error);
      console.table(results);
      mainMenu();
    });
  });
};

const viewAllRoles = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM role';
    connection.query(sql, (error, results) => {
      if (error) reject(error);
      console.table(results);
      mainMenu();
    });
  });
};

const viewAllEmployees = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM employee';
    connection.query(sql, (error, results) => {
      if (error) reject(error);
      console.table(results);
      mainMenu();
    });
  });
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
      const sql = 'INSERT INTO department (department_name) VALUES (?)';
      connection.query(sql, [answers.name], (error, result) => {
        if (error) throw error;
        console.log('New Department added');
        mainMenu();
      });
    });
};

const addRole = () => {
  const departmentsArr = [];
  connection.query('SELECT department_name FROM department', (err, results) => {
    if (err) throw err;
    for (let i = 0; i < results.length; i++) {
      departmentsArr.push(results[i].department_name);
    }

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
          message: 'What department is this role in?',
          choices: departmentsArr,
        },
      ])
      .then((answers) => {
        connection.query(
          'SELECT id FROM department WHERE department_name = ?',
          answers.department,
          (err, depId) => {
            if (err) throw err;
            const sql =
              'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
            connection.query(
              sql,
              [answers.title, answers.salary, depId[0].id],
              (error, result) => {
                if (error) throw error;
                console.log('New role added');
                mainMenu();
              }
            );
          }
        );
      });
  });
};

const addEmployee = () => {
  const rolesArr = [];
  connection.query('SELECT title FROM role', (err, results) => {
    if (err) throw err;
    for (let i = 0; i < results.length; i++) {
      rolesArr.push(results[i].title);
    }
  });
  connection.query(
    'SELECT CONCAT (first_name, " ", last_name) FROM employee AS Name',
    (err, results) => {
      if (err) throw err;
      const employeesArr = [];
      employeesArr.push('None');
      for (let i = 0; i < results.length; i++) {
        employeesArr.push(results[i]['CONCAT (first_name, " ", last_name)']);
      }
      return new Promise((resolve, reject) => {
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
            let managerId = null;
            if (answers.manager !== 'None') {
              const managerFullName = answers.manager.split(' ');
              connection.query(
                'SELECT id FROM employee WHERE first_name = ? AND last_name = ?',
                [managerFullName[0], managerFullName[1]],
                (err, managerResult) => {
                  if (err) throw err;
                  managerId = managerResult[0].id;

                  connection.query(
                    'SELECT id FROM role WHERE title = ?',
                    answers.role,
                    (err, roleResult) => {
                      if (err) throw err;
                      const sql =
                        'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
                      connection.query(
                        sql,
                        [
                          answers.firstName,
                          answers.lastName,
                          roleResult[0].id,
                          managerId,
                        ],
                        (error, result) => {
                          if (error) throw error;
                          console.log(
                            `${answers.firstName} ${answers.lastName} has been added to the database`
                          );
                          mainMenu();
                        }
                      );
                    }
                  );
                }
              );
            } else {
              connection.query(
                'SELECT id FROM role WHERE title = ?',
                answers.role,
                (err, roleResult) => {
                  if (err) throw err;
                  const sql =
                    'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
                  connection.query(
                    sql,
                    [
                      answers.firstName,
                      answers.lastName,
                      roleResult[0].id,
                      managerId,
                    ],
                    (error, result) => {
                      if (error) throw error;
                      console.log(
                        `${answers.firstName} ${answers.lastName} has been added to the database`
                      );
                      mainMenu();
                    }
                  );
                }
              );
            }
          });
      });
    }
  );
};

const updateEmployeeRole = () => {
  const rolesArr = [];
  connection.query('SELECT title FROM role', (err, results) => {
    if (err) throw err;
    for (let i = 0; i < results.length; i++) {
      rolesArr.push(results[i].title);
    }

    connection.query(
      'SELECT CONCAT (first_name, " ", last_name) AS Name FROM employee',
      (err, results) => {
        if (err) throw err;
        const employeesArr = [];
        employeesArr.push('None');
        for (let i = 0; i < results.length; i++) {
          employeesArr.push(results[i].Name);
        }

        inquirer
          .prompt([
            {
              type: 'list',
              name: 'employee',
              message: 'Which employee would you like to edit the role of?',
              choices: employeesArr,
            },
            {
              type: 'list',
              name: 'newRole',
              message: "What is this employee's new position (role)?",
              choices: rolesArr,
            },
          ])
          .then((answers) => {
            connection.query(
              'SELECT id FROM role WHERE title = ?',
              answers.newRole,
              (err, roleResult) => {
                if (err) throw err;
                const employeeFullName = answers.employee.split(' ');
                connection.query(
                  'SELECT id FROM employee WHERE first_name = ? AND last_name = ?',
                  [employeeFullName[0], employeeFullName[1]],
                  (err, employeeResult) => {
                    if (err) throw err;
                    const sql = 'UPDATE employee SET role_id = ? WHERE id = ?';
                    connection.query(
                      sql,
                      [roleResult[0].id, employeeResult[0].id],
                      (error, result) => {
                        if (error) throw error;
                        console.log('Role has been updated');
                        mainMenu();
                      }
                    );
                  }
                );
              }
            );
          });
      }
    );
  });
};

mainMenu();
