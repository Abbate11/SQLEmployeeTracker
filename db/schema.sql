-- Drop the database if it exists
DROP DATABASE IF EXISTS employees;

-- Create the new database
CREATE DATABASE employees;

-- Connect to the database
\c employees

-- TODO- write an SQL command to Create the department table
CREATE TABLE department (
    department_id SERIAL PRIMARY KEY,
    name VARCHAR(40) NOT NULL
);

-- TODO- write an SQL command to Create the role table
CREATE TABLE role (
    role_id SERIAL PRIMARY KEY,
    title VARCHAR(40) NOT NULL,
    salary INTEGER NOT NULL,
    department_id INTEGER NOT NULL,
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(department_id)
);
-- TODO- write an SQL command to Create the employee table
CREATE TABLE employees (
    employee_id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(role_id) ON DELETE CASCADE,
    manager_id INTEGER,
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employees(employee_id) ON DELETE SET NULL
);