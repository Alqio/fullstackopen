import React from 'react'
import {connect} from 'react-redux'
import {createAnecdote} from "../reducers/anecdoteReducer";

const AnecdoteForm = (props) => {

    const addAnecdote = async (event) => {
        event.preventDefault()

        const content = event.target.content.value
        props.createAnecdote(content)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name='content'/></div>
                <button>create</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = {
    createAnecdote
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)
