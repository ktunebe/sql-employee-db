
const inquirer = require('inquirer')
const pool = require('../../db/dbConnection')
const runPrompt = require('../inquirer/prompt')

// Main prompt for what the user wants to do when starting the app
const initialQuestion = {
    type: 'list',
    message: 'What would you like to do?',
    name: 'initialPromptChoice',
    choices: [
        'View All Departments',
        'View All Roles',
        'View All Employees',
        'Add a Department',
        'Add a Role',
        'Add an Employee',
        'Update an Employee Role',
        'Exit'
    ]
}

// let employeeRoles = []
// let departments = []
// let managers = []

// Arrays for populating question choices







// Question arrays for additions
// New department
const newDepartmentQuestion = [
    {
        message: 'Enter name of new department:',
        name: 'newDepartmentName',
        validate: (input) => input !== ''
    },
]
// New role
// const newRoleQuestions = [
//     {
//         message: 'Enter new role name:',
//         name: 'newRoleName',
//         validate: (input) => input !== ''
//     },
//     {
//         message: 'Enter salary for new role:',
//         name: 'newRoleSalary',
//         validate: (input) => input !== ''
//     },
//     {
//         type: 'list',
//         message: 'Choose department for role:',
//         name: 'newRoleDepartment',
//         choices: departments
//     },
// ]





module.exports = {initialQuestion}