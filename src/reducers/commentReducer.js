const iState = {data: [], serverErrors: {}}

export default function commentReducer(state=iState, action){
    switch(action.type){
        case 'GET_COMMENTS':{
            return {...state, ...action.payload}
        }
        case 'CREATE_COMMENT': {
            return {...state, data: [...state.data, {...action.payload}]}
        }
        case 'DEL_COM' : {
            return {...state, data: state.data.filter(com=>com._id!==action.payload)}
        }
        case 'EDIT_COM': {
            return {...state, data: state.data.map(com=>{
                if(com._id==action.payload._id){
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