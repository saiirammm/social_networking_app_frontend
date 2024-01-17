const iState = {data: [], serverErrors: {}}

export default function commentReducer(state=iState, action){
    switch(action.type){
        case 'GET_COMMENTS':{
            return {...state, ...action.payload}
        }
        case 'CREATE_COMMENT': {
            return {...state, data: [...state.data, {...action.payload}]}
        }
        default:{
            return {...state}
        }
    }
}