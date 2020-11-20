import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {vote, createAnecdote} from "./reducers/anecdoteReducer";
import AnecdoteForm from "./components/AnecdoteForm";

const App = () => {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    const increaseVote = (id) => {
        dispatch(vote(id))
    }

    const addAnecdote = (event) => {
        event.preventDefault()

        const content = event.target.content.value
        dispatch(createAnecdote(content))
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => increaseVote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}

            <AnecdoteForm/>

        </div>
    )
}

export default App