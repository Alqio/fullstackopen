const errorHandler = (error, request, response, next) => {

    if (error.name === 'CastError') {
        return response.status(400).send({error: 'malformatted id'})
    } else if (error.name === 'MissingParameter') {
        return response.status(400).send({error: error.error})
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({error: error.message})
    } else if (error.name === 'MongoError') {
        return response.status(400).json({error: error.message})
    } else if (error.name === 'Unauthorized') {
        return response.status(401).json({error: error.message})
    }

    next(error)
}

module.exports = errorHandler