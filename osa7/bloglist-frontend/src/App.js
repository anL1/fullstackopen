import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink, Redirect } from 'react-router-dom'
import Blog from './components/Blog'
import blogService from './services/blogs'
import userService from './services/users'
import loginService from './services/login'
import BlogForm from './components/BlogForm';
import Message from './components/message'
import Error from './components/Error'
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            blogs: [],
            username: '',
            password: '',
            error: null,
            user: null,
            title: '',
            author: '',
            url: '',
            message: null,
            users: []
        }
    }

    componentDidMount() {
        blogService.getAll().then(blogs =>
            this.setState({ blogs })
        )

        userService.getAll().then(users =>
            this.setState({ users })
        )

        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            this.setState({ user })
            blogService.setToken(user.token)
        }
    }

    handleFieldChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    login = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username: this.state.username,
                password: this.state.password
            })

            window.localStorage.setItem('loggedUser', JSON.stringify(user))
            blogService.setToken(user.token)
            this.setState({ username: '', password: '', user })
        } catch (exception) {
            this.setState({ error: 'wrong username or password' })
            setTimeout(() => {
                this.setState({ error: null })
            }, 4000);
        }
    }

    logOut = (event) => {
        event.preventDefault()
        window.localStorage.removeItem('loggedUser')
        blogService.setToken(null)
        this.setState({ username: '', password: '', user: null })
    }

    addBlog = async (event) => {
        event.preventDefault()
        try {
            const newBlog = {
                title: this.state.title,
                author: this.state.author,
                url: this.state.url
            }
            const response = await blogService.create(newBlog)

            const title = this.state.title

            this.setState({
                title: '',
                author: '',
                url: '',
                blogs: this.state.blogs.concat(response),
                message: `blog ${title} added`
            })
            setTimeout(() => {
                this.setState({ message: null })
            }, 5000);
        } catch (exception) {
            console.log('something went wrong')
            console.log(exception)
        }
    }

    deleteBlog = (id) => {
        return async () => {
            try {
                const blog = this.state.blogs.find(b => b._id === id)
                if (window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
                    await blogService.remove(id)

                    this.setState({ blogs: this.state.blogs.filter(b => b._id !== id) })
                }
            } catch (exception) {
                console.log(exception)
            }
        }
    }

    likeBlog = (id) => {
        return async () => {
            try {
                const blog = this.state.blogs.find(n => n._id === id)
                const updatedBlog = { ...blog, user: blog.user, likes: blog.likes + 1 }

                await blogService.update(id, updatedBlog)

                this.setState({ blogs: this.state.blogs.map(blog => blog._id !== id ? blog : updatedBlog) })
            } catch (exception) {
                console.log(exception)
            }
        }
    }

    compareLikes = (a, b) => {
        return b.likes - a.likes
    }

    userById = (id) =>
        this.state.users.find(u => u.id === id)

    blogById = (id) =>
        this.state.blogs.find(b => b._id === id)


    render() {

        const blogsInOrder = this.state.blogs.sort(this.compareLikes)

        if (this.state.user === null) {
            return (
                <div>
                    <Error message={this.state.error} />
                    <LoginForm username={this.state.username} password={this.state.password}
                        handleLoginFieldChange={this.handleFieldChange} login={this.login} />
                </div>
            )
        }

        return (
            <div>
                <Router >
                    <div>
                        <h1>Blog App</h1>
                        <Menu />
                        {this.state.user.name} logged in
                        <button onClick={this.logOut}>log out</button>
                        <Message message={this.state.message} />

                        <Route exact path="/" render={() => <Home blogsInOrder={blogsInOrder}
                            title={this.state.title} author={this.state.author} url={this.state.url} addBlog={this.addBlog}
                            handleFieldChange={this.handleFieldChange} likeBlog={this.likeBlog} deleteBlog={this.deleteBlog} />} />
                        <Route exact path="/users" render={() => <Users users={this.state.users} />} />
                        <Route exact path="/users/:id" render={({ match }) =>
                            this.userById(match.params.id) === undefined
                                ? <Redirect to="/" /> :
                                <User user={this.userById(match.params.id)} />} />

                        <Route exact path="/blogs/:id" render={({ match }) =>
                            this.blogById(match.params.id) === undefined
                                ? <Redirect to="/" /> :
                                <Blog blog={this.blogById(match.params.id)} like={this.likeBlog} remove={this.deleteBlog} />} />
                    </div>
                </Router>
            </div>
        );
    }
}

const Menu = () => {
    const menuStyle = {
        fontSize: 16,
        color: 'red',
        width: '300px',
        borderStyle: 'solid',
        borderRadius: '8px',
        padding: 10
    }
    const activeStyle = {
        fontWeight: 'bold',
        color: 'blue'
    }
    return (
        <div style={menuStyle}>
            <NavLink activeStyle={activeStyle} exact to="/">blogs</NavLink>&nbsp;
            <NavLink activeStyle={activeStyle} exact to="/users">users</NavLink>
        </div>
    )
}

const Home = ({ blogsInOrder, title, author, url, addBlog, handleFieldChange }) => (
    <div>
        <div>
            <h2>Add Blog</h2>
            <Togglable buttonLabel="create new" ref={component => this.blogForm = component} >
                <BlogForm title={title} author={author} url={url}
                    addBlog={addBlog} handleFieldChange={handleFieldChange} />
            </Togglable>
        </div>

        <div>
            <h2>blogs</h2>
            {blogsInOrder.map(blog =>
                <div key={blog._id}>
                    <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
                </div>
            )}
        </div>
    </div>
)

const Users = ({ users }) => (
    <div>
        <h1>Users</h1>
        <table>
            <tbody>
                <tr>
                    <td>{<h2>user</h2>}</td>
                    <td>{<h2>blogs added</h2>}</td>
                </tr>
                {users.map(user =>
                    <tr key={user.id}>
                        <td>{<Link to={`/users/${user.id}`}>{user.name}</Link>}</td>
                        <td>{user.blogs.length}</td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
)

const User = ({ user }) => {
    return (
        <div>
            <h1>{user.name}</h1>
            <h2>Added Blogs</h2>
            <ul>
                {user.blogs.map(b =>
                    <li key={b._id}>{b.title}</li>
                )}
            </ul>
        </div>
    )
}

export default App;
