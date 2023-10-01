import axios from './axiosConfig.js'

export const getResturantsRequest = async () => await axios.get('restaurants/');
export const createResturantsRequest = async (restaurant) => await axios.post('restaurants/register',restaurant);
