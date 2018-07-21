import React from 'react'
import { voting } from '../reducers/anecdoteReducer'
import { voted, defaultNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes'

class AnecdoteList extends React.Component {
    vote = (anecdote) => async () => {
        const response = await anecdoteService.update(anecdote.id, { ...anecdote, votes: anecdote.votes + 1 })
        this.props.voting(response.id)
        this.props.voted(anecdote.content)
        setTimeout(() => {
            this.props.defaultNotification()
        }, 4000)
    }
    render() {
        const { filter, anecdotes } = this.props
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

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        filter: state.filter
    }
}

const mapDispatchToProps = {
    voting,
    voted,
    defaultNotification
}

const connectedAnecdoteList = connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList)

export default connectedAnecdoteList
