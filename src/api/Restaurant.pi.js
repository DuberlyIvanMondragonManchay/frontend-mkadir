import axios from './axiosConfig.js'

export const getResturantsRequest = async () => await axios.get('restaurants/');
