import React from 'react'
import { BrowserRouter as Router, Route, NavLink, Link, Redirect } from 'react-router-dom'
import CreateNew from './components/CreateNew'
import Footer from './components/Footer'
import About from './components/About'
import Anecdote from './components/Anecdote'
import { ListGroup, ListGroupItem, PageHeader } from 'react-bootstrap'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    }
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({
      anecdotes: this.state.anecdotes.concat(anecdote),
      notification: `you added anecdote ${anecdote.content}`
    })
    setTimeout(() => {
      this.setState({ notification: '' })
    }, 5000);
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {
    return (
      <div className="container">
        <PageHeader>TKT-Anecdotes App <small>Great place to find the most accurate software anecdotes</small></PageHeader>
        <Router >
          <div>
            <Menu />
            <Notification notification={this.state.notification} />
            <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
            <Route path="/about" render={() => <About />} />
            <Route path="/create" render={() =>
              this.state.notification === ''
                ? <CreateNew addNew={this.addNew} /> :
                <Redirect to="/" />
            }
            />
            <Route exact path="/anecdotes/:id" render={({ match }) =>
              <Anecdote anecdote={this.anecdoteById(match.params.id)} />}
            />
          </div>
        </Router>
        <div>
          <Footer />
        </div>
      </div>
    )
  }
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ListGroup>
      {anecdotes.map(anecdote =>
        <ListGroupItem key={anecdote.id} >
          <Link to={`/anecdotes/${anecdote.id}`} >{anecdote.content}</Link>
        </ListGroupItem>)}
    </ListGroup>
  </div>
)

const Notification = ({ notification }) => {
  const notificationStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 18,
    backgroundColor: 'LightGreen',
    border: 'solid',
    padding: 10,
    borderRadius: '8px',
    width: '300px',
    display: notification === '' ? 'none' : ''
  }

  return (
    <div style={notificationStyle}>
      {notification}
    </div>
  )
}

const Menu = () => {
  const menuStyle = {
    fontSize: 16,
    color: 'LightSkyBlue',
    width: '300px',
    borderStyle: 'solid',
    borderRadius: '8px',
    padding: 10
  }
  const activeStyle = {
    fontWeight: 'bold',
    color: 'blue'
  }
  const linkStyle = {
    marginLeft: '5px',
    marginRight: '5px',
    padding: 10,
    textDecoration: 'none'
  }
  return (
    <div style={menuStyle}>
      <NavLink style={linkStyle} activeStyle={activeStyle} exact to="/">anecdotes</NavLink>
      <NavLink style={linkStyle} activeStyle={activeStyle} exact to="/create">create new</NavLink>
      <NavLink style={linkStyle} activeStyle={activeStyle} exact to="/about">about</NavLink>
    </div>
  )
}

export default App;
