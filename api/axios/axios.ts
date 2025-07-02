import axios from "axios";
import { Cookies } from 'react-cookie';

const cookie = new Cookies()

const adminUrl = "https://tureappapiforreact.onrender.com/api";
export const baseURL = adminUrl;

const axiosInstance = axios.create({
    baseURL,
});

axiosInstance.interceptors.request.use(
    function (config) {
        const token = cookie.get("Token")

        if (token) {
            config.headers = config.headers || {};
            config.headers["x-access-token"] = token;
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log("Request Headers:", config.headers);
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default axiosInstance;