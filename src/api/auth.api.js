import axios from './axiosConfig.js'
export const registerRequest = async (user) => await axios.post('auth/register',user);
export const loginRequest = async (user) => await axios.post('auth/login',user);

