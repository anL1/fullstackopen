import React from 'react'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import anecodteService from './services/anecdotes'
import { initAnecdotes } from './reducers/anecdoteReducer'
import { connect } from 'react-redux'

class App extends React.Component {
    componentDidMount = async () => {
        const anecdotes = await anecodteService.getAll()
        this.props.initAnecdotes(anecdotes)
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