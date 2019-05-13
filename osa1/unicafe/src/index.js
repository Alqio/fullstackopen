import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    let dict = {
        "good": good,
        "neutral": neutral,
        "bad": bad
    };


    let values = [good, neutral, bad];
    let handlers = [setGood, setNeutral, setBad];

    return (
        <div>
            <h1>anna palautetta</h1>
            <Button text={"hyvä"} clickHandler={() => setGood(good + 1)}/>
            <Button text={"neutraali"} clickHandler={() => setNeutral(neutral + 1)}/>
            <Button text={"huono"} clickHandler={() => setBad(bad + 1)}/>
            <h1>statistiikka</h1>
            <Statistics values={values}/>

        </div>
    )
};

const Statistics = ({values}) => {

    let sum = values[0] * 1 + values[1] * 0 + values[2] * -1;

    let total = values.reduce((a, b) => a + b);

    let avg = 0;
    let positive = 0;
    if (total > 0) {
        avg = sum / values.length;
        positive = values[0] / total * 100;
    }
    if (total === 0) {
        return (<p>Ei yhtään palautetta annettu</p>)
    } else {
        return (
            <>
                <table>
                    <tbody>

                    <tr><Statistic text={"hyvä"} value={values[0]}/></tr>

                    <tr><Statistic text={"neutraali"} value={values[1]}/></tr>

                    <tr><Statistic text={"huono"} value={values[2]}/></tr>


                    <tr>
                        <td>yhteensä</td>
                        <td>{total}</td>
                    </tr>

                    <tr>
                        <td>keskiarvo</td>
                        <td>{avg}</td>
                    </tr>

                    <tr>
                        <td>positiivisia</td>
                        <td>{positive} %</td>
                    </tr>

                    </tbody>
                </table>
            </>
        )
    }
};

const Statistic = ({text, value}) => {
    return (
        <>
            <td>{text}</td>
            <td>{value}</td>
        </>
    )
};

const Button = ({text, clickHandler}) => {
    return (
        <>
            <button onClick={clickHandler}>{text}</button>
        </>
    )
};

ReactDOM.render(<App/>,
    document.getElementById('root')
);