const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const likes = blogs.map(blog => blog.likes)
    return likes.reduce((sum, item) => sum + item, 0)
}

const favoriteBlog = (blogs) => {
    const likes = blogs.map(b => b.likes)

    const max = (array) => {
        return array.reduce((p, v) => {
            return p > v ? p : v
        })
    }

    const indexOfFavorite = likes.indexOf(max(likes))

    return blogs[indexOfFavorite]
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}