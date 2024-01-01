const iState = {data: [], serverErrors: {}}

export default function communityReducer(state = iState, action){
    switch(action.type){
        case 'GET_COM':{
            return {...state, ...action.payload}
        }
        default:{
            return {...state}
        }
    }
}