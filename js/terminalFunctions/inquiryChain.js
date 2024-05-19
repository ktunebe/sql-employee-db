
const {displayDepartmentsTable, displayRolesTable, displayEmployeesTable} = require('./displayTables')
const {getDepartmentsList, getManagersList, getRolesList} = require('../../db/getFromDb')
const {initialQuestion} = require('../inquirer/initialQuestion')
const {newEmployee} = require('../inquirer/addEmployee')
const {newRole} = require('../inquirer/addRole')
const {newDepartment} = require('../inquirer/addDepartment')
const {updateEmployeeRole} = require('../inquirer/updateEmployeeRole')
const {runPrompt} = require('../inquirer/prompt')

const inquiryChain = async () => {
    try {
        // Run the initial prompt
        const {initialPromptChoice} = await runPrompt(initialQuestion)
        // Run next query function based on initial choice, then update db and ask initial question again
        if (initialPromptChoice === 'View All Employees') {
            await displayEmployeesTable()
            init()
        } else if (initialPromptChoice === 'View All Roles') {
            await displayRolesTable()
            init()
        } else if (initialPromptChoice === 'View All Departments') {
            await displayDepartmentsTable()
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
        // Select 'Exit' to end and return to CLI
        } else if (initialPromptChoice === 'Exit') {
            process.exit()
        }
    } catch (err) {
        console.error('Error: ', err)
    }
}

async function init() {
    // Update db and start the initial question
    employeeRoles = await getRolesList()
    departments = await getDepartmentsList()
    managers = await getManagersList()
    await inquiryChain()
}

module.exports = {inquiryChain, init}