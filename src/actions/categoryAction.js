import axios from "../config/axios"


export const getCatFun = () => {
    return async(dispatch)=>{
        try{
            const response = await axios.get('api/getCategories')
            dispatch(getCat({data: response.data}))
        }catch(e){
            dispatch(getCat({serverError: e}))
        }
    }
}

const getCat = (data) => {
    return {type: 'GET_CAT', payload: data}
}