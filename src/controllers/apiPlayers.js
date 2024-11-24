import axios from 'axios';
import { withAuth, getAuthHeaders, API_URL } from './apiHeaders';
import axios from 'axios';
import { API_URL, getAuthHeaders, withAuth } from './authHelpers';

/**
 * Получить список игроков с фильтрацией и сортировкой.
 * @param {Object} filters - Фильтры для запроса (name, surname, teamId, bornBefore, bornAfter, sortBy, sortOrder).
 * @returns {Promise<Array>} - Список игроков.
 */
export const getPlayers = async (filters = {}) => {
    return withAuth(async (accessToken) => {
        const params = {
            ...filters, // Фильтры включают name, surname, teamId, bornBefore, bornAfter, sortBy, sortOrder
        };
        const response = await axios.get(`${API_URL}/players`, {
            params,
            headers: getAuthHeaders(accessToken),
        });
        return response.data;
    });
};

/**
 * Получить игрока по ID.
 * @param {number} id - Идентификатор игрока.
 * @returns {Promise<Object>} - Данные игрока.
 */
export const getPlayerById = async (id) => {
    return withAuth(async (accessToken) => {
        const response = await axios.get(`${API_URL}/players/${id}`, getAuthHeaders(accessToken));
        return response.data;
    });
};

/**
 * Создать нового игрока.
 * @param {Object} playerDto - Данные игрока для создания.
 * @returns {Promise<Object>} - Созданный игрок.
 */
export const addNewPlayer = async (playerDto) => {
    return withAuth(async (accessToken) => {
        const response = await axios.post(`${API_URL}/players`, playerDto, getAuthHeaders(accessToken));
        return response.data;
    });
};

/**
 * Удалить игрока по ID.
 * @param {number} id - Идентификатор игрока.
 * @returns {Promise<string>} - Сообщение об удалении.
 */
export const deletePlayer = async (id) => {
    return withAuth(async (accessToken) => {
        const response = await axios.delete(`${API_URL}/players/${id}`, getAuthHeaders(accessToken));
        return response.data;
    });
};

/**
 * Удалить всех игроков.
 * @returns {Promise<string>} - Сообщение об удалении всех игроков.
 */
export const deleteAllPlayers = async () => {
    return withAuth(async (accessToken) => {
        const response = await axios.delete(`${API_URL}/players`, getAuthHeaders(accessToken));
        return response.data;
    });
};

/**
 * Получить трансферы игрока по ID.
 * @param {number} playerId - Идентификатор игрока.
 * @returns {Promise<Array>} - Список трансферов.
 */
export const getTransfersByPlayerId = async (playerId) => {
    return withAuth(async (accessToken) => {
        const response = await axios.get(`${API_URL}/players/${playerId}/transfers`, getAuthHeaders(accessToken));
        return response.data;
    });
};

/**
 * Получить команды игрока по ID.
 * @param {number} playerId - Идентификатор игрока.
 * @returns {Promise<Array>} - Список команд.
 */
export const getTeamsByPlayerId = async (playerId) => {
    return withAuth(async (accessToken) => {
        const response = await axios.get(`${API_URL}/players/${playerId}/teams`, getAuthHeaders(accessToken));
        return response.data;
    });
};

/**
 * Получить турниры игрока по ID.
 * @param {number} playerId - Идентификатор игрока.
 * @returns {Promise<Array>} - Список турниров.
 */
export const getTournamentsByPlayerId = async (playerId) => {
    return withAuth(async (accessToken) => {
        const response = await axios.get(`${API_URL}/players/${playerId}/tournaments`, getAuthHeaders(accessToken));
        return response.data;
    });
};
