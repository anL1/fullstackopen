import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import counterReducer from './reducer'

const Statistiikka = () => {
    const state = store.getState()
    console.log(state)
    
    const feedback = state.total

    if (feedback === 0) {
        return (
            <div>
                <h2>statistiikka</h2>
                <div>ei yhtään palautetta annettu</div>
            </div>
        )
    }

    return (
        <div>
            <h2>statistiikka</h2>
            <table>
                <tbody>
                    <tr>
                        <td>hyvä</td>
                        <td>{state.good}</td>
                    </tr>
                    <tr>
                        <td>neutraali</td>
                        <td>{state.ok}</td>
                    </tr>
                    <tr>
                        <td>huono</td>
                        <td>{state.bad}</td>
                    </tr>
                    <tr>
                        <td>keskiarvo</td>
                        <td>{(state.good - state.bad) / state.total}</td>
                    </tr>
                    <tr>
                        <td>positiivisia</td>
                        <td>{(state.good / state.total) * 100} %</td>
                    </tr>
                </tbody>
            </table>
        </div >
    )
}

const store = createStore(counterReducer)

class App extends React.Component {
    klik = (type) => () => {
        store.dispatch({ type: type })
    }

    render() {
        return (
            <div>
                <h2>anna palautetta</h2>
                <button onClick={this.klik('GOOD')}>hyvä</button>
                <button onClick={this.klik('OK')}>neutraali</button>
                <button onClick={this.klik('BAD')}>huono</button>
                <Statistiikka />
                <button onClick={this.klik('ZERO')}>nollaa tilasto</button>
            </div>
        )
    }
}

const renderApp = () => {
    ReactDOM.render(<App />, document.getElementById('root'));
}

renderApp()
store.subscribe(renderApp)