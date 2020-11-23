const initialState = 'notification'

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case 'NOTIFICATION':
            return {
                ...state,
                notification: action.data
            }

        default:
            return state
    }

}

export default reducer