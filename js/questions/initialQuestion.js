const inquirer = require('inquirer')
const pool = require('../../db/dbConnection')

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
    ],
    loop: false
}

module.exports = {initialQuestion}