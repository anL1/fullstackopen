import React from 'react'

const blogStyle = {
  paddingTop: 5,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
  background: 'lightblue'
}

const Blog = ({ blog }) => (
  <div style={blogStyle}>
    <div>
      <p>{blog.url}</p>
    </div>
    <div>
      {blog.likes} <button>like</button>
    </div>
    <div>
      <p>added by: {blog.user.name}</p>
    </div>
  </div>
)

export default Blog