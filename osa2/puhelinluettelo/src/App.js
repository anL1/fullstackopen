import React from 'react';
import axios from 'axios'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            newName: '',
            newNumber: '',
            filter: '',
            showAll: true
        }
    }

    componentDidMount() {
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                this.setState({ persons: response.data })
            })
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

    handleFilter = (event) => {
        let query = event.target.value
        if (query === '') {
            this.setState({ filter: query, showAll: true })
        }
        if (query !== '') {
            this.setState({ filter: query, showAll: false })
        }
    }

    render() {
        const contactsToShow =
            this.state.showAll ?
                this.state.persons :
                this.state.persons.filter(person => person.name.toLowerCase().includes(this.state.filter.toLowerCase()))

        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <Filter filter={this.state.filter} handleFilter={this.handleFilter} />
                <Form newName={this.state.newName} handleName={this.handleNameChange}
                    newNumber={this.state.newNumber} handleNumber={this.handleNumberChange}
                    addContact={this.addContact} />
                <Contacts list={contactsToShow} />
            </div>
        )
    }
}

const Form = (props) => (
    <div>
        <h2>Lisää uusi</h2>
        <form>
            <div>
                nimi: <input value={props.newName} onChange={props.handleName} />
            </div>
            <div>
                numero: <input value={props.newNumber} onChange={props.handleNumber} />
            </div>
            <div>
                <button type="submit" onClick={props.addContact} >lisää</button>
            </div>
        </form>
    </div>
)

const Filter = (props) => (
    <div>
        rajaa näytettäviä: <input value={props.filter} onChange={props.handleFilter} />
    </div>
)

const Contacts = ({ list }) => (
    <div>
        <h2>Numerot</h2>
        {list.map(person => <Contact key={person.name} person={person} />)}
    </div>
)

const Contact = ({ person }) => (
    <div>
        {person.name} {person.number}
    </div>
)


export default App