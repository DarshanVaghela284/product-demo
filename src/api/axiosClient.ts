import axios from 'axios';

const baseURL = "http://localhost:8000"

const axiosClient = axios.create({ baseURL });

export default axiosClient