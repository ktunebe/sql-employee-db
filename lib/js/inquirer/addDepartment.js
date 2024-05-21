require('dotenv').config()
const pool = require('../../db/dbConnection')
const {runPrompt} = require('./prompt')



const newDepartment = async () => {
    try {
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
            VALUES ($1);`, [newDepartmentName]
        )
    
        console.log('\nDepartment Added!\n')
    } catch (err) {
        console.error('Error: ', err)
    }
}

module.exports = {newDepartment}