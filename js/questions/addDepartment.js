require('dotenv').config()
const pool = require('../../db/dbConnection')
const {runPrompt} = require('../inquirer/prompt')



const newDepartment = async () => {
    // Ask for new department name
    const newDepartmentQuestion = {
        message: 'Enter name of new department:',
        name: 'newDepartmentName',
        validate: (input) => input !== ''
    }

    const {newDepartmentName} = await runPrompt(newDepartmentQuestion)

    // Add new department to db
    await pool.query(
        `INSERT INTO departments (name)
        VALUES ('${newDepartmentName}');`
    )

    console.log('\nDepartment Added!\n')
}

module.exports = {newDepartment}