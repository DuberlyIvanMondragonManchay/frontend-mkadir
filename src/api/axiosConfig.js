import axios from "axios";

const newInstance = axios.create({
    baseURL: `${import.meta.env.VITE_APP_API_URL}/api/`,
    withCredentials: true,
})

export default newInstance