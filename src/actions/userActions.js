import axios from "../config/axios";


export const loginFunc = () => {
    return async(dispatch)=>{
        try{
            const user = await axios.get('api/user')
            console.log(user, 'login dispatched')
            dispatch(loginDispatch({data: user.data}))
        }catch(e){
            if(e.code=='ERR_NETWORK'){
                dispatch(loginDispatch({serverErrors: {errors: 'network error'}}))
            }else{
                dispatch(loginDispatch({serverErrors: e.response.data}))
            }
        }
    }
} 

export const logoutFunc = () => {
    return async(dispatch)=>{
        try{
            localStorage.clear()
            dispatch(logoutDispatch())
        }catch(e){

        }
    }
}

const loginDispatch = (data) => {
    return {type: 'LOGIN_USER', payload: data}
}

const logoutDispatch = () => {
    return {type: 'LOGOUT_USER'}
}