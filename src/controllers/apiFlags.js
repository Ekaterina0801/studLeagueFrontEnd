import axios from 'axios';
import { withAuth, getAuthHeaders, API_URL } from './apiHeaders';

const API_URL = "http://localhost:8080/api"; // Замените на ваш API URL

// Получить все флаги
export const getFlags = async () => {
    return withAuth(async () => {
        const response = await axios.get(`${API_URL}/flags`, getAuthHeaders());
        return response.data;
    });
};

// Получить флаг по ID
export const getFlagById = async (id) => {
    return withAuth(async () => {
        const response = await axios.get(`${API_URL}/flags/${id}`, getAuthHeaders());
        return response.data;
    });
};

// Удалить флаг по ID
export const deleteFlag = async (id) => {
    return withAuth(async () => {
        const response = await axios.delete(`${API_URL}/flags/${id}`, getAuthHeaders());
        return response.data;
    });
};

// Создать новый флаг
export const addNewFlag = async (flagDto) => {
    return withAuth(async () => {
        const response = await axios.post(`${API_URL}/flags`, flagDto, getAuthHeaders());
        return response.data;
    });
};

// Удалить все флаги
export const deleteAllFlags = async () => {
    return withAuth(async () => {
        const response = await axios.delete(`${API_URL}/flags`, getAuthHeaders());
        return response.data;
    });
};

// Получить команды по ID флага
export const getTeamsByFlagId = async (id) => {
    return withAuth(async () => {
        const response = await axios.get(`${API_URL}/flags/${id}/teams`, getAuthHeaders());
        return response.data;
    });
};
