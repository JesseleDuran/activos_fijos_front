import axios from "axios";
import config from "../config";
import { getToken, getBaseUrl } from "utils/state";

const request = () => {
  // Interceptor
  const baseURL = config.API.URL;
  const request = axios.create({ baseURL });
  const token = getToken();
  if (token)
    request.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return request;
};

export default request;
