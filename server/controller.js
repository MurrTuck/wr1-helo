const bcrypt = require("bcrypt")

module.exports = {
    register: async (req, res) => {
        console.log("POST REGISTER endpoint hit")
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
        req.session.user = newUser[0]
        return res.status(200).send(req.session.user)
    },

    login: async (req, res) => {
        console.log("POST LOGIN endpoint hit")
        const { username, password } = req.body
        const db = req.app.get("db")

        const existingUser = await db.get_user(username)

        if (!existingUser[0]) {
            return res.status(404).send('User does not exist')
        }

        const authenticated = bcrypt.compareSync(password, existingUser[0].hash)
        if (!authenticated) {
            return res.status(403).send('Email or password is incorrect')
        }



        // if (authenticated) {
        //     req.session.user = {
        //         userId: existingUser[0].user_id
        //     }
        //     res.status(200).send(req.session.user)
        // } else {
        //     return res.status(403).send('Email or password is incorrect')
        // }

        delete existingUser[0].hash

        req.session.user = existingUser[0]

        res.status(200).send(req.session)

    },

    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    },

    getUser: (req, res) => {
        if (req.session.user) {
            res.status(200).send(req.session.user)
        } else {
            res.sendStatus(404)
        }
    }
}
