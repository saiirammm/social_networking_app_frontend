const iState = {data: [], serverErrors: {}}

export default function communityReducer(state = iState, action){
    switch(action.type){
        case 'GET_COM':{
            return {...state, ...action.payload}
        }
        case 'CREATE_COM': {
            return {...state, data: [...state.data, ...action.payload]}
        }
        case 'JOIN_LEFT_COM':{
            console.log(action.payload)
            return {...state, data: state.data.map(com=>{
                if(com._id == action.payload._id){
                    return {...action.payload}
                }else{
                    return {...com}
                }
            })}
        }
        case 'EDIT_COM': {
            console.log(action.payload)
            return {...state, data: state.data.map(com=>{
                if(com._id == action.payload._id){
                    return {...action.payload}
                }else{
                    return {...com}
                }
            })}
        }
        default:{
            return {...state}
        }
    }
}