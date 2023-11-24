import axios from './axiosConfig.js'
export const registerRequest = async (user) => await axios.post('auth/register',user);
export const loginRequest = async (user) => await axios.post('auth/login',user);
export const getUserRequest = async () => await axios.get('auth/user');
export const verifyPasswordRequest = async (user) => await axios.post('auth/verify_password',user);
export const logoutRequest = async () => await axios.post('auth/logout');
