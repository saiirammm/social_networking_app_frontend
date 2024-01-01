const iState = {data: {}, serverErrors: {}}
export default function userReducer(state = iState, action){
    switch(action.type){
        case 'LOGIN_USER':{
            return {...state, ...action.payload}
        }
        case 'LOGOUT_USER': {
            return {data:{}, serverErrors: []}
        }
        default:{
            return {...state}
        }
    }
}