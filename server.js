// .env file configuration
require('dotenv').config()
// npm packages
const inquirer = require('inquirer')
// Using Pool from pg npm to set up connection to postgres
const pool = require('./db/dbConnection')
// Setting up express server
const express = require('express')
const {initialQuestion} = require('./js/questions/questionsMain')
const {newEmployee} = require('./js/questions/addEmployee')
const {getDepartmentsList, getManagersList, getRolesList} = require('./db/getFromDb')
const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())




const runPrompt = async (questions) => {
    try {
        const answers = await inquirer.prompt(questions);
        console.log(answers);
        return answers;
    } catch (error) {
        console.error('Error during prompting:', error);
    }
}




const displayTable = async (table) => {
    const results = await pool.query(`SELECT * FROM ${table};`)
    const mappedResults = results.rows.map(row => ({...row}))
    console.table(mappedResults)
}


const results = async () => {
    const {initialPromptChoice} = await runPrompt(initialQuestion)
    if (initialPromptChoice === 'View All Employees') {
        displayTable('employees')
        init()
    } else if (initialPromptChoice === 'View All Roles') {
        displayTable('roles')
        init()
    } else if (initialPromptChoice === 'View All Departments') {
        displayTable('departments')
        init()
    } else if (initialPromptChoice === 'Add an Employee') {
        await newEmployee()
    }
    else if (initialPromptChoice === 'Exit') {
        return
    }
}


// app.listen(PORT, () => console.log(`Movie API running on PORT ${PORT}`))
async function init() {
    employeeRoles = await getRolesList()
    departments = await getDepartmentsList()
    managers = await getManagersList()
    // await runPrompt(initialQuestion)
    await results()
}
init()


