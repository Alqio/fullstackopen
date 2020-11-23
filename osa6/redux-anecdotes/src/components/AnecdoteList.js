import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {vote} from "../reducers/anecdoteReducer";
import {createNotification, removeNotification} from "../reducers/notificationReducer";

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes.sort((a, b) => b.votes - a.votes))
    const dispatch = useDispatch()

    const increaseVote = (id) => {
        dispatch(vote(id))

        const anecdote = anecdotes.find(a => a.id === id)
        dispatch(createNotification('you voted \'' + anecdote.content + '\''))
        setTimeout(() => dispatch(removeNotification()), 5000)
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