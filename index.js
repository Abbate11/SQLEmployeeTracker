const { prompt } = require('inquirer');
const inquirer = require('inquirer')
const logo = require('asciiart-logo');
const db = require("./db");

init();

// Display logo text, load main prompts
function init() {
  const logoText = logo({ name: "City of Pawnee" }).render();

  console.log(logoText);

  loadMainPrompts();
}

function loadMainPrompts() {
  prompt([
    // TODO- Create first question user will see- "What would you like to do?"
    {
        type: 'list',
        name: 'start',
        message: 'What would you like to do?',
        choices: ['Quit', 'View all departments', 'View all roles', 'View all employees', new inquirer.Separator(), 'Add a department', 'Add a role', 'Add an employee']
    }
  ]).then((choice) => {
    // TODO- Create a variable to store the user's choice
    const userChoice = choice.start
    // TODO- Create a switch statement to call the appropriate function depending on what the user chose
    switch (userChoice) {
        case 'Quit': quit();
        break;
        case 'View all departments': viewAllDepartments();
        break;
        case 'View all roles': viewAllRoles();
        break;
        case 'View all employees': viewAllEmployees();
        break;
        case 'Add a department': addDepartment();
        break;
        case 'Add a role': addRole();
        break;
        case 'Add an employee': addEmployee();
        break;
    }
  });
}

// TODO- Create a function to View all Employees
function viewAllEmployees() {
    db.findAllEmployees().then(({rows}) => {
        let employees = rows;
        console.table(employees);
    })
}

// BONUS- Create a function to View all employees that belong to a department

// BONUS- Create a function to View all employees that report to a specific manager

// BONUS- Create a function to Delete an employee

// TODO- Create a function to Update an employee's role

// BONUS- Create a function to Update an employee's manager

// TODO- Create a function to View all roles
function viewAllRoles() {
    db.findAllRoles().then(({rows}) => {
        let role = rows;
        console.table(role);
    })
}
// TODO- Create a function to Add a role
const addRole = async () => {
  let { rows } = await findAllDepartments();
  const departments = rows.map(({department_name, department_id}) => ({
    name: department_name,
    value: department_id
  }))
  let {newRole, newSalary, department} = await prompt([
      {
        type: 'input',
        name: 'newRole',
        message: 'What is the new role called?'
      },
      {
        type: 'input',
        name: 'newSalary',
        message: 'What will the salary be for the new role?'
      },
      {
        type: 'list',
        name: 'department',
        message: 'What department does the new role belong to?',
        choices: departments
      }
  ]);
}
// BONUS- Create a function to Delete a role

// TODO- Create a function to View all deparments
function viewAllDepartments() {
    db.findAllDepartments().then(({rows}) => {
        let departments = rows;
        console.table(departments);
    })
}
// TODO- Create a function to Add a department
const addDepartment = async () => {
  let {newDepartment} = await prompt([
      {
        type: 'input',
        name: 'newDepartment',
        message: 'What would you like to call this new Department?'
      }
  ])
 let { rows } = await db.inputDepartment(newDepartment);
 console.log('Department added')
 loadMainPrompts();
};

// BONUS- Create a function to Delete a department

// BONUS- Create a function to View all departments and show their total utilized department budget

// TODO- Create a function to Add an employee

// Exit the application
function quit() {
  console.log("Goodbye!");
  process.exit();
}