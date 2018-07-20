import React from 'react'
import { voting } from '../reducers/anecdoteReducer'
import { voted, defaultNotification } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
    vote = (anecdote) => () => {
        this.props.store.dispatch(voting(anecdote.id))
        this.props.store.dispatch(voted(anecdote.content))
        setTimeout(() => {
            this.props.store.dispatch(defaultNotification())
        }, 4000)
    }
    render() {
        const { filter, anecdotes } = this.props.store.getState()
        const toShow = () => {
            return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
        }
        return (
            <div>
                <h2>Anecdotes</h2>
                {toShow().sort((a, b) => b.votes - a.votes).map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={this.vote(anecdote)}>vote</button>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default AnecdoteList
