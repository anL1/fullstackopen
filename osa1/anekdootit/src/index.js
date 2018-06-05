import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            prev: 0,
            votes: [0, 0, 0, 0, 0, 0]
        }
    }

    randomLuku = () => {
        let randomNumber = 0
        do {
            randomNumber = Math.floor(Math.random() * Math.floor(6))
        } while (randomNumber === this.state.prev)

        this.setState({
            selected: randomNumber,
            prev: randomNumber
        })
    }

    vote = () => {
        const kopio = [...this.state.votes]
        kopio[this.state.selected] += 1
        this.setState({
            votes: kopio
        })
    }

    mostVotes = () => {
        let mostIndex = 0
        let most = 0
        this.state.votes.forEach(function (item, index) {
            if(item > most) {
                mostIndex = index
                most = item
            }
        })
        return (
            <div>
            <p>{this.props.anecdotes[mostIndex]}</p>
            <p>has {this.state.votes[mostIndex]} votes</p>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.props.anecdotes[this.state.selected]}
                <p>has {this.state.votes[this.state.selected]} votes</p>
                <div>
                    <Button
                        handleClick={this.randomLuku}
                        text="next anecdote"
                    />
                    <Button
                        handleClick={this.vote}
                        text="vote"
                    />
                    <h1>anecdote with most votes</h1>
                    {this.mostVotes()}
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

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)
