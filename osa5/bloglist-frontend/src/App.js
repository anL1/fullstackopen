import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
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
      message: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
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
    this.blogForm.toggleVisibility()
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

  render() {
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
        {this.state.user.name} logged in
        <div>
          <button onClick={this.logOut}>log out</button>
        </div>
        <Message message={this.state.message} />

        <div>
          <h2>Add Blog</h2>
          <Togglable buttonLabel="create new" ref={component => this.blogForm = component} >
            <BlogForm title={this.state.title} author={this.state.author} url={this.state.url}
              addBlog={this.addBlog} handleFieldChange={this.handleFieldChange} />
          </Togglable>
        </div>

        <div>
          <h2>blogs</h2>
          {this.state.blogs.map(blog =>
            <Blog key={blog._id} blog={blog} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
