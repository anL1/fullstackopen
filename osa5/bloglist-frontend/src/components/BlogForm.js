import React from 'react'

const BlogForm = ({ addBlog, title, author, url, handleFieldChange }) => {
    return (
        <div>
            <form onSubmit={addBlog}>
                <div>
                    title <input type="text" name="title" value={title} onChange={handleFieldChange} />
                </div>
                <div>
                    author <input type="text" name="author" value={author} onChange={handleFieldChange} />
                </div>
                <div>
                    url <input type="text" name="url" value={url} onChange={handleFieldChange} />
                </div>
                <button type="submit">add</button>
            </form>
        </div>
    )
}

export default BlogForm