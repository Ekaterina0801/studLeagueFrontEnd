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

export const deleteUser = async (id) => {
    return withAuth(async (accessToken) => {
        const response = await axios.delete(`${API_URL}/users/${id}`, getAuthHeaders(accessToken));
        return response.data;
    });
};

export const updateUser = async (id, userData) => {
    return withAuth(async (accessToken) => {
        const response = await axios.put(`${API_URL}/users/${id}`, userData, {
            headers: getAuthHeaders(accessToken),
        });
        return response.data; 
    });
};


export const getRoles = async () => {
    return withAuth(async (accessToken) => {
        const response = await axios.get(`${API_URL}/users/roles`, {
            headers: getAuthHeaders(accessToken),
        });
        return response.data;
    });
};

export const getCurrentUser = async () => {
    return withAuth(async (accessToken) => {
      const response = await axios.get(`${API_URL}/users/me`, {
        headers: getAuthHeaders(accessToken),
      });
      return response.data;
    });
  }; 



