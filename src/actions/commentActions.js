import axios from '../config/axios'

export const getCommDispatch = (data) => {
    return {
        type: 'GET_COMMENTS',
        payload: data
    }
}

export const createCommDispatch = (data) => {
    return {
        type: 'CREATE_COMMENT',
        payload: data
    }
}

export const deleteComDispatch = (id) => {
    return {
        type: 'DEL_COM',
        payload: id
    }
}

export const editCommentDispatch = (data) => {
    return {
        type: 'EDIT_COM',
        payload: data
    }
}

export const getComments = () => {
    return async(dispatch)=>{
        try{
            const response = await axios.get('api/comments')
            console.log(response.data)
            dispatch(getCommDispatch({data:[...response.data]}))
        }catch(e){
            if(e.code=='ERR_NETWORK'){
                dispatch(getCommDispatch({serverErrors: {errors: 'network error'}}))
            }else{
                dispatch(getCommDispatch({serverErrors: e.response.data}))
            }
        }
    }
}