import axios from '../config/axios'

const getPostDispatch = (data) => {
    return {type: 'GET_POSTS', payload: data}
}

export const addPostDispatch = (data) => {
    return {type: 'ADD_POST', payload: data}
}
export const getPostsFunc = () => {
    return async(dispatch) => {
        try{
            const posts = await axios.get('api/getPosts')
            dispatch(getPostDispatch(posts.data))
        }catch(e){
            alert(e)
        }
    }
}