import axios from "../config/axios";
export const getLikeDispatch = (data) => {
    return {
        type: 'GET_LIKES',
        payload: data
    }
}

export const hitLikeDispatch = (data) => {
    return {
        type: 'ADD_LIKE',
        payload: data
    }
}

export const hitLike = (id) => {
    return async(dispatch)=>{
        try{
            const response = await axios.post(`api/like/${id}`)
            dispatch(hitLikeDispatch({data: [...response.data]}))
        }catch(e){
            console.log(e.code)
        }
    }
}

export const getLikesFunc = () => {
    return async(dispatch) => {
        try{
            const likes = await axios.get('api/getLikes')
            dispatch(getLikeDispatch({data: [...likes.data]}))
        }
        catch(e){
            if(e.code=='ERR_NETWORK'){
                dispatch(getLikeDispatch({serverErrors: {errors: 'network error'}}))
            }else{
                dispatch(getLikeDispatch({serverErrors: e.response.data}))
            }
        }
    }
}