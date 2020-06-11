import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'



class Nav extends Component {
    // constructor() {
    //     super()

    // }


    render() {
        // console.log('Redux Props', this.props)
        return (
            <div>
                Nav

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
        profile_pic: state.profilePic
    }
}

export default connect(mapStateToProps)(Nav)