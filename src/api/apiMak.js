import axios from 'axios';
import { getAuthHeaders, API_URL } from './apiHeaders';
import { withAuth } from './apiHeaders';

// Добавить новую команду
export const addTeam = async (leagueId, teamId) => {
    try {
        return withAuth(async (accessToken) => {
            const response = await axios.post(
                `${API_URL}/site-tournaments/leagues/${leagueId}/teams/${teamId}`,
                null,  
                { headers: getAuthHeaders(accessToken) }
            );
            return response.data;
        });
    } catch (error) {
        console.error("Ошибка при добавлении команды:", error);
        throw error;
    }
};

// Добавить команды в турнир
export const addTeamsToTournament = async (leagueId, tournamentId) => {
    try {
        return withAuth(async (accessToken) => {
            const response = await axios.post(
                `${API_URL}/site-tournaments/leagues/${leagueId}/tournaments/${tournamentId}/teams`,
                null,  
                { headers: getAuthHeaders(accessToken) }
            );
            return response.data;
        });
    } catch (error) {
        console.error(
            `Ошибка при добавлении команд в турнир с ID ${tournamentId} для лиги с ID ${leagueId}:`,
            error
        );
        throw error;
    }
};

