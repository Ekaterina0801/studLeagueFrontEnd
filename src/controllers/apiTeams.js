import axios from 'axios';
import { withAuth, getAuthHeaders, API_URL } from './apiHeaders';


// Получить список команд с фильтрацией и сортировкой
export const getTeams = async (filters = {}, sort = {}) => {
    return withAuth(async () => {
        const params = {
            name: filters.name || undefined,
            leagueId: filters.leagueId || undefined,
            flagIds: filters.flagIds?.join(',') || undefined,
            sortField: sort.field || undefined,
            sortDirection: sort.direction || 'asc',
        };

        const response = await axios.get(API_URL+"/teams", { params, headers: getAuthHeaders() });
        console.log(response);
        return response.data;
    });
};

// Получить команду по ID
export const getTeamById = async (id) => {
    return withAuth(async () => {
        const response = await axios.get(`${API_URL}/${id}`, { headers: getAuthHeaders() });
        return response.data;
    });
};

// Создать новую команду
export const addNewTeam = async (teamDTO) => {
    return withAuth(async () => {
        const response = await axios.post(API_URL, teamDTO, { headers: getAuthHeaders() });
        return response.data;
    });
};

// Удалить команду по ID
export const deleteTeamById = async (id) => {
    return withAuth(async () => {
        const response = await axios.delete(`${API_URL}/${id}`, { headers: getAuthHeaders() });
        return response.data;
    });
};

// Добавить игрока в команду
export const addPlayerToTeam = async (teamId, playerId) => {
    return withAuth(async () => {
        const response = await axios.put(`${API_URL}/players/${playerId}`, null, { headers: getAuthHeaders() });
        return response.data;
    });
};

// Удалить игрока из команды
export const deletePlayerFromTeam = async (teamId, playerId) => {
    return withAuth(async () => {
        const response = await axios.delete(`${API_URL}/players/${playerId}`, { headers: getAuthHeaders() });
        return response.data;
    });
};

// Добавить флаг в команду
export const addFlagToTeam = async (teamId, flagId) => {
    return withAuth(async () => {
        const response = await axios.put(`${API_URL}/flags/${flagId}`, null, { headers: getAuthHeaders() });
        return response.data;
    });
};

// Удалить флаг из команды
export const deleteFlagFromTeam = async (teamId, flagId) => {
    return withAuth(async () => {
        const response = await axios.delete(`${API_URL}/flags/${flagId}`, { headers: getAuthHeaders() });
        return response.data;
    });
};

// Добавить лигу в команду
export const addLeagueToTeam = async (teamId, leagueId) => {
    return withAuth(async () => {
        const response = await axios.put(`${API_URL}/leagues/${leagueId}`, null, { headers: getAuthHeaders() });
        return response.data;
    });
};

// Поиск команд по имени и лиге
export const searchTeamsByNameAndLeague = async (name, leagueId) => {
    const response = await axios.get(`${API_URL}/search`, {
        params: { name, leagueId },
        headers: getAuthHeaders(),
    });
    return response.data;
};
