import anecdoteService from "../services/anecdotes";

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
        const anecdotes = await anecdoteService.getAnecdotes()
        dispatch({
            type: 'INIT_ANECDOTES',
            data: anecdotes
        })
    }
}

export const createAnecdote = (content) => {
    return async dispatch => {
        const anecdote = asObject(content)
        const created = await anecdoteService.createAnecdote(anecdote)
        dispatch({
            type: 'NEW',
            data: created
        })
    }
}

export const updateAnecdote = (anecdote) => {
    return async dispatch => {
        const updated = await anecdoteService.updateAnecdote(anecdote)
        dispatch({
            type: 'VOTE',
            data: updated
        })
    }
}

const initialState = []

const reducer = (state = initialState, action) => {
    console.log('state now: ', state)
    console.log('action', action)

    switch (action.type) {
        case 'VOTE':
            const id = action.data.id
            return state.map(anecdote => anecdote.id !== id ? anecdote : action.data)

        case 'NEW':
            return [...state, action.data]

        case 'INIT_ANECDOTES':
            return action.data

        default:
            return state
    }

}

export default reducer