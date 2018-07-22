import anecdoteService from '../services/anecdotes'

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

export const voting = (anecdote) => {
    return async (dispatch) => {
        const response = await anecdoteService.update(anecdote.id, { ...anecdote, votes: anecdote.votes + 1 })
        dispatch({
            type: 'VOTE',
            id: response.id
        })
    }
}

export const anecdoteCreation = (data) => {
    return async (dispatch) => {
        const content = await anecdoteService.create(data)
        dispatch({
            type: 'CREATE',
            data: content
        })
    }
}

export const initAnecdotes = () => {
    return async (dispatch) => {
        const anecdotes = await anecdoteService.getAll()
        dispatch({
            type: 'INIT',
            data: anecdotes
        })
    }
}

export default anecdoteReducer