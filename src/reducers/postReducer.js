const iState = {data: [], serverErrors: {}}

export default function postReducer(state = iState, action){
    switch(action.type){
        case 'GET_POSTS':{
            return {...state, ...action.payload}
        }
        case 'ADD_POST': {
            return {...state, data:[...state.data, {...action.payload}]}
        }
        default:{
            return {...state}
        }
    }
}