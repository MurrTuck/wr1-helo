import React, { Component } from 'react'



class Auth extends Component {
    constructor() {
        super()

        this.state = {
            username: '',
            password: ''
        }

    }


    render() {
        return (
            <div>
                Auth
                <input placeholder="username"></input>
                <input placeholder="password"></input>
                <button>Login</button>
                <button>Register</button>
            </div>
        )

    }
}

export default Auth