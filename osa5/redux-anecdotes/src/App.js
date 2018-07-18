import React from 'react';

const actionFor = {
    voting(id) {
        return {
            type: 'VOTE',
            data: { id }
        }
    },
    creation(content) {
        return {
            type: 'CREATION',
            data: { content }
        }
    }
}

class App extends React.Component {

    vote = (id) => () => {
        this.props.store.dispatch(actionFor.voting(id))
    }

    addAnecdote = (event) => {
        event.preventDefault()
        this.props.store.dispatch(
            actionFor.creation(event.target.content.value)
        )
        event.target.content.value = ''
    }

    compareVotes = (a, b) => {
        return b.votes - a.votes
    }

    render() {
        const anecdotes = this.props.store.getState()
        const toShow = anecdotes.sort(this.compareVotes)
        return (
            <div>
                <h2>Anecdotes</h2>
                {toShow.map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={this.vote(anecdote.id)}>vote</button>
                        </div>
                    </div>
                )}
                <h2>create new</h2>
                <form onSubmit={this.addAnecdote}>
                    <div><input name="content" /></div>
                    <button type="submit">create</button>
                </form>
            </div>
        )
    }
}

export default App