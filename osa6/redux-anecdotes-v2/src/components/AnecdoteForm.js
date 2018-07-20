import React from 'react'
import { anecdoteCreation } from '../reducers/anecdoteReducer'
import { creation, defaultNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

class AnecdoteForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        this.props.anecdoteCreation(content)
        this.props.creation(content)

        e.target.anecdote.value = ''
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
