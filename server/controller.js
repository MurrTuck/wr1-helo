const bcrypt = require("bcrypt")

module.exports = {
    register: async (req, res) => {
        const db = req.app.get("db")
        const { username, password } = req.body
        const usernameResult = await db.get_user(username)
        if (usernameResult[0]) {
            return res.status(409).send("Username taken")
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const user = await db.register_user([username, hash])
        delete user[0].hash
        req.session.user = user[0]
        return res.status(200).send(req.session.user)
    }
}


//Update Authentication

//Ended with Axios  - 
// Write a method in Auth that sends an axios request to the endpoint you just wrote.
// The axios request should take the username and password off of state and put them in the body of the request.
// Once the response comes back, navigate to the Dashboard view.
// Set up the 'Register' button to fire the method.