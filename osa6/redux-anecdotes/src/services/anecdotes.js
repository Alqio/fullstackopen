import axios from 'axios'

export const getAnecdotes = async () => {
    const res = await axios.get('http://localhost:3001/anecdotes')
    return res.data
}

export const createAnecdote = async (data) => {
    const res = await axios.post('http://localhost:3001/anecdotes', data)
    return res.data
}

export const updateAnecdote = async (data) => {
    const res = await axios.put('http://localhost:3001/anecdotes/' + data.id, data)
    return res.data
}

export default {
    getAnecdotes,
    createAnecdote,
    updateAnecdote
}