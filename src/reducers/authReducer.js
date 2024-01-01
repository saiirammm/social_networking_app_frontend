const iState = {}

export default function authReducer(state = iState, action){
    switch(action.type){
        case 'ADD_FUNC':  {
            return {...action.payload}
        }
        default: {
            return {...state}
        }
    }
}