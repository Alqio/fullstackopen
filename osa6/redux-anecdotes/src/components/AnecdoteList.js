import React from 'react'
import {connect} from 'react-redux'
import {updateAnecdote} from "../reducers/anecdoteReducer";
import {setNotification} from "../reducers/notificationReducer";

const AnecdoteList = (props) => {

    const increaseVote = (id) => {
        const anecdote = props.anecdotes.find(a => a.id === id)
        props.updateAnecdote({
            ...anecdote,
            votes: anecdote.votes + 1
        })
        props.setNotification('you voted \'' + anecdote.content + '\'', 5000)
    }

    return (
        <div>
            {props.anecdotes.map(anecdote =>
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

const mapStateToProps = (state) => {
    const filter = state.filter
    const filtered = state.anecdotes.filter(a => a.content.includes(filter))
    return {
        anecdotes: filtered.sort((a, b) => b.votes - a.votes)
    }
}

const mapDispatchToProps = {
    updateAnecdote,
    setNotification
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default ConnectedAnecdoteList
