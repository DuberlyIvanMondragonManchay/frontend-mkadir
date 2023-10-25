import axios from './axiosConfig.js'

export const getMenusRequest = async (restaurant_id) => await axios.get(`restaurants/${restaurant_id}/menus`)
export const getMenusIsPublishedRequest = async (restaurant_id) => await axios.get(`restaurants/${restaurant_id}/menus/is-publisheds`)