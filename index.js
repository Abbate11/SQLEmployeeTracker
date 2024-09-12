const { prompt } = require('inquirer');
const inquirer = require('inquirer')
const logo = require('asciiart-logo');
const db = require("./db");

init();

// Display logo text, load main prompts
function init() {
  const logoText = logo({ name: "Employee Tracker" }).render();

  console.log(logoText);

  loadMainPrompts();
}

function loadMainPrompts() {
  prompt([
    //  Create first question user will see- "What would you like to do?"
    {
      type: 'list',
      name: 'start',
      message: 'What would you like to do?',
      choices: [new inquirer.Separator('---View---'), 'View all departments', 'View all roles', 'View all employees', new inquirer.Separator('---Edit---'), 'Add a department', 'Add a role', 'Add an employee', new inquirer.Separator(), 'Quit']
    }
  ]).then((choice) => {
    //  Create a variable to store the user's choice
    const userChoice = choice.start
    //  Create a switch statement to call the appropriate function depending on what the user chose
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

//  Create a function to View all Employees
function viewAllEmployees() {
  db.findAllEmployees().then(({ rows }) => {
    let employees = rows;
    console.table(employees);
  }).then(() => {
    loadMainPrompts();
  })
};


//  Create a function to Update an employee's role
const updateEmployee = async () => {
  let { rows } = await db.findAllEmployees()
  const employees = rows.map(({ employee_id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: employee_id
  })) 
  let { roles } = await db.findAllRoles();
  const roleChoices = roles.map(({ role_id, title}) => ({
    name: role_id,
    value: title
  }))
  
  let { employee_id, update_item, update_info } = await prompt([
    {
      type: 'list',
      name: 'employee_id',
      messsage: `Which employee's role would you like to update`,
      choices: employees
    },
    {
      type: 'list',
      name: 'select',
      message: `Select the employee's new role`,
      choices: roles
    }
  ])
}

//  Create a function to View all roles
function viewAllRoles() {
  db.findAllRoles().then(({ rows }) => {
    let role = rows;
    console.table(role);
  }).then(() => {
    loadMainPrompts();
  })
};
//  Create a function to Add a role
const addRole = async () => {
  let { rows } = await db.findAllDepartments();
  const departments = rows.map(({ department_name, department_id }) => ({
    name: department_name,
    value: department_id
  }))
  let { newRole, newSalary, department } = await prompt([
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
  ])
  let { role } = await db.inputRole(newRole, newSalary, department);
  console.log('Role added')
  loadMainPrompts();
};

//  Create a function to View all deparments
function viewAllDepartments() {
  db.findAllDepartments().then(({ rows }) => {
    let departments = rows;
    console.table(departments);
  }).then(() => {
    loadMainPrompts();
  })
};
//  Create a function to Add a department
const addDepartment = async () => {
  let { newDepartment } = await prompt([
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


//  Create a function to Add an employee
const addEmployee = async () => {
  let { rows } = await db.findAllRoles();
  const roles = rows.map(({ title, role_id }) => ({
    name: title,
    value: role_id
  }))
  let { firstName, lastName, role} = await prompt([
    {
      type: 'input',
      name: 'firstName',
      message: 'What is the first name of your new Employee?'
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'What is the last name of your new Employee?'
    },
    {
      type: 'list',
      name: 'role',
      message: 'What role will the new employee be assigned?',
      choices: roles
    },
  ])
  let { employee } = await db.inputEmployee(firstName, lastName, role);
  console.log('Employee Added')
  loadMainPrompts();
};
// Exit the application
function quit() {
  console.log("Goodbye!");
  process.exit();
};