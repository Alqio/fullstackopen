const initialState = ''

export const setFilter = (text) => {
    return {
        type: 'SET_FILTER',
        data: text
    }
}


const reducer = (state = initialState, action) => {

    switch (action.type) {

        case 'SET_FILTER':
            return action.data

        default:
            return state
    }

}

export default reducer