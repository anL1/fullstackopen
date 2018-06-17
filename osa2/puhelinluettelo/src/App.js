import React from 'react';
import Contact from './components/Contact'
import Form from './components/Form'
import personService from './services/persons'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            newName: '',
            newNumber: '',
            filter: '',
            showAll: true,
            notification: null,
            error: null
        }
    }

    componentDidMount() {
        personService
            .getAll()
            .then(persons => {
                this.setState({ persons })
            })
    }

    addContact = (event) => {
        event.preventDefault()
        const names = this.state.persons.map(p => p.name)
        const newPerson = {
            name: this.state.newName,
            number: this.state.newNumber
        }

        if (names.includes(this.state.newName)) {
            if (window.confirm(`${this.state.newName} on jo luettelossa, korvataanko vanha numero uudella?`)) {
                const id = this.state.persons.find(p => p.name === this.state.newName).id
                personService
                    .update(id, newPerson)
                    .then(newPerson => {
                        const refreshedList = this.state.persons.map(p => p.id !== id ? p : newPerson)
                        this.setState({
                            persons: refreshedList,
                            newName: '',
                            newNumber: '',
                            notification: `Päivitettiin yhteystietoa ${newPerson.name}`
                        })
                    })
                    .catch(error => {
                        this.setState({ error: `Yhteystieto ${newPerson.name} on jo valitettavasti poistettu palvelimelta` })
                    })
                setTimeout(() => {
                    this.setState({ notification: null, error: null })
                }, 5000);
            }
            return
        }

        personService
            .create(newPerson)
            .then(response => this.setState({
                persons: this.state.persons.concat(response),
                newName: '',
                newNumber: '',
                notification: `Lisättiin ${newPerson.name}`
            })
            )
        setTimeout(() => {
            this.setState({ notification: null })
        }, 5000);
    }

    deleteContact = (id) => {
        return () => {
            const name = this.state.persons.find(p => p.id === id).name
            if (window.confirm(`Poistetaanko ${name}?`)) {
                personService
                    .remove(id)
                    .then(response => {
                        const refreshedList = this.state.persons.filter(n => n.id !== id)
                        this.setState({ persons: refreshedList, notification: `Poistettiin ${name}` })
                    })
                setTimeout(() => {
                    this.setState({ notification: null })
                }, 5000);
            }
        }

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
                <Notification message={this.state.notification} />
                <Error message={this.state.error} />
                <Filter filter={this.state.filter} handleFilter={this.handleFilter} />
                <Form newName={this.state.newName} handleName={this.handleNameChange}
                    newNumber={this.state.newNumber} handleNumber={this.handleNumberChange}
                    addContact={this.addContact} />
                <div>
                    <h2>Numerot</h2>
                    {contactsToShow.map(person => <Contact key={person.id} person={person} remove={this.deleteContact(person.id)} />)}
                </div>
            </div>
        )
    }
}

const Filter = (props) => (
    <div>
        rajaa näytettäviä: <input value={props.filter} onChange={props.handleFilter} />
    </div>
)

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }
    return (
        <div className="notification" >
            {message}
        </div>
    )
}

const Error = ({ message }) => {
    if (message === null) {
        return null
    }
    return (
        <div className="error" >
            {message}
        </div>
    )
}

export default App