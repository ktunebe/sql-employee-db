INSERT INTO departments (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO roles (title, department, salary)
VALUES
    ('Sales Lead', 1, 100000),
    ('Salesperson', 1, 80000),
    ('Lead Engineer', 2, 150000),
    ('Software Engineer', 2, 120000),
    ('Account Manager', 3, 160000),
    ('Accountant', 3, 125000),
    ('Legal Team Lead', 4, 250000),
    ('Lawyer', 4, 190000);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, NULL),
    ('Jane', 'Doe', 2, 1),
    ('Chester', 'TheDog', 3, NULL),
    ('Herbie', 'TheDog', 4, 3),
    ('Jim', 'Jones', 5, NULL),
    ('Sally', 'Smith', 6, 5),
    ('Betty', 'Boop', 7, NULL),
    ('Larry', 'Law', 8, 7);