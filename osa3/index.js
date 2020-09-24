const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('build'));

morgan.token('body', (req, res) => {
    return JSON.stringify(req.body);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    }
];

app.get('/api/persons', (req, res) => {
    res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    console.log(id);
    const person = persons.find(person => person.id === id);
    if (person) {
        res.json(person);
    } else {
        res.status(404);
        res.send("Person not found");
    }
});

app.delete('/api/persons/:id', (req, res) => {
    persons = persons.filter(person => person.id !== Number(req.params.id));
    res.send("Deleted " + req.params.id);
});

app.post('/api/persons/', (req, res) => {
    const id = Math.floor(Math.random() * (9000000 - 10 + 1)) + 10;

    if (!req.body["name"]) {
        res.status(400);
        res.json({error: "name must be provided"});
        return;
    }
    if (!req.body["number"]) {
        res.status(400);
        res.json({error: "number must be provided"});
        return;
    }
    const name = req.body.name;
    const number = req.body.number;

    if (persons.find(person => person.name === name)) {
        res.status(400);
        res.json({error: "name must be unique"});
        return;
    }

    const person = {
        id, name, number
    };
    persons.push(person);

    res.json(person);

});

app.get('/info', (req, res) => {
    console.log(req);
    const d = new Date();
    const s = "Phonebook has info for " + persons.length + "people";

    res.send(s + "<br><br>" + d);

});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});