import React from 'react'

const blogStyle = {
  paddingTop: 5,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
  background: 'lightblue'
}

const Blog = ({ blog, like, remove }) => (
  <div style={blogStyle}>
    <h1>{blog.title}</h1>
    <div>
      <p>{blog.url}</p>
    </div>
    <div>
      {blog.likes} <button onClick={like(blog._id)}>like</button>
    </div>
    <div>
      <p>added by: {blog.user.name}</p>
    </div>
    <div>
      <button onClick={remove(blog._id)}>delete</button>
    </div>
  </div>
)

export default Blog