import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {updateAnecdote} from "../reducers/anecdoteReducer";
import {createNotification, removeNotification, setNotification} from "../reducers/notificationReducer";

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        const filter = state.filter
        const filtered = state.anecdotes.filter(a => a.content.includes(filter))
        return filtered.sort((a, b) => b.votes - a.votes)
    })
    const dispatch = useDispatch()

    const increaseVote = (id) => {
        const anecdote = anecdotes.find(a => a.id === id)
        dispatch(updateAnecdote({
            ...anecdote,
            votes: anecdote.votes + 1
        }))
        dispatch(setNotification('you voted \'' + anecdote.content + '\'', 5000))
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
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
        </div>
    )
}

export default AnecdoteList