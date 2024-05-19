// .env file configuration
require('dotenv').config()
// Using Pool from pg npm to set up connection to postgres
const pool = require('../../db/dbConnection')

const {displayDepartmentsTable, displayRolesTable, displayEmployeesTable} = require('./displayTables')
const {getDepartmentsList, getManagersList, getRolesList} = require('../../db/getFromDb')
const {initialQuestion} = require('../inquirer/initialQuestion')
const {newEmployee} = require('../inquirer/addEmployee')
const {newRole} = require('../inquirer/addRole')
const {newDepartment} = require('../inquirer/addDepartment')
const {updateEmployeeRole} = require('../inquirer/updateEmployeeRole')
const {runPrompt} = require('../inquirer/prompt')

const inquiryChain = async () => {
    const {initialPromptChoice} = await runPrompt(initialQuestion)
    if (initialPromptChoice === 'View All Employees') {
        displayEmployeesTable()
        init()
    } else if (initialPromptChoice === 'View All Roles') {
        displayRolesTable()
        init()
    } else if (initialPromptChoice === 'View All Departments') {
        displayDepartmentsTable()
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