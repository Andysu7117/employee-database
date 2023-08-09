INSERT INTO department (department_name) VALUES ('IT');
INSERT INTO department (department_name) VALUES ('Finance');
INSERT INTO department (department_name) VALUES ('Legal');
INSERT INTO department (department_name) VALUES ('Sales');

INSERT INTO role (title, salary, department_id) VALUES ('Sales Lead', 65000, 4);
INSERT INTO role (title, salary, department_id) VALUES ('Salesperson', 55000, 4);
INSERT INTO role (title, salary, department_id) VALUES ('Lead Engineer', 120000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Software Engineer', 100000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Accountant', 80000, 2);
INSERT INTO role (title, salary, department_id) VALUES ('Legal Team Lead', 110000, 3);
INSERT INTO role (title, salary, department_id) VALUES ('Lawyer', 90000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Kevin', 'Lin', 1, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('John', 'Doe', 3, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Mike', 'Chan', 5, NULL);