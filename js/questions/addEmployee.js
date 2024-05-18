require('dotenv').config()
const pool = require('../../db/dbConnection')
const runPrompt = require('../inquirer/prompt')
const {getManagersList, getRolesList} = require('../../db/getFromDb')





const newEmployee = async () => {
    const employeeRoles = await getRolesList()
    const managers = await getManagersList()
    // New employee questions
    const newEmployeeQuestions = [
        {
            message: 'Enter first name:',
            name: 'newEmployeeFirstName',
            validate: (input) => input !== ''
        },
        {
            message: 'Enter last name:',
            name: 'newEmployeeLastName',
            validate: (input) => input !== ''
        },
        {
            type: 'list',
            message: 'Choose employee role:',
            name: 'newEmployeeRole',
            choices: employeeRoles
        },
        {
            type: 'list',
            message: 'Choose employee manager:',
            name: 'newEmployeeManager',
            choices: managers
        },
    ]

    const {
        newEmployeeFirstName, 
        newEmployeeLastName, 
        newEmployeeRole, 
        newEmployeeManager
    } = await runPrompt(newEmployeeQuestions)
    
    const foundRole = await pool.query(`SELECT id FROM roles WHERE title = '${newEmployeeRole}';`)
    const roleId = parseInt(foundRole.rows.map(row => row.id))

    if (newEmployeeManager === 'None') {
        managerId = 'NULL'
    } else {
        const splitName =  newEmployeeManager.split(' ');
        const foundManagerId = await pool.query
            (
            `SELECT id FROM employees WHERE first_name = $1 AND last_name = $2;`, splitName
            )
        managerId = parseInt(foundManagerId.rows.map(row => row.id))
    }

    await pool.query(
        `INSERT INTO employees (first_name, last_name, role_id, manager_id)
        VALUES ('${newEmployeeFirstName}', '${newEmployeeLastName}', ${roleId}, ${managerId});`
    )

    console.log('New Employee Added!')
}

module.exports = {newEmployee}