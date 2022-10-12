import axios from 'axios';
// import { toast } from 'react-toastify';
import * as staticVariable from '../utils/static'

const axiosPost = async ({ route, data, headers, isToastOnError = true }) => {
    try {
        let response = await axios.post(`${staticVariable.BASE_API}${route}`, 
            data,
            { 
                headers
            }
        );
        
        return {
            status: response.status,
            statusText: response.statusText,
            data: response.data,
            config: response.config,
        }
    } catch(err){
        if(isToastOnError){
            toast.error(err.response.data.message ?? err.message);
        }

        return {
            status: err.response.status,
            statusText: err.response.statusText,
            message: err.response.data.message,
            data: err.response.data.data,
            config: err.response.data.config,
        }
    }
}

export default axiosPost;