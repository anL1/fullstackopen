import React from 'react'

const LoginForm = ({login, username, password, handleLoginFieldChange}) => {
    return (
        <div>
        <h1>Log into application</h1>
          <form onSubmit={login}>
            <div>
              username:
              <input
                type="text"
                name="username"
                value={username}
                onChange={handleLoginFieldChange}
              />
            </div>
            <div>
              password:
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleLoginFieldChange}
              />
            </div>
            <button type="submit">log in</button>
          </form>
        </div>
    )
}

export default LoginForm