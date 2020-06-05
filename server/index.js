require('dotenv').config()
const express = require('express')
const app = express()
const controller = require('./controller')
const massive = require('massive')
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env

app.use(express.json())

//endpoints

massive({
    connectionString: CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
}).then(dbInstance => {
    app.set('db', dbInstance)
    console.log(`DB Throwing High Heat`)
    app.listen(SERVER_PORT, () =>
        console.log(`Hitting Dingers on Port ${SERVER_PORT}`))
})

