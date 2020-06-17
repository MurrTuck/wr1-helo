import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateUser } from '../../ducks/reducer'
import axios from 'axios'



class Nav extends Component {


    componentDidMount() {
        axios
            .get('auth/user')
            .then(res => {
                const { userId, username, profilePic } = res.data
                this.props.updateUser(userId, username, profilePic)
            })
            .catch((err) => {
                console.log(err)
                // this.props.history.push('/')
            })
    }


    render() {
        console.log('Redux Props', this.props)
        const { profilePic, username } = this.props
        return (
            <div>
                <h1>{username}</h1>
                <h1>{profilePic}</h1>
                <Link to='/dashboard'>
                    <button>Home</button>
                </Link>
                <Link to='/new'>
                    <button>New Post</button>
                </Link>
                <Link to='/'>
                    <button>Logout</button>
                </Link>

            </div>
        )

    }
}

const mapStateToProps = (state) => {
    return {
        username: state.username,
        profilePic: state.profilePic
    }
}

// const mapStateToProps = state => state

export default connect(mapStateToProps, { updateUser })(Nav)