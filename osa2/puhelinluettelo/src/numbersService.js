import axios from 'axios'
const baseUrl = '/api/persons';
//https://serene-coast-84877.herokuapp.com

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data)
};

const create = newObject => {
    const request = axios.post(baseUrl, newObject);
    return request.then(response => response.data)
};

const deleteNumber = id => {
    const request = axios.delete(baseUrl + '/' + id);
    return request.then(response => response.data)
};

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    return request.then(response => response.data)
};

export default {
    getAll,
    create,
    update,
    deleteNumber
}