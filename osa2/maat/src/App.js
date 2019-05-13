import React, {useState, useEffect} from 'react'
import axios from 'axios'



const App = () => {
    const [countries, setCountries] = useState([]);
    const [newFilter, setNewFilter] = useState('');

    useEffect(() => {
        console.log("effect");
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                console.log("promise doned");
                setCountries(response.data);
            });

    }, []);

    console.log(countries);

    const handleFilterChange = (event) => {
        setNewFilter(event.target.value);
    };

    const filteredCountries = () => countries.filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase()));

    const displayedCountries = () => {
        const filteredCountriesList = filteredCountries();
        const l = filteredCountriesList.length;
        if (l > 10) {
            return <p>Too many matches, specify another filter</p>
        } else if (l <= 10 && l > 1) {
            return filteredCountriesList.map(country => <Country country={country} key={country.name}/>);
        } else if (l === 1) {
            return filteredCountriesList.map(country => <CountryDetailed country={country} key={country.name}/>);
        } else {
            return <p>No countries found</p>
        }
    };

    return (
        <div>
            <Filter handleFilterChange={handleFilterChange}/>

            {displayedCountries()}
        </div>
    )

};

const Country = ({country}) => {
    return (<p>{country.name}</p>)
};

const CountryDetailed = ({country}) => {

    const languages = () => country.languages.map(language => <li key={language.name}>{language.name}</li>);

    return (
        <>
            <h2>{country.name}</h2>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h4>Languages:</h4>
            <ul>
                {languages()}
            </ul>
            <img src={country.flag}></img>
        </>
    )
};


const Filter = ({handleFilterChange}) => {
    return (
        <div>
            Find countries: <input onChange={handleFilterChange}/>
        </div>
    );
};

export default App