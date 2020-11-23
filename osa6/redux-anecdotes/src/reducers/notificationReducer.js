const initialState = ''

export const createNotification = (text) => {
    return {
        type: 'SET_NOTIFICATION',
        data: text
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
            return action.data

        case 'REMOVE_NOTIFICATION':
            return ''

        default:
            return state
    }

}

export default reducer