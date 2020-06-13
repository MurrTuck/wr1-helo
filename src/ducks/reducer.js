
const initialState = {
    username: '',
    userId: '',
    profilePic: ''
}

const UPDATE_USER = 'UPDATE_USER'

export function updateUser(userId, username, profilePic) {
    return {
        type: UPDATE_USER,
        payload: {
            userId,
            username,
            profilePic
        }
    }
}

export default function (state = initialState, action) {
    switch (action.type) {
        case UPDATE_USER:
            return { ...state, ...action.payload }
        default:
            return state
    }
}