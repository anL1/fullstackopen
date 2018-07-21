import React from 'react'
import { anecdoteCreation } from '../reducers/anecdoteReducer'
import { creation, defaultNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes'

class AnecdoteForm extends React.Component {
    handleSubmit = async (e) => {
        e.preventDefault()
        const data = e.target.anecdote.value
        e.target.anecdote.value = ''
        const content = await anecdoteService.create(data)
        this.props.anecdoteCreation(content)
        this.props.creation(content)
        setTimeout(() => {
            this.props.defaultNotification()
        }, 4000)
    }
    render() {
        return (
            <div>
                <h2>create new</h2>
                <form onSubmit={this.handleSubmit}>
                    <div><input name='anecdote' /></div>
                    <button>create</button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = {
    anecdoteCreation,
    creation,
    defaultNotification
}

const connectedAnecdoteForm = connect(
    null,
    mapDispatchToProps
)(AnecdoteForm)

export default connectedAnecdoteForm
