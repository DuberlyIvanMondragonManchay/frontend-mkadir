import axios from './axiosConfig.js'

export const getResturantsRequest = async () => await axios.get('restaurants/');
export const createResturantsRequest = async (restaurant) => await axios.post('restaurants/register',restaurant);

export const getMenuIsPublishedRequest = async (restaurant_id) => await axios.get(`restaurants/${restaurant_id}/menus/is-published`)