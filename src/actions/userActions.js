import axios from "../config/axios";


export const loginFunc = () => {
    return async(dispatch)=>{
        try{
            const user = await axios.get('api/user')
            console.log(user, 'login dispatched')
            dispatch(loginDispatch({data: user.data}))
        }catch(e){
            console.log(e)
            alert(e.code)
        }
    }
} 

export const logoutFunc = () => {
    return async(dispatch)=>{
        console.log('logout dispatch')
        localStorage.clear()
        dispatch(logoutDispatch())
    }
}

const loginDispatch = (data) => {
    return {type: 'LOGIN_USER', payload: data}
}

const logoutDispatch = () => {
    return {type: 'LOGOUT_USER'}
}