// .env file configuration
require('dotenv').config()
// Using Pool from pg npm to set up connection to postgres
const pool = require('../../db/dbConnection')

// Display departments id and name
const displayDepartmentsTable = async () => {
    try {
        const results = await pool.query(`SELECT id AS "Dept ID", name AS "Dept Name" FROM departments;`)
        const mappedResults = results.rows.map(row => ({...row}))
        console.table(mappedResults)
    } catch (err) {
        console.error('Error executing query: ', err)
    }
}

// Display all roles id, name, and salary, and join with depts to show dept name instead of dept id. Used left join in case a dept is deleted, role will still show up if it still exists and has not been added to a new dept yet.
const displayRolesTable = async () => {
    try {
        const results = await pool.query(
            `SELECT roles.id AS "ID", title AS "Title", departments.name AS "Department", salary AS "Salary"
            FROM roles
            LEFT JOIN departments ON roles.department = departments.id;`
        )
        const mappedResults = results.rows.map(row => ({...row}))
        console.table(mappedResults)
    } catch (err) {
        console.error('Error executing query: ', err)
    }
}

// Display employee id and name, join roles to get title and salary, join departments to get department name, and then join employees to itself to get manager name from manager id. Used left join so that employees will show up even if their role or department doesn't currently exist
const displayEmployeesTable = async () => {
    try {
        const results = await pool.query(
            `SELECT e.id AS "ID", e.first_name AS "First Name", e.last_name AS "Last Name", 
                r.title AS "Title", d.name AS "Department" , r.salary AS "Salary", 
                COALESCE(m.first_name || ' ' || m.last_name, 'No Manager') AS "Manager"
            FROM employees e
            LEFT JOIN roles r ON e.role_id = r.id
            LEFT JOIN departments d ON r.department = d.id
            LEFT JOIN employees m ON e.manager_id = m.id;`
        )
        const mappedResults = results.rows.map(row => ({...row}))
        console.table(mappedResults)
    } catch (err) {
        console.error('Error executing query: ', err)
    }
}



module.exports = {displayDepartmentsTable, displayRolesTable, displayEmployeesTable}