import axios from 'axios';

const BASE_API_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  withCredentials: true,
});

export default axiosInstance;
