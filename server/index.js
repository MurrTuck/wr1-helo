require('dotenv').config()
const express = require('express')
const app = express()
const authCtrl = require('./controller')
const massive = require('massive')
const session = require('express-session')
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env

app.use(express.json())
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}))

//Testing Session on port http://localhost:4000/session
// app.get('/session', (req, res) => {
//     if (!req.session.refreshCount) {
//         req.session.refreshCount = 1
//     } else {
//         req.session.refreshCount++
//     }

//     if (!req.session.requests) {
//         req.session.requests = [{ method: 'GET', endpoint: '/session', dateTime: new Date() }]
//     } else {
//         req.session.requests.push({ method: 'GET', endpoint: '/session', dateTime: new Date() })
//     }
//     req.session.showMeTheMoney = true
//     res.send(req.session)
// })

//endpoints
//auth endpoints
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.delete('/auth/logout', authCtrl.logout)


massive({
    connectionString: CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
}).then(dbInstance => {
    app.set('db', dbInstance)
    console.log(`DB Throwing High Heat`)
    app.listen(SERVER_PORT, () =>
        console.log(`Hitting Dingers on Port ${SERVER_PORT}`))
})

