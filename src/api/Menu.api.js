import axios from './axiosConfig.js'

export const getMenusRequest = async (restaurant_id) => await axios.get(`restaurants/${restaurant_id}/menus`)
export const getMenusIsPublishedRequest = async (restaurant_id) => await axios.get(`restaurants/${restaurant_id}/menus/is-publisheds`)
export const createMenuRequest = async (restaurant_id,menu_data) => await axios.post(`restaurants/${restaurant_id}/menus/create`,menu_data)
export const getMenuRequest = async (restaurant_id,menu_id) => await axios.get(`restaurants/${restaurant_id}/menus/${menu_id}`)
export const deleteMenuRequest = async (restaurant_id,menu_id) => await axios.delete(`restaurants/${restaurant_id}/menus/delete/${menu_id}`)
export const updateMenuRequest = async (restaurant_id,menu_id,menu_data) => await axios.put(`restaurants/${restaurant_id}/menus/update/${menu_id}`,menu_data)
