import axios from 'axios';
import { withAuth, getAuthHeaders, API_URL } from './apiHeaders';

import axios from 'axios';
import { API_URL, getAuthHeaders, withAuth } from './authHelpers';

/**
 * Получить все турниры с поддержкой фильтрации и сортировки.
 * @param {Object} params - Параметры фильтрации и сортировки (name, leagueId, startDate, endDate, sortField, sortDirection).
 * @returns {Promise<Array>} - Список турниров.
 */
export const getTournaments = async (params = {}) => {
    try {
        return withAuth(async (accessToken) => {
            const response = await axios.get(`${API_URL}/tournaments`, {
                headers: getAuthHeaders(accessToken),
                params,
            });
            return response.data;
        });
    } catch (error) {
        console.error('Ошибка при получении списка турниров:', error);
        throw error;
    }
};

/**
 * Получить турнир по ID.
 * @param {number} id - Идентификатор турнира.
 * @returns {Promise<Object>} - Данные турнира.
 */
export const getTournamentById = async (id) => {
    try {
        return withAuth(async (accessToken) => {
            const response = await axios.get(`${API_URL}/tournaments/${id}`, {
                headers: getAuthHeaders(accessToken),
            });
            return response.data;
        });
    } catch (error) {
        console.error(`Ошибка при получении турнира с ID ${id}:`, error);
        throw error;
    }
};

/**
 * Создать новый турнир.
 * @param {Object} tournamentDto - Данные нового турнира.
 * @returns {Promise<Object>} - Созданный турнир.
 */
export const addNewTournament = async (tournamentDto) => {
    try {
        return withAuth(async (accessToken) => {
            const response = await axios.post(`${API_URL}/tournaments`, tournamentDto, {
                headers: getAuthHeaders(accessToken),
            });
            return response.data;
        });
    } catch (error) {
        console.error('Ошибка при создании нового турнира:', error);
        throw error;
    }
};

/**
 * Удалить турнир по ID.
 * @param {number} id - Идентификатор турнира.
 * @returns {Promise<string>} - Сообщение об удалении.
 */
export const deleteTournament = async (id) => {
    try {
        return withAuth(async (accessToken) => {
            const response = await axios.delete(`${API_URL}/tournaments/${id}`, {
                headers: getAuthHeaders(accessToken),
            });
            return response.data;
        });
    } catch (error) {
        console.error(`Ошибка при удалении турнира с ID ${id}:`, error);
        throw error;
    }
};

/**
 * Добавить результат в турнир.
 * @param {number} tournamentId - Идентификатор турнира.
 * @param {number} resultId - Идентификатор результата.
 * @returns {Promise<Object>} - Обновлённый турнир.
 */
export const addResultToTournament = async (tournamentId, resultId) => {
    try {
        return withAuth(async (accessToken) => {
            const response = await axios.put(
                `${API_URL}/tournaments/${tournamentId}/results/${resultId}`,
                null,
                { headers: getAuthHeaders(accessToken) }
            );
            return response.data;
        });
    } catch (error) {
        console.error(
            `Ошибка при добавлении результата с ID ${resultId} в турнир с ID ${tournamentId}:`,
            error
        );
        throw error;
    }
};

/**
 * Удалить результат из турнира.
 * @param {number} tournamentId - Идентификатор турнира.
 * @param {number} resultId - Идентификатор результата.
 * @returns {Promise<Object>} - Обновлённый турнир.
 */
export const deleteResultFromTournament = async (tournamentId, resultId) => {
    try {
        return withAuth(async (accessToken) => {
            const response = await axios.delete(
                `${API_URL}/tournaments/${tournamentId}/results/${resultId}`,
                { headers: getAuthHeaders(accessToken) }
            );
            return response.data;
        });
    } catch (error) {
        console.error(
            `Ошибка при удалении результата с ID ${resultId} из турнира с ID ${tournamentId}:`,
            error
        );
        throw error;
    }
};

/**
 * Получить все результаты из турнира.
 * @param {number} tournamentId - Идентификатор турнира.
 * @returns {Promise<Array>} - Список результатов.
 */
export const getAllResultsFromTournament = async (tournamentId) => {
    try {
        return withAuth(async (accessToken) => {
            const response = await axios.get(`${API_URL}/tournaments/${tournamentId}/results`, {
                headers: getAuthHeaders(accessToken),
            });
            return response.data;
        });
    } catch (error) {
        console.error(
            `Ошибка при получении результатов из турнира с ID ${tournamentId}:`,
            error
        );
        throw error;
    }
};

/**
 * Добавить команду и игрока в турнир.
 * @param {number} tournamentId - Идентификатор турнира.
 * @param {number} teamId - Идентификатор команды.
 * @param {number} playerId - Идентификатор игрока.
 * @returns {Promise<Object>} - Обновлённый турнир.
 */
export const addTeamAndPlayerToTournament = async (tournamentId, teamId, playerId) => {
    try {
        return withAuth(async (accessToken) => {
            const response = await axios.put(
                `${API_URL}/tournaments/${tournamentId}/teams/${teamId}/players/${playerId}`,
                null,
                { headers: getAuthHeaders(accessToken) }
            );
            return response.data;
        });
    } catch (error) {
        console.error(
            `Ошибка при добавлении команды с ID ${teamId} и игрока с ID ${playerId} в турнир с ID ${tournamentId}:`,
            error
        );
        throw error;
    }
};

/**
 * Получить все команды из турнира.
 * @param {number} tournamentId - Идентификатор турнира.
 * @returns {Promise<Array>} - Список команд.
 */
export const getAllTeamsFromTournament = async (tournamentId) => {
    try {
        return withAuth(async (accessToken) => {
            const response = await axios.get(`${API_URL}/tournaments/${tournamentId}/teams`, {
                headers: getAuthHeaders(accessToken),
            });
            return response.data;
        });
    } catch (error) {
        console.error(`Ошибка при получении команд из турнира с ID ${tournamentId}:`, error);
        throw error;
    }
};

/**
 * Получить всех игроков из турнира.
 * @param {number} tournamentId - Идентификатор турнира.
 * @returns {Promise<Array>} - Список игроков.
 */
export const getAllPlayersFromTournament = async (tournamentId) => {
    try {
        return withAuth(async (accessToken) => {
            const response = await axios.get(`${API_URL}/tournaments/${tournamentId}/players`, {
                headers: getAuthHeaders(accessToken),
            });
            return response.data;
        });
    } catch (error) {
        console.error(`Ошибка при получении игроков из турнира с ID ${tournamentId}:`, error);
        throw error;
    }
};
