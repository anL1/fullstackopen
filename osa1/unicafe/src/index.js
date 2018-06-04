import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            arviot: {
                hyva: 0,
                neutraali: 0,
                huono: 0,
                total: 0
            }
        }
    }

    click = (arvo) => {
        return () => {
            this.setState((prevState) => ({
                arviot: {
                    ...prevState.arviot,
                    [arvo]: prevState.arviot[arvo] + 1,
                    total: prevState.arviot.total + 1
                }
            }))
        }
    }

    render() {
        return (
            <div>
                <div>
                    <h1>Anna palautetta</h1>
                    <Button
                        handleClick={this.click("hyva")}
                        text="hyvä"
                    />
                    <Button
                        handleClick={this.click("neutraali")}
                        text="neutraali"
                    />
                    <Button
                        handleClick={this.click("huono")}
                        text="huono"
                    />
                </div>
                <div>
                    <h1>Statistiikka</h1>
                    <Statistics
                        arviot={this.state.arviot}
                    />
                </div>
            </div>
        )
    }
}

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick} >
        {text}
    </button>
)

const Statistics = ({ arviot }) => {
    if (arviot.total === 0) {
        return (
            <p>ei yhtään palautetta annettu</p>
        )
    }

    let pos = Number.parseFloat((arviot.hyva / arviot.total) * 100).toPrecision(3)
    let average = Number.parseFloat((arviot.hyva * 1 + arviot.huono * -1) / arviot.total).toPrecision(2)

    return (
        <div>
            <table>
                <tbody>
                    <Statistic
                        text="hyvä"
                        amount={arviot.hyva}
                    />
                    <Statistic
                        text="neutraali"
                        amount={arviot.neutraali}
                    />
                    <Statistic
                        text="huono"
                        amount={arviot.huono}
                    />
                    <Statistic
                        text="keskiarvo"
                        amount={average}
                    />
                    <Statistic
                        text="positiivisia"
                        amount={`${pos} %`}
                    />
                </tbody>
            </table>
        </div>
    )
}

const Statistic = ({ text, amount }) => (
    <tr>
        <td>{text}</td>
        <td>{amount}</td>
    </tr>
)



ReactDOM.render(<App />, document.getElementById('root'));

