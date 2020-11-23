import axios from 'axios'

export const getAnecdotes = async () => {
    const res = await axios.get('http://localhost:3001/anecdotes')
    return res.data
}

export const createAnecdote = async (data) => {
    const res = await axios.post('http://localhost:3001/anecdotes', data)
    return res.data
}

export default {
    getAnecdotes,
    createAnecdote
}