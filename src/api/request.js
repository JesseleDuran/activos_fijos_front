import axios from "axios";
import config from "../config";
import { getToken, getCodemp } from "../utils/state";

const request = () => {
    // Interceptor
    const baseURL = config.API.URL;
    const request = axios.create({ baseURL });
    const token = getToken();
    const codemp = getCodemp();
    if (token)
        request.defaults.headers.common.Authorization = `Bearer ${token}`;
    if (codemp) request.defaults.headers.common.codemp = codemp;
    return request;
};

export default request;
