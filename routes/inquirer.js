const inquirer = require('inquirer');
const queries = require('./queries');

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
          // Implement view all departments logic
          break;
        case 'View all roles':
          // Implement view all roles logic
          break;
        case 'View all employees':
          // Implement view all employees logic
          break;
        case 'Add a department':
          // Implement add a department logic
          break;
        case 'Add a role':
          // Implement add a role logic
          break;
        case 'Add an employee':
          // Implement add an employee logic
          break;
        case 'Update an employee role':
          // Implement update an employee role logic
          break;
        case 'Exit':
          console.log('Goodbye!');
          connection.end();
          process.exit();
      }
    });
}
