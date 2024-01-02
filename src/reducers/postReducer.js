const iState = {data: [], serverErrors: {}}

export default function postReducer(state = iState, action){
    switch(action.type){
        case 'GET_POSTS':{
            return {...state, data: [...action.payload]}
        }
        case 'ADD_POST': {
            return {...state, data:[...state.data, action.payload.data]}
        }
        default:{
            return {...state}
        }
    }
}