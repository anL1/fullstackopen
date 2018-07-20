const initialState = ''

const filterReducer = (store = initialState, action) => {
    if(action.type === 'SET_FILTER') {
        return action.data
    }
    return store
}

export const filterChange = (data) => {
    return {
        type: 'SET_FILTER',
        data
    }
}

export default filterReducer