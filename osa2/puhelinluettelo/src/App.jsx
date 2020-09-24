import React, {useState, useEffect} from 'react'
import numbersService from './numbersService'

const App = () => {
    const [persons, setPersons] = useState([]);

    useEffect(() => {
        numbersService.getAll()
            .then(data => {
                setPersons(data)
            })
    }, []);

    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [newFilter, setNewFilter] = useState('');
    const [message, setMessage] = useState(null);
    const [color, setColor] = useState("green");

    const handlePersonChange = (event) => {
        setNewName(event.target.value);
    };
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    };
    const handleFilterChange = (event) => {
        setNewFilter(event.target.value);
    };

    const filteredPersons = () => persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()));

    const deleteNumber = id => {

        const person = persons.find(p => p.id === id);

        const del = window.confirm("Poistetaanko " + person.name + "?");

        if (del) {

            const name = person.name;

            numbersService
                .deleteNumber(id)
                .then(data => {
                    const newPersons = persons.filter(p => p.id !== id);
                    setPersons(newPersons);
                    createMessage("green", "Poistettiin " + name + " kannasta");
                })
                .catch(error => {
                    createMessage("red", `Henkilöä ei enää löydy kannasta`);
                    console.log(error);
                    numbersService
                        .getAll()
                        .then(data => {
                            setPersons(data)
                        });
                });

        }

    };

    const clearMessage = () => setTimeout(() => setMessage(null), 3500);

    const createMessage = (c, m) => {
        setColor(c);
        setMessage(m);
        clearMessage();
    };

    const addPerson = (event) => {
        event.preventDefault();
        if (persons.find(person => person.name === newName)) {
            //alert(newName + " on jo luettelossa.");
            const replace = window.confirm(`${newName} on jo luettelossa, korvataanko vanha numero?`);
            if (replace) {
                const oldPerson = persons.find(person => person.name === newName);
                const updatedPerson = {...oldPerson, number: newNumber};
                numbersService
                    .update(oldPerson.id, updatedPerson)
                    .then(data => {
                        setPersons(persons.map(per => per.id !== oldPerson.id ? per : data));
                        createMessage("green", "Muutettiin henkilön " + oldPerson.name + " numero");
                    })
                    .catch(error => {
                        createMessage("red", `Henkilöä ei enää löydy kannasta`);
                        console.log(error);
                        numbersService
                            .getAll()
                            .then(data => {
                                setPersons(data)
                            });
                    });

            }

        } else {
            const person = {
                name: newName,
                number: newNumber
            };
            numbersService.create(person).then(data => {
                setPersons(persons.concat(data));
                //setNewName('');
                createMessage("green", "Lisättiin " + person.name + " onnistuneesti kantaan");
            });
        }
    };

    const numbers = () => filteredPersons().map(person => <Person name={person.name} number={person.number}
                                                                  key={person.name}
                                                                  deleteNumber={() => deleteNumber(person.id)}/>);


    return (
        <div>
            <h2>Puhelinluettelo</h2>
            <Notification message={message} color={color}/>
            <h4>Lisää uusi</h4>

            <PersonForm addPerson={addPerson} handleNumberChange={handleNumberChange}
                        handlePersonChange={handlePersonChange}/>
            <br></br>
            <Filter handleFilterChange={handleFilterChange}/>

            <h2>Numerot</h2>
            {numbers()}
        </div>
    )

};

const Notification = ({message, color}) => {

    const style = {
        color: color,
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    };

    if (message === null) {
        return null
    } else {
        return (
            <div style={style} className="notification">{message}</div>
        )
    }
};

const PersonForm = ({addPerson, handlePersonChange, handleNumberChange}) => {
    return (
        <form onSubmit={addPerson}>
            <div>
                nimi: <input onChange={handlePersonChange}/>
            </div>
            <div>
                numero: <input onChange={handleNumberChange}/>
            </div>
            <div>
                <button type="submit">lisää</button>
            </div>
        </form>
    );
};

const Person = ({name, number, deleteNumber}) => {
    return <>
        <p>{name} {number}
            <button onClick={deleteNumber}>poista</button>
        </p>
    </>;
};

const Filter = ({handleFilterChange}) => {
    return (
        <div>
            rajaa luetteloa: <input onChange={handleFilterChange}/>
        </div>
    );
};

export default App