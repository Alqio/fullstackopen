import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    const course = {
        name: 'Half Stack -sovelluskehitys',
        parts: [
            {
                name: 'Reactin perusteet',
                exercises: 10
            },
            {
                name: 'Tiedonvälitys propseilla',
                exercises: 7
            },
            {
                name: 'Komponenttien tila',
                exercises: 14
            }
        ]
    };

    //const summa = parts.map(part => part.exercises).reduce((a, b) => a + b);

    return (
        <div>
            <Header course={course}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </div>
    )

};

const Header = (props) => {
    return (
        <>
            <h1>{props.course.name}</h1>
        </>
    )
};

const Part = (props) => {
    return (
        <>
            <p>{props.part.name} {props.part.exercises}</p>
        </>
    )
};

const Content = (props) => {
    return (
        <div>
            <Part part={props.parts[0]}/>
            <Part part={props.parts[1]}/>
            <Part part={props.parts[2]}/>
        </div>
    )
};

const Total = (props) => {
    const summa = props.parts.map(part => part.exercises).reduce((a, b) => a + b);
    return (
        <>
            <p>yhteensä {summa} tehtävää</p>
        </>
    )
};

ReactDOM.render(<App/>, document.getElementById('root'));