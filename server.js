require('dotenv').config()

const pool = require('./db/dbConnection')
const express = require('express')

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())

const getEmployeeData = async () => {
    const results = await pool.query(`SELECT * FROM employees`)
    const mappedResults = results.rows.map(row => {
        return row
    })
    console.table(mappedResults)
}

getEmployeeData()