const iState = {data: [], serverError: {}}
export default function categoryReducer(state = iState, action){
    switch(action.type){
        case 'GET_CAT': {
            return {...state, ...action.payload}
        }
        default: {
            return {...state}
        }
    }
}