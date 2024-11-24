import axios from 'axios';
import { getAuthHeaders, API_URL } from './apiHeaders';

// Добавить новый турнир
export const addTournament = async (tournamentDto) => {
    try {
        const response = await axios.post(`${API_URL}/site/tournaments`, tournamentDto, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error("Ошибка при добавлении турнира:", error);
        throw error;
    }
};

// Добавить новую команду
export const addTeam = async (teamDto) => {
    try {
        const response = await axios.post(`${API_URL}/site/teams`, teamDto, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error("Ошибка при добавлении команды:", error);
        throw error;
    }
};

// Добавить команды в турнир
export const addTeamsToTournament = async (leagueId, tournamentId) => {
    try {
        const response = await axios.post(
            `${API_URL}/site/leagues/${leagueId}/tournaments/${tournamentId}/teams`,
            null, // Пустое тело
            getAuthHeaders()
        );
        return response.data;
    } catch (error) {
        console.error("Ошибка при добавлении команд в турнир:", error);
        throw error;
    }
};
