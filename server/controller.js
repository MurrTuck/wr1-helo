const bcrypt = require("bcrypt")

module.exports = {
    register: async (req, res) => {
        const { username, password } = req.body
        const db = req.app.get("db")


        const existingUser = await db.get_user(username)
        if (existingUser[0]) {
            return res.status(409).send("User already exists, gotta make tracks!")
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const newUser = await db.register_user([username, hash])
        delete newUser[0].hash
        // req.session.user = newUser[0]
        // return res.status(200).send(req.session.user)
    }
}
