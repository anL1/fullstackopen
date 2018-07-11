const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/Blog')
const User = require('../models/User')
const { initialBlogs, format, blogsInDb, usersInDb } = require('./test_helper')

describe('when there is initially users saved in db', async () => {
    beforeAll(async () => {
        await User.remove({})

        const user = new User({
            username: 'Testikayttaja',
            name: 'Teppo Testaaja',
            password: 'secret',
            adult: true
        })

        await user.save()
    })

    test('POST /api/users succeeds with a fresh username', async () => {
        const usersBefore = await usersInDb()

        const newUser = {
            username: 'user123',
            name: 'D. Duck',
            password: 'hash123',
            adult: false
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAfter = await usersInDb()
        expect(usersAfter.length).toBe(usersBefore.length + 1)
        const usernames = usersAfter.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('POST /api/users fails with proper statuscode if username already exists', async () => {
        const usersBefore = await usersInDb()

        const newUser = {
            username: 'Testikayttaja',
            name: 'Teppo Testaaja',
            password: 'secret',
            adult: true
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body).toEqual({ error: 'username must be unique' })

        const usersAfter = await usersInDb()
        expect(usersAfter.length).toBe(usersBefore.length)
    })

    test('POST /api/users fails with proper statuscode if password is less than 3 digits long', async () => {
        const usersBefore = await usersInDb()

        const newUser = {
            username: 'tester',
            name: 'Teppo Testaaja',
            password: '12',
            adult: true
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body).toEqual({ error: 'password must be at least 3 characters' })

        const usersAfter = await usersInDb()
        expect(usersAfter.length).toBe(usersBefore.length)
    })

    test('if adult is undefined it will be set to true', async () => {
        const newUser = {
            username: 'user789',
            name: 'T. Testaaja',
            password: 'secret',
        }

        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body.adult).toBe(true)
    })
})

describe('when there is initially blogs saved in db', async () => {
    beforeAll(async () => {
        await Blog.remove({})

        const blogObjects = initialBlogs.map(b => new Blog(b))
        await Promise.all(blogObjects.map(b => b.save()))
    })

    test('blogs are returned by GET /api/blogs', async () => {
        const blogs = await blogsInDb()

        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body.length).toBe(blogs.length)
        const returnedBlogs = response.body.map(b => b.title)
        blogs.forEach(blog => {
            expect(returnedBlogs).toContainEqual(blog.title)
        })
    })

    test('blog is saved successfully by POST /api/blogs', async () => {
        const blogsBefore = await blogsInDb()

        await api
            .post('/api/blogs')
            .send(initialBlogs[0])
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAfter = await blogsInDb()

        expect(blogsAfter.length).toBe(blogsBefore.length + 1)
        expect(blogsAfter.map(format)).toContainEqual(initialBlogs[0])
    })

    test('blog without title or url is rejected with status 400 error', async () => {
        const blog = {
            author: "author",
            likes: 10
        }

        const blogsBefore = await blogsInDb()

        await api
            .post('/api/blogs')
            .send(blog)
            .expect(400)

        const blogsAfter = await blogsInDb()

        expect(blogsAfter.length).toBe(blogsBefore.length)
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

    describe('deleting a note', async () => {
        let newBlog

        beforeAll(async () => {
            newBlog = new Blog({
                title: "will be deleted",
                author: "hello there",
                url: "url_1",
                likes: 10
            })
            await newBlog.save()
        })

        test('blog is deleted succesfully by DELETE /api/blogs/:id', async () => {
            const blogsBefore = await blogsInDb()

            await api
                .delete(`/api/blogs/${newBlog._id}`)
                .expect(204)

            const blogsAfter = await blogsInDb()
            const returnedBlogs = blogsAfter.map(format)
            expect(returnedBlogs).not.toContainEqual(newBlog)
            expect(blogsAfter.length).toBe(blogsBefore.length - 1)
        })
    })

    afterAll(() => {
        server.close()
    })
})