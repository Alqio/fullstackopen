import React, {useState, useEffect} from 'react'
import axios from 'axios'
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
        numbersService.deleteNumber(id);
        //deletoi frontista kanssa, eti id ja tee jotai 
    };

    const addPerson = (event) => {
        event.preventDefault();

        if (persons.find(person => person.name === newName)) {
            alert(newName + " on jo luettelossa.");
        } else {
            const person = {
                name: newName,
                number: newNumber
            };
            numbersService.create(person).then(data => setPersons(persons.concat(data)));
            setNewName('');
        }
    };

    const numbers = () => filteredPersons().map(person => <Person name={person.name} number={person.number} key={person.name} deleteNumber={() => deleteNumber(person.id)}/>);


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

const Person = ({name, number, deleteNumber}) => {
    return <><p>{name} {number}</p> <button onClick={deleteNumber}>poista</button></>;
};

const Filter = ({handleFilterChange}) => {
    return (
        <div>
            rajaa luetteloa: <input onChange={handleFilterChange}/>
        </div>
    );
};

export default App