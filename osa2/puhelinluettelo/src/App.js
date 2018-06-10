import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [
                { name: 'Arto Hellas', number: '123123' }
            ],
            newName: '',
            newNumber: ''
        }
    }

    addContact = (event) => {
        event.preventDefault()
        const names = this.state.persons.map(p => p.name)
        if (names.includes(this.state.newName)) {
            alert('Contact already exists')
            this.setState({ newName: '' })
            return
        }

        const newPerson = {
            name: this.state.newName,
            number: this.state.newNumber
        }

        const persons = this.state.persons.concat(newPerson)

        this.setState({ persons, newName: '', newNumber: '' })
    }

    handleNameChange = (event) => {
        this.setState({ newName: event.target.value })
    }

    handleNumberChange = (event) => {
        this.setState({ newNumber: event.target.value })
    }

    render() {
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <form>
                    <div>
                        nimi: <input value={this.state.newName} onChange={this.handleNameChange} />
                    </div>
                    <div>
                        numero: <input value={this.state.newNumber} onChange={this.handleNumberChange} />
                    </div>
                    <div>
                        <button type="submit" onClick={this.addContact} >lisää</button>
                    </div>
                </form>
                <h2>Numerot</h2>
                {this.state.persons.map(person => <Contact key={person.name} person={person} />)}
            </div>
        )
    }
}

const Contact = ({ person }) => (
    <div>
        {person.name} {person.number}
    </div>
)


export default App