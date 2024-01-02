import axios from "../config/axios";

const getCom = (data) => {
    return {type: 'GET_COM', payload: data}
}

export const getComFunc = () => {
    return async(dispatch)=>{
        try{
            const response = await axios.get('api/getComs')
            console.log(response.data)
            dispatch(getCom({data: response.data}))
        }catch(e){
            console.log(e)
            alert(e.code)
        }
    }
}

