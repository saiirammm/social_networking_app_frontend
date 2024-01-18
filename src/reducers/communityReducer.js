const iState = {data: [], serverErrors: {}}

export default function communityReducer(state = iState, action){
    switch(action.type){
        case 'GET_COM':{
            return {...state, ...action.payload}
        }
        case 'CREATE_COM': {
            console.log(action.payload)
            const out = {...state, data: [...state.data, {...action.payload}]}
            console.log(out)
            return {...out}
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
            return {...state, data: state.data.map(com=>{
                if(com._id == action.payload._id){
                    return {...action.payload}
                }else{
                    return {...com}
                }
            })}
        }
        case 'DEL_COM': {
            return {...state, data: state.data.filter(com=>com._id!==action.payload)}
        }
        default:{
            return {...state}
        }
    }
}