require('dotenv').config()
const pool = require('./dbConnection')

// Get roles from db
const getRolesList = async () => {
    const roles = []
    const results = await pool.query(`SELECT title FROM roles`)
    results.rows.forEach(result => roles.push(result.title))
    return roles
}
// Get managers from db
const getManagersList = async () => {
    const managers = []
    const results = await pool.query(`SELECT first_name, last_name FROM employees WHERE manager_id IS NULL;`)
    results.rows.forEach(result => managers.push(`${result.first_name} ${result.last_name}`))
    managers.push('None')
    return managers
}
// Get departments from db
const getDepartmentsList = async () => {
    const departments = []
    const results = await pool.query(`SELECT name FROM departments`)
    results.rows.forEach(result => departments.push(result.name))
    return departments
}

module.exports = {getDepartmentsList, getManagersList, getRolesList}