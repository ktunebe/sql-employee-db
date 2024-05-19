require('dotenv').config()
const pool = require('../../db/dbConnection')
const {runPrompt} = require('../inquirer/prompt')
const {getEmployeeNames, getRolesList} = require('../../db/getFromDb')

const updateEmployeeRole = async () => {
    const employeeNames = await getEmployeeNames()
    const employeeRoles = await getRolesList()
    // Ask for employee and new role
    const updateQuestions = [
        {
            type: 'list',
            message: 'Select employee to update:',
            name: 'employeeName',
            choices: employeeNames,
            loop: false
        },
        {
            type: 'list',
            message: 'Select new role for employee:',
            name: 'updatedRole',
            choices: employeeRoles,
            loop: false
        },
    ]

    const {employeeName, updatedRole} = await runPrompt(updateQuestions)

    // Find role title in db and get the correpsonding role id
    const foundRole = await pool.query(`SELECT id FROM roles WHERE title = '${updatedRole}';`)
    const updatedRoleId = parseInt(foundRole.rows.map(row => row.id))
    // Split the first an last names into an array, then find the id of the employee whose names match
    const splitName =  employeeName.split(' ');
    const foundEmployeeId = await pool.query
        (
        `SELECT id FROM employees WHERE first_name = $1 AND last_name = $2;`, splitName
        )
    employeeId = parseInt(foundEmployeeId.rows.map(row => row.id))

    // Update employee role in db
    await pool.query(
        `UPDATE employees SET role_id = ${updatedRoleId}
        WHERE id = ${employeeId};`
    )

    console.log('\nEmployee Updated!\n')
}

module.exports = {updateEmployeeRole}