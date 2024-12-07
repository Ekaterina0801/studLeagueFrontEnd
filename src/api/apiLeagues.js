import axios from 'axios';
import { withAuth, getAuthHeaders, API_URL } from './apiHeaders';

// Получить все лиги
export const getLeagues = async () =>
    withAuth(async (accessToken) => {
        const response = await axios.get(`${API_URL}/leagues`, getAuthHeaders(accessToken));
        return response.data;
    });

// Получить лигу по ID
export const getLeagueById = async (id) =>
    withAuth(async (accessToken) => {
        const response = await axios.get(`${API_URL}/leagues/${id}`, getAuthHeaders(accessToken));
        return response.data;
    });

// Создать новую лигу
export const addNewLeague = async (leagueDto) =>
    withAuth(async (accessToken) => {
        const response = await axios.post(`${API_URL}/leagues`, leagueDto, getAuthHeaders(accessToken));
        return response.data;
    });

// Удалить лигу по ID
export const deleteLeagueById = async (id) =>
    withAuth(async (accessToken) => {
        const response = await axios.delete(`${API_URL}/leagues/${id}`, getAuthHeaders(accessToken));
        return response.data;
    });

// Изменить систему результатов в лиге
export const changeSystemResult = async (leagueId, systemResultId) =>
    withAuth(async (accessToken) => {
        const response = await axios.put(
            `${API_URL}/leagues/${leagueId}/system-results`,
            null,
            {
                params: { systemResultId },
                ...getAuthHeaders(accessToken),
            }
        );
        return response.data;
    });

// Добавить турнир в лигу
export const addTournamentToLeague = async (tournamentId,leagueId ) =>
    
    withAuth(async (accessToken) => {
        const response = await axios.put(
            `${API_URL}/leagues/${leagueId}/tournaments/${tournamentId}`,
            null,
            { headers: getAuthHeaders(accessToken) }
        );
        return response.data;
    });

// Удалить турнир из лиги
export const deleteTournamentFromLeague = async (leagueId, tournamentId) =>
    withAuth(async (accessToken) => {
        const response = await axios.delete(
            `${API_URL}/leagues/${leagueId}/tournaments/${tournamentId}`,
            getAuthHeaders(accessToken)
        );
        return response.data;
    });

// Получить все турниры из лиги
export const getAllTournamentsFromLeague = async (leagueId) =>
    withAuth(async (accessToken) => {
        const response = await axios.get(`${API_URL}/leagues/${leagueId}/tournaments`, getAuthHeaders(accessToken));
        return response.data;
    });

// Получить команду игрока из лиги
export const getPlayerTeamFromLeague = async (leagueId, playerId) =>
    withAuth(async (accessToken) => {
        const response = await axios.get(
            `${API_URL}/leagues/${leagueId}/players/${playerId}/team`,
            getAuthHeaders(accessToken)
        );
        return response.data;
    });

// Получить все команды из лиги
export const getAllTeamsFromLeague = async (leagueId) =>
    withAuth(async (accessToken) => {
        const response = await axios.get(`${API_URL}/leagues/${leagueId}/teams`, getAuthHeaders(accessToken));
        return response.data;
    });

// Удалить все лиги
export const deleteAllLeagues = async () =>
    withAuth(async (accessToken) => {
        const response = await axios.delete(`${API_URL}/leagues`, getAuthHeaders(accessToken));
        return response.data;
    });
