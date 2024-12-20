import { API_URL } from "./apiHeaders";
import { withAuth } from "./apiHeaders";
import { getAuthHeaders } from "./apiHeaders";
import axios from "axios";
export const getUsers = async (filters = {}) => {
    return withAuth(async (accessToken) => {
        const params = {
            ...filters,
        };
        const response = await axios.get(`${API_URL}/users`, {
            params,
            headers: getAuthHeaders(accessToken),
        });
        console.log('data',response.data);
        return response.data; 
    });
};