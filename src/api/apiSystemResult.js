import axios from 'axios';
import { withAuth, getAuthHeaders, API_URL } from './apiHeaders';

/**
 * Получить все системы подсчета результатов.
 * @returns {Promise<Array>} - Список систем подсчета результатов.
 */
export const getSystemResults = async () => {
    try {
        return withAuth(async (accessToken) => {
            const response = await axios.get(`${API_URL}/system-results`, {
                headers: getAuthHeaders(accessToken),
            });
            return response.data;
        });
    } catch (error) {
        console.error('Ошибка при получении систем подсчета результатов:', error);
        throw error;
    }
};

/**
 * Получить систему подсчета результатов по ID.
 * @param {number} id - Идентификатор системы подсчета.
 * @returns {Promise<Object>} - Данные системы подсчета.
 */
export const getSystemResultById = async (id) => {
    try {
        return withAuth(async (accessToken) => {
            const response = await axios.get(`${API_URL}/system-results/${id}`, {
                headers: getAuthHeaders(accessToken),
            });
            return response.data;
        });
    } catch (error) {
        console.error(`Ошибка при получении системы подсчета с ID ${id}:`, error);
        throw error;
    }
};

/**
 * Создать новую систему подсчета результатов.
 * @param {Object} systemResultDTO - Данные новой системы подсчета.
 * @returns {Promise<Object>} - Созданная система подсчета.
 */
export const addNewSystemResult = async (systemResultDTO) => {
    try {
        return withAuth(async (accessToken) => {
            const response = await axios.post(`${API_URL}/system-results`, systemResultDTO, {
                headers: getAuthHeaders(accessToken),
            });
            return response.data;
        });
    } catch (error) {
        console.error('Ошибка при создании новой системы подсчета:', error);
        throw error;
    }
};

/**
 * Удалить систему подсчета результатов по ID.
 * @param {number} id - Идентификатор системы подсчета.
 * @returns {Promise<string>} - Сообщение об удалении.
 */
export const deleteSystemResult = async (id) => {
    try {
        return withAuth(async (accessToken) => {
            const response = await axios.delete(`${API_URL}/system-results/${id}`, {
                headers: getAuthHeaders(accessToken),
            });
            return response.data;
        });
    } catch (error) {
        console.error(`Ошибка при удалении системы подсчета с ID ${id}:`, error);
        throw error;
    }
};

