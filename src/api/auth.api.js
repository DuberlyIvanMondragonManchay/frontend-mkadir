import axios from './axiosConfig.js'
export const registerRequest = async (user) => await axios.post('auth/register',user);

