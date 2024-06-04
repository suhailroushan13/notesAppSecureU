// axiosConfig.js
import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const sessionId = Cookies.get('session_id');
        console.log(sessionId);

        if (sessionId) {
            config.headers['Authorization'] = `Bearer ${sessionId}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
