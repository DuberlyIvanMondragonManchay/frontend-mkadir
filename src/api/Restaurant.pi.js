import axios from './axiosConfig.js'

export const getAllResturantsRequest = async () => await axios.get('restaurants/all');

export const createResturantsRequest = async (restaurant) => await axios.post('restaurants/register',restaurant);
export const getResturantsRequest = async () => await axios.get('restaurants/');
export const getResturantRequest = async (restaurant_id) => await axios.get(`restaurants/${restaurant_id}`);
export const deleteResturantRequest = async (restaurant_id) => await axios.delete(`restaurants/delete/${restaurant_id}`);

export const getMenuIsPublishedRequest = async (restaurant_id) => await axios.get(`restaurants/${restaurant_id}/menus/is-published`)