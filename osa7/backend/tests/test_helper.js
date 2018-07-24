const Blog = require('../models/Blog')
const User = require('../models/User')

const initialBlogs = [
    {
        title: "new-blog-title",
        author: "blog-author-1",
        url: "url_1",
        likes: 15
    },
    {
        title: "new-blog-title2",
        author: "blog-author-2",
        url: "url_2",
        likes: 5
    }
]

const format = (blog) => {
    return {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
        id: blog._id
    }
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(format)
}

const usersInDb = async () => {
    const users = await User.find({})
    return users
}

module.exports = {
    initialBlogs, format, blogsInDb, usersInDb
}