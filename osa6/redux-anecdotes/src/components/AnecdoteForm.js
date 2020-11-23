import React from 'react'
import {useDispatch} from 'react-redux'
import {asObject, createAnecdote} from "../reducers/anecdoteReducer";
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()

        const content = event.target.content.value
        const newAnecdote = asObject(content)
        const created = await anecdoteService.createAnecdote(newAnecdote)
        dispatch(createAnecdote(created))
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

export default AnecdoteForm