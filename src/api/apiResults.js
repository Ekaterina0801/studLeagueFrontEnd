import axios from 'axios';
import { withAuth, getAuthHeaders, API_URL } from './apiHeaders';
import axios from 'axios';
import { API_URL, getAuthHeaders, withAuth } from './authHelpers';

/**
 * Получить все результаты.
 * @returns {Promise<Array>} - Список результатов.
 */
export const getResults = async () => {
    try {
        return withAuth(async (accessToken) => {
            const response = await axios.get(`${API_URL}/results`, {
                headers: getAuthHeaders(accessToken),
            });
            return response.data;
        });
    } catch (error) {
        console.error('Ошибка при получении результатов:', error);
        throw error;
    }
};

/**
 * Получить результат по ID.
 * @param {number} id - Идентификатор результата.
 * @returns {Promise<Object>} - Данные результата.
 */
export const getResultById = async (id) => {
    try {
        return withAuth(async (accessToken) => {
            const response = await axios.get(`${API_URL}/results/${id}`, {
                headers: getAuthHeaders(accessToken),
            });
            return response.data;
        });
    } catch (error) {
        console.error(`Ошибка при получении результата с ID ${id}:`, error);
        throw error;
    }
};

/**
 * Создать новый результат.
 * @param {Object} fullResultDTO - Данные нового результата.
 * @returns {Promise<Object>} - Созданный результат.
 */
export const addNewResult = async (fullResultDTO) => {
    try {
        return withAuth(async (accessToken) => {
            const response = await axios.post(`${API_URL}/results`, fullResultDTO, {
                headers: getAuthHeaders(accessToken),
            });
            return response.data;
        });
    } catch (error) {
        console.error('Ошибка при создании нового результата:', error);
        throw error;
    }
};

/**
 * Удалить результат по ID.
 * @param {number} id - Идентификатор результата.
 * @returns {Promise<string>} - Сообщение об удалении.
 */
export const deleteResultById = async (id) => {
    try {
        return withAuth(async (accessToken) => {
            const response = await axios.delete(`${API_URL}/results/${id}`, {
                headers: getAuthHeaders(accessToken),
            });
            return response.data;
        });
    } catch (error) {
        console.error(`Ошибка при удалении результата с ID ${id}:`, error);
        throw error;
    }
};

/**
 * Удалить все результаты.
 * @returns {Promise<string>} - Сообщение об удалении.
 */
export const deleteAllResults = async () => {
    try {
        return withAuth(async (accessToken) => {
            const response = await axios.delete(`${API_URL}/results`, {
                headers: getAuthHeaders(accessToken),
            });
            return response.data;
        });
    } catch (error) {
        console.error('Ошибка при удалении всех результатов:', error);
        throw error;
    }
};

/**
 * Получить все спорные элементы по ID результата.
 * @param {number} resultId - Идентификатор результата.
 * @returns {Promise<Array>} - Список спорных элементов.
 */
export const getControversialsByResultId = async (resultId) => {
    try {
        return withAuth(async (accessToken) => {
            const response = await axios.get(`${API_URL}/results/${resultId}/controversials`, {
                headers: getAuthHeaders(accessToken),
            });
            return response.data;
        });
    } catch (error) {
        console.error(`Ошибка при получении спорных элементов для результата с ID ${resultId}:`, error);
        throw error;
    }
};

/**
 * Добавить спорный элемент в результат.
 * @param {number} resultId - Идентификатор результата.
 * @param {number} controversialId - Идентификатор спорного элемента.
 * @returns {Promise<Object>} - Обновлённые данные результата.
 */
export const addControversialToResult = async (resultId, controversialId) => {
    try {
        return withAuth(async (accessToken) => {
            const response = await axios.put(`${API_URL}/results/${resultId}/controversials/${controversialId}`, null, {
                headers: getAuthHeaders(accessToken),
            });
            return response.data;
        });
    } catch (error) {
        console.error(`Ошибка при добавлении спорного элемента с ID ${controversialId} в результат с ID ${resultId}:`, error);
        throw error;
    }
};
