
const initialState = anecdotesAtStart.map(asObject)

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

        default:
            return state
    }

}

export default reducer