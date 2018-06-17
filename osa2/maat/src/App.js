import React from 'react'
import axios from 'axios'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            countries: [],
            filter: '',
            noFilter: true,
        }
    }

    componentDidMount() {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response =>
                this.setState({ countries: response.data }))
    }

    handleFilterChange = (event) => {
        if (event.target.value === '') {
            this.setState({ filter: event.target.value, noFilter: true })
        } else {
            this.setState({ filter: event.target.value, noFilter: false })
        }
    }

    render() {
        const countryList =
            this.state.noFilter ?
                [] :
                this.state.countries.filter(c => c.name.toLowerCase().includes(this.state.filter.toLowerCase()))

        return (
            <div>
                <h1>Welcome</h1>
                find countries: <input value={this.state.filter} onChange={this.handleFilterChange} />
                <Listing matches={countryList} />
            </div>
        )
    }
}

const Listing = ({ matches }) => {
    if (matches.length > 10) {
        return (
            <div>Too many matches. Specify your search</div>
        )
    } else if (matches.length === 1) {
        return (
            <CreateCountryPage matches={matches} />
        )
    } else {
        const names = matches.map(c => c.name)
        return (
            <div>
                {names.map(name => <div key={name} >{name}</div>)}
            </div>
        )
    }
}

const CreateCountryPage = ({ matches }) => {
    return (
        <div>{matches.map(c => <Country key={c.name} name={c.name} capital={c.capital} population={c.population} flag={c.flag} />)}</div>
    )
}

const Country = (props) => {
    const imagesrc = props.flag
    return (
        <div>
            <h2>{props.name}</h2>
            <ul>
                <li >capital: {props.capital}</li>
                <li >population: {props.population}</li>
            </ul>
            <img src={imagesrc} alt="the flag" width="400" />
        </div>
    )
}

export default App