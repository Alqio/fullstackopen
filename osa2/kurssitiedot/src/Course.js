import React from 'react';

const Course = ({course}) => {

    return (
        <div>
            <Header name={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </div>
    )
};

const Header = (props) => {
    return (
        <>
            <h1>{props.name}</h1>
        </>
    )
};

const Part = (props) => {
    return (
        <>
            <p>{props.part.name} {props.part.exercises}</p>
        </>
    )
};

const Content = ({parts}) => {

    const partList = () => parts.map(part => <Part part={part}/>);

    return (
        <>
            {partList()}
        </>
    )
};

const Total = ({parts}) => {
    const summa = parts.map(part => part.exercises).reduce((a, b) => a + b);
    return (
        <>
            <p>yhteensä {summa} tehtävää</p>
        </>
    )
};

export default Course;
