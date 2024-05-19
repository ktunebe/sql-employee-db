// .env file configuration
require('dotenv').config()

// Using Pool from pg npm to set up connection to postgres
const pool = require('./db/dbConnection')
// Setting up express server
const express = require('express')
// Init function will run entire program
const {init} = require('./js/inquirer/inquiryChain')

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())



// app.listen(PORT, () => console.log(`Movie API running on PORT ${PORT}`))

init()




