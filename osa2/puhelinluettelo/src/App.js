import React, {useState, useEffect} from 'react'
import axios from 'axios'

const App = () => {
    const [persons, setPersons] = useState([]);

    useEffect(() => {
        console.log("effect");
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                console.log("promise doned");
                setPersons(response.data)
            })
    }, []);

    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [newFilter, setNewFilter] = useState('');

    const handlePersonChange = (event) => {
        setNewName(event.target.value);
    };
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    };
    const handleFilterChange = (event) => {
        setNewFilter(event.target.value);
    };

    const filterPersons = () => persons.filter(person => person.name.includes(newFilter));

    const addPerson = (event) => {
        event.preventDefault();

        if (persons.find(person => person.name === newName)) {
            alert(newName + " on jo luettelossa.");
        } else {
            const person = {
                name: newName,
                number: newNumber
            };
            setPersons(persons.concat(person));
            setNewName('');
        }
    };

    const numbers = () => persons.map(person => {
        const p = filterPersons();
        if (p.find(person2 => person2.name === person.name)) {
            return <Person name={person.name} number={person.number} key={person.name}/>;
        }
    });


    return (
        <div>
            <h2>Puhelinluettelo</h2>

            <h4>Lisää uusi</h4>

            <PersonForm addPerson={addPerson} handleNumberChange={handleNumberChange} handlePersonChange={handlePersonChange}/>
            <br></br>
            <Filter handleFilterChange={handleFilterChange}/>

            <h2>Numerot</h2>
            {numbers()}
        </div>
    )

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

const Person = ({name, number}) => {
    return <p>{name} {number}</p>;
};

const Filter = ({handleFilterChange}) => {
    return (
        <div>
            rajaa luetteloa: <input onChange={handleFilterChange}/>
        </div>
    );
};

export default App