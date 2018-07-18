import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog>', () => {
    let blogComponent
    const blog = {
        title: 'blog-title',
        author: 'blog-author',
        likes: 6
    }
    const mockHandler = jest.fn()
    
    beforeEach(() => {
        blogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler} />)
    })

    it('renders content', () => {
        const contentDiv = blogComponent.find('.content')
        const likesDiv = blogComponent.find('.likes')

        expect(contentDiv.text()).toContain(blog.title)
        expect(contentDiv.text()).toContain(blog.author)
        expect(likesDiv.text()).toContain(blog.likes)
    })

    it('calls eventhandler twice when button is clicked 2 times', () => {
        const button = blogComponent.find('button')
        button.simulate('click')
        button.simulate('click')

        expect(mockHandler.mock.calls.length).toBe(2)
    })
})