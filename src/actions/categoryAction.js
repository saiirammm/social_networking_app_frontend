import axios from "../config/axios"


export const getCatFun = () => {
    return async(dispatch)=>{
        try{
            const response = await axios.get('api/getCategories')
            dispatch(getCat({data: [...response.data], serverErrors: {}}))
        }catch(e){
            if(e.code=='ERR_NETWORK'){
                dispatch(getCat({serverErrors: {errors: 'network error'}}))
            }else{
                dispatch(getCat({serverErrors: e.response.data}))
            }
        }
    }
}

const getCat = (data) => {
    return {type: 'GET_CAT', payload: data}
}