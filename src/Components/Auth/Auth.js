import React, { Component } from 'react'
import axios from 'axios'




class Auth extends Component {
    constructor() {
        super()

        this.state = {
            username: '',
            password: ''
        }

    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    registerUser = () => {
        const { username, password } = this.state

        axios
            .post('/auth/register', { username, password })
            .then(res => {
                console.log("User has been registered", res.data)
                this.setState({
                    username: res.data.username,
                    password: ''
                })
                this.props.history.push('/dashboard')
            })
            .catch(err => {
                console.log(err)
                alert(err)
            })
    }



    render() {
        const { username, password } = this.state
        return (
            <div>
                <div>
                    Auth Component
                </div>
                <form>
                    <input
                        type='text'
                        name='username'
                        placeholder="username"
                        value={username}
                        onChange={e => this.changeHandler(e)}>
                    </input>
                    <input
                        type='password'
                        name='password'
                        placeholder="password"
                        value={password}
                        onChange={e => this.changeHandler(e)}>
                    </input>
                    <button>Login</button>
                    <button onClick={this.registerUser}>Register</button>
                </form>
            </div>
        )

    }
}

export default Auth