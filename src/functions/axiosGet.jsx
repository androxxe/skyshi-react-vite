import axios from 'axios';
import { toast } from 'react-toastify';
import * as staticVariable from '../utils/static'

const axiosGet = async ({ route, data, isToastOnError = true }) => {
    try {
        let response = await axios.get(`${staticVariable.BASE_API}${route}`, {
            ...data,
            timeout: 5000
        });

        return {
            status: response.status,
            statusText: response.statusText,
            data: response.data,
            config: response.config,
        };
    } catch (err){
        if(isToastOnError){
            toast.error(err.message)
        }

        return {
            status: err.response.status,
            statusText: err.response.statusText,
            message: err.response.data.message,
            data: err.response.data.data,
            action: err.response.data.action
        }
    }
}

export default axiosGet;