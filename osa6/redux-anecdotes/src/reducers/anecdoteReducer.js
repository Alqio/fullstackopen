import {getAnecdotes} from "../services/anecdotes";

const getId = () => (100000 * Math.random()).toFixed(0)

export const asObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0
    }
}

export const vote = (id) => {
    return {
        type: 'VOTE',
        data: id
    }
}

export const initAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await getAnecdotes()
        dispatch({
            type: 'INIT_ANECDOTES',
            data: anecdotes
        })
    }
}

export const createAnecdote = (anecdote) => {
    return {
        type: 'NEW',
        data: anecdote
    }
}

const initialState = []//anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
    console.log('state now: ', state)
    console.log('action', action)

    switch (action.type) {
        case 'VOTE':
            const anecdote = state.find(a => a.id === action.data)
            const newAnecdote = {
                ...anecdote,
                votes: anecdote.votes + 1
            }
            return state.map(a => a.id !== action.data ? a : newAnecdote)

        case 'NEW':
            return [...state, action.data]

        case 'INIT_ANECDOTES':
            return action.data

        default:
            return state
    }

}

export default reducer