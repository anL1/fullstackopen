const initialState = 'Welcome to Anecdote-app'

const notificationReducer = (store = initialState, action) => {
    switch (action.type) {
    case 'CREATED':
        return `you created anecdote '${action.data}'`
    case 'VOTED':
        return `you voted for anecdote '${action.data}'`
    case 'WELCOME':
        return initialState
    default:
        return store
    }
}

export const creation = (data) => {
    return {
        type: 'CREATED',
        data
    }
}

export const voted = (data) => {
    return {
        type: 'VOTED',
        data
    }
}

export const defaultNotification = () => {
    return {
        type: 'WELCOME'
    }
}

export default notificationReducer