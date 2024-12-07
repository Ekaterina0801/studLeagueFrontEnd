import axios from 'axios';
import { withAuth, getAuthHeaders, API_URL } from './apiHeaders';
export const getTeams = async (filters = {}, sort = {}, page = 0, pageSize = 10) => {
    try {
      const params = {
        name: filters.name || undefined,
        leagueId: filters.leagueId || undefined,
        flagIds: filters.flagIds?.join(",") || undefined,
        sortField: sort.field || undefined,
        sortDirection: sort.direction || "asc",
        page,
        pageSize, 
      };
      console.log(params);
  
      console.log("Requesting teams with params:", params);
  
      const response = await axios.get(API_URL + "/teams", {
        params,
        headers: getAuthHeaders(),
      });
  
      console.log("API response:", response.data);
  
      return {
        content: response.data.content || [],
        totalItems: response.data.totalItems || 0,
        totalPages: response.data.totalPages || 0,
      };
    } catch (error) {
      console.error("Error fetching teams:", error);
      throw error;
    }
  };
  
// Получить команду по ID
export const getTeamById = async (id) => {
    return withAuth(async () => {
        const response = await axios.get(`${API_URL}/teams/${id}`, { headers: getAuthHeaders() });
        return response.data;
    });
};

// Получить команду по ID
export const getTeamResults = async (id) => {
    return withAuth(async () => {
        const response = await axios.get(`${API_URL}/teams/${id}/results`, { headers: getAuthHeaders() });
    
        return response.data;
    });
};

// Создать новую команду
export const addNewTeam = async (teamDTO) => {
    console.log('dto',teamDTO);
    return withAuth(async (accessToken) => {
        const response = await axios.post(`${API_URL}/teams`, teamDTO, {
            headers: getAuthHeaders(accessToken),
        });
        console.log('response',response);
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
    return withAuth(async (accessToken) => {
        console.log(accessToken);
        const response = await axios.put(`${API_URL}/teams/${teamId}/players/${playerId}`, null, {
            headers: getAuthHeaders(accessToken),
        });
        console.log('response',response);
        return response.data;
    });
   
};
// Удалить игрока из команды
export const deletePlayerFromTeam = async (teamId, playerId) => {
    return withAuth(async (accessToken) => {
        const response = await axios.delete(`${API_URL}/teams/${teamId}/players/${playerId}`, {
            headers: getAuthHeaders(accessToken),
        });
        console.log('response',response);
        return response.data;
    });
};

// Добавить флаг в команду
export const addFlagToTeam = async (teamId, flagId) => {
    return withAuth(async (accessToken) => {
        const response = await axios.put(`${API_URL}/teams/${teamId}/flags/${flagId}`, null, {
            headers: getAuthHeaders(accessToken),
        });
        console.log('response',response);
        return response.data;
    });
};

// Удалить флаг из команды
export const deleteFlagFromTeam = async (teamId, flagId) => {
    return withAuth(async (accessToken) => {
        const response = await axios.delete(`${API_URL}/teams/${teamId}/flags/${flagId}`, {
            headers: getAuthHeaders(accessToken),
        });
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
