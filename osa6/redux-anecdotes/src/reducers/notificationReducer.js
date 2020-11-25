
const initialState = {
    text: '',
    timer: 0
}

export const setNotification = (text, timeout) => {
    return async dispatch => {
        const timer = setTimeout(() => dispatch(removeNotification()), timeout)
        dispatch({
            type: 'SET_NOTIFICATION',
            data: {
                text,
                timer
            }
        })

    }
}

export const removeNotification = () => {
    return {
        type: 'REMOVE_NOTIFICATION'
    }
}

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case 'SET_NOTIFICATION':
            clearTimeout(state.timer)
            return action.data

        case 'REMOVE_NOTIFICATION':
            return {
                text: '',
                timer: -1
            }

        default:
            return state
    }

}

export default reducer