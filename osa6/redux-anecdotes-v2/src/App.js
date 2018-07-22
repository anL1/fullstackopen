import React from 'react'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import { initAnecdotes } from './reducers/anecdoteReducer'
import { connect } from 'react-redux'

class App extends React.Component {
    componentDidMount = () => {
        this.props.initAnecdotes()
    }

    render() {
        return (
            <div>
                <h1>Programming anecdotes</h1>
                <Notification />
                <Filter />
                <AnecdoteList />
                <AnecdoteForm />
            </div>
        )
    }
}

const connectedApp = connect(
    null,
    { initAnecdotes }
)(App)

export default connectedApp