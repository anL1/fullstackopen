const anecdoteReducer = (store = [], action) => {
    console.log(action)
    if (action.type === 'VOTE') {
        const old = store.filter(a => a.id !== action.id)
        const voted = store.find(a => a.id === action.id)

        return [...old, { ...voted, votes: voted.votes + 1 }]
    }
    if (action.type === 'CREATE') {

        return [...store, action.data]
    }

    if (action.type === 'INIT') {
        return action.data
    }

    return store
}

export const voting = (id) => {
    return {
        type: 'VOTE',
        id
    }
}

export const anecdoteCreation = (data) => {
    return {
        type: 'CREATE',
        data
    }
}

export const initAnecdotes = (data) => {
    return {
        type: 'INIT',
        data
    }
}

export default anecdoteReducer