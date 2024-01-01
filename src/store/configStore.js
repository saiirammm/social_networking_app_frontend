import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import userReducer from '../reducers/userReducer'
import communityReducer from '../reducers/communityReducer'
import postReducer from '../reducers/postReducer'
import categoryReducer from '../reducers/categoryReducer'
import authReducer from '../reducers/authReducer'

const rootReducer = {
    users: userReducer,
    communities: communityReducer,
    posts: postReducer,
    categories: categoryReducer,
    auth: authReducer
}
const configStore = () => {
    const store = createStore(combineReducers(rootReducer),
    applyMiddleware(thunk))
    return store
}

export default configStore