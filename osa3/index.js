require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const PhoneNumber = require('./models/phonenumber');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('build'));

morgan.token('body', (req, res) => {
    return JSON.stringify(req.body);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));


app.get('/api/persons', async (req, res) => {
    const phoneNumbers = await PhoneNumber.find({});

    res.json(phoneNumbers);
});

app.get('/api/persons/:id', async (req, res, next) => {

    try {
        const person = await PhoneNumber.findById(req.params.id);

        if (person) {
            res.json(person);
        } else {
            res.status(404).end();
        }
    } catch (e) {
        next(e);
    }

});

app.delete('/api/persons/:id', async (req, res, next) => {
    try {
        await PhoneNumber.findByIdAndRemove(req.params.id);

        res.status(204).end();
    } catch (e) {
        next(e);
    }

});

app.post('/api/persons/', async (req, res, next) => {

    if (!req.body["name"]) {
        const e = {
            name: "MissingParameter",
            error:"name must be provided"
        }
        next(e)
        return;
    }
    if (!req.body["number"]) {
        const e = {
            name: "MissingParameter",
            error:"number must be provided"
        }
        next(e)
        return;
    }
    const name = req.body.name;
    const number = req.body.number;

    const phoneNumber = new PhoneNumber({
        name,
        number
    });

    await phoneNumber.save();

    res.json(phoneNumber);

});

app.get('/info', (req, res) => {
    console.log(req);
    const d = new Date();
    const s = "Phonebook has info for " + persons.length + "people";

    res.send(s + "<br><br>" + d);

});

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({error: 'malformatted id'})
    }
    if (error.name === "MissingParameter") {
        return response.status(400).send({error: error.error})
    }

    next(error)
}
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

// olemattomien osoitteiden käsittely
app.use(unknownEndpoint)

app.use(errorHandler)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});