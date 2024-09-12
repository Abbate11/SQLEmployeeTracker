const pool = require("./connection");

class DB {
  constructor() {}

  async query(sql, args = []) {
    const client = await pool.connect();
    try {
      const result = await client.query(sql, args);
      return result;
    } finally {
      client.release();
    }
  }

  //  Create a query to Find all employees, join with roles and departments to display their roles, salaries, departments, and managers
  findAllEmployees() {
    return this.query('SELECT * FROM employees');
  }


  //  Create a query to Create a new employee
  inputEmployee(first_name, last_name, role_id) {
    return this.query(`INSERT INTO employees (first_name, last_name, role_id) VALUES ($1,$2, $3)`, [first_name, last_name, role_id]);
  }

  //  Create a query to Update the given employee's role
  updateEmployeeRole(first_name, last_name, role_id) {
    return this.query(`UPDATE employees set employee.role_id WHERE first_name = ()`)
  }

  //  Create a query to Find all roles, join with departments to display the department name
  findAllRoles() {
    return this.query('SELECT * FROM role');
  }
  //  Create a query to Create a new role
  inputRole(title, salary, department_id) {
    return this.query(`INSERT INTO role(title, salary, department_id) VALUES ($1, $2, $3)`, [title, salary, department_id]);
  }

  //  Create a query to Find all departments
  findAllDepartments() {
    return this.query('SELECT * FROM department');
  }
  

  //  Create a query to Create a new department
  inputDepartment(department_name) {
    return this.query(`INSERT INTO department(department_name) VALUES ($1)`, [department_name]);
  }
}

module.exports = new DB();