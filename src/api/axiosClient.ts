import axios from 'axios';

const baseURL = "https://product-demo-backend.vercel.app"

const axiosClient = axios.create({ baseURL });

export default axiosClient