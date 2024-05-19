// .env file configuration
require('dotenv').config()
// npm packages
const inquirer = require('inquirer')
// Using Pool from pg npm to set up connection to postgres
const pool = require('../../db/dbConnection')

const {getDepartmentsList, getManagersList, getRolesList} = require('../../db/getFromDb')
const {initialQuestion} = require('../questions/initialQuestion')
const {newEmployee} = require('../questions/addEmployee')
const {newRole} = require('../questions/addRole')
const {newDepartment} = require('../questions/addDepartment')
const {updateEmployeeRole} = require('../questions/updateEmployeeRole')
const {runPrompt} = require('./prompt')

const displayTable = async (table) => {
    const results = await pool.query(`SELECT * FROM ${table};`)
    const mappedResults = results.rows.map(row => ({...row}))
    console.table(mappedResults)
}

const inquiryChain = async () => {
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
        init()
    } else if (initialPromptChoice === 'Add a Role') {
        await newRole()
        init()
    } else if (initialPromptChoice === 'Add a Department') {
        await newDepartment()
        init()
    } else if (initialPromptChoice === 'Update an Employee Role') {
        await updateEmployeeRole()
        init()
    }
    else if (initialPromptChoice === 'Exit') {
        return
    }
}

async function init() {
    employeeRoles = await getRolesList()
    departments = await getDepartmentsList()
    managers = await getManagersList()
    await inquiryChain()
}

module.exports = {inquiryChain, init}