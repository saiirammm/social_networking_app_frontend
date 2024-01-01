const iState = {data: [], serverErrors: {}}

export default function postReducer(state = iState, action){
    switch(action.type){
        default:{
            return {...state}
        }
    }
}