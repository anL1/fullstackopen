const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/Blog')

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

beforeAll(async () => {
    await Blog.remove({})

    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

test('blogs are returned', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('blog is posted successfully', async () => {
    await api
        .post('/api/blogs')
        .send(initialBlogs[0])
        .expect(201)
        .expect('Content-Type', /application\/json/)
})

test('blog without title or url is rejected with error 400', async () => {
    const blog = {
        author: "author",
        likes: 10
    }

    await api
        .post('/api/blogs')
        .send(blog)
        .expect(400)
})

test('if blog has no likes, then likes are set to 0', async () => {
    const blog = {
        title: "interesting title",
        author: "hello author",
        url: "hello there.url.com"
    }

    const response = await api
        .post('/api/blogs')
        .send(blog)

    expect(response.body.likes).toBe(0)
})

afterAll(() => {
    server.close()
})