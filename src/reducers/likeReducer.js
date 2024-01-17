const iState = {data:[], serverErrors: {}}

export default function likeReducer(state=iState, action){
    switch(action.type){
        case 'GET_LIKES':{
            return {...state, ...action.payload}
        }
        case 'ADD_LIKE': {
            return {...state, ...action.payload}
        }
        default:{
            return {...state}
        }
    }
}