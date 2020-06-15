import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { updateUser } from '../../ducks/reducer'




class Auth extends Component {
    constructor() {
        super()

        this.state = {
            username: '',
            password: ''
        }

    }

    changeHandler = (e) => {
        // console.log('ChangeHandler Hit')
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
                const { userId, username, profilePic } = res.data
                this.setState({
                    username: res.data.username,
                    password: ''
                })
                this.props.updateUser(userId, username, profilePic)
                this.props.history.push('/dashboard')
            })
            .catch(err => {
                console.log('Registering Error on Auth.js')
                alert(err)
            })
    }

    loginUser = () => {
        console.log('Login Button Hit')
        const { username, password } = this.state
        axios
            .post('/auth/login', { username, password })
            .then(res => {
                console.log("User has been logged in", res.data)
                const { userId, username, profilePic } = res.data
                this.setState({
                    username: res.data.username,
                    password: ''
                })
                this.props.updateUser(userId, username, profilePic)
                this.props.history.push('/dashboard')
            })
            .catch(err => {
                console.log('Could not login - Error on Login Auth.js')
                alert(err)
            })
    }



    render() {
        const { username, password } = this.state
        // console.log('This is State', this.state)
        return (
            <div>
                <div>
                    Auth Component
                </div>
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
                <button onClick={this.loginUser}>Login</button>
                <button onClick={this.registerUser}>Register</button>
            </div>
        )

    }
}

//Fixing Redux
const mapStateToProps = state => state

export default connect(mapStateToProps, { updateUser })(Auth)