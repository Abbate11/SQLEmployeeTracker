const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
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
        type: 'choices',
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

}

// BONUS- Create a function to View all employees that belong to a department

// BONUS- Create a function to View all employees that report to a specific manager

// BONUS- Create a function to Delete an employee

// TODO- Create a function to Update an employee's role

// BONUS- Create a function to Update an employee's manager

// TODO- Create a function to View all roles

// TODO- Create a function to Add a role

// BONUS- Create a function to Delete a role

// TODO- Create a function to View all deparments
function viewAllDepartments() {
    
}
// TODO- Create a function to Add a department

// BONUS- Create a function to Delete a department

// BONUS- Create a function to View all departments and show their total utilized department budget

// TODO- Create a function to Add an employee

// Exit the application
function quit() {
  console.log("Goodbye!");
  process.exit();
}