import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm';

describe('<App />', () => {
    let app
    beforeAll(() => {
      app = mount(<App />)
    })
  
    it('does not render blogs if user is not logged in', () => {
      app.update()
      const BlogComponents = app.find(Blog)
      expect(BlogComponents.length).toEqual(0)
      expect(window.localStorage.getItem()).toEqual(undefined)

      const logInForm = app.find(LoginForm)
      const header = logInForm.find('h1')
      expect(header.text()).toContain('Log into application')
    })
  })