import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/blogs'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = async (blog, token) => {
    const config = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }
    const res = await axios.post(baseUrl, blog, config)

    return res.data

}

const update = async (blog, token) => {
    const config = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }
    const res = await axios.put(baseUrl + '/' + blog.id, blog, config)

    return res.data
}

const remove = async (blog, token) => {
    const config = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }
    const res = await axios.delete(baseUrl + '/' + blog.id, config)

    return res.data
}

export default { getAll, create, update, remove }