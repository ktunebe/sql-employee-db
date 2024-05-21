require('dotenv').config()
const pool = require('../../db/dbConnection')
const {runPrompt} = require('./prompt')
const {getDepartmentsList} = require('../../db/getFromDb')

const newRole = async () => {
    try {
        // Get departments from db
        const departments = await getDepartmentsList()
        
        // New role questions
        const newRoleQuestions = [
            {
                message: 'Enter new role title:',
                name: 'newRoleTitle',
                validate: (input) => input !== ''
            },
            {
                message: 'Enter salary for new role:',
                name: 'newRoleSalary',
                validate: (input) => {
                    if (isNaN(input) || input <= 0) {
                        return 'Please enter a valid number:'
                    }
                    return true
                }
            },
            {
                type: 'list',
                message: 'Choose department for role:',
                name: 'newRoleDepartment',
                choices: departments,
                loop: false
            },
        ]
    
        // Assign variables to question answers above
        const {
            newRoleTitle,
            newRoleSalary,
            newRoleDepartment
        } = await runPrompt(newRoleQuestions)
    
        // Find department name in database and use name to find the corresponding department id
        const foundDepartment = await pool.query(`SELECT id FROM departments WHERE name = $1;`, [newRoleDepartment])
        const departmentId = parseInt(foundDepartment.rows.map(row => row.id))
    
        // Convert salary string from answers into an integer for the DB
        const newRoleSalaryToInt = parseInt(newRoleSalary)
    
        // Add new role to db
        await pool.query(
            `INSERT INTO roles (title, salary, department)
            VALUES ($1, $2, $3);`, [newRoleTitle, newRoleSalaryToInt, departmentId]
        )
    
        console.log('\nNew Role Added!\n')

    } catch (err) {
        console.error('Error: ', err)
    }
}

module.exports = {newRole}