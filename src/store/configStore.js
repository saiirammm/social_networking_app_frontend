import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import configStore from '../reducers/userReducer'

const rootReducer = {
    users: userReducer
}
const configStore = () => {
    const store = createStore(combineReducers(rootReducer),
    applyMiddleware(thunk))
    return store
}

export default configStore