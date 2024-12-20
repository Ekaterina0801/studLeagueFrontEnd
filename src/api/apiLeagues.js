import axios from "axios";
import { withAuth, getAuthHeaders, API_URL } from "./apiHeaders";

// Получить все лиги
export const getLeagues = async () =>
  withAuth(async (accessToken) => {
    const response = await axios.get(
      `${API_URL}/leagues`,
      getAuthHeaders(accessToken)
    );
    return response.data;
  });

// Получить все лиги
export const getLeaguesByUser = async () => {
  return withAuth(async (accessToken) => {
    const response = await axios.get(`${API_URL}/users/leagues`, {
      headers: getAuthHeaders(accessToken),
    });
    console.log("response", response);
    return response.data;
  });
};

// Получить лигу по ID
export const getLeagueById = async (id) =>
  withAuth(async (accessToken) => {
    const response = await axios.get(
      `${API_URL}/leagues/${id}`,
      getAuthHeaders(accessToken)
    );
    console.log('data',response.data);
    return response.data;
  });

// Создать новую лигу
export const addNewLeague = async (leagueDto) => {
    try {
        return withAuth(async (accessToken) => {
            const response = await axios.post(`${API_URL}/leagues`, leagueDto, {
                headers: getAuthHeaders(accessToken),
            });
            return response.data;
        });
    } catch (error) {
        console.error('Ошибка при создании новой лиги:', error);
        throw error;
    }
};

export const deleteLeagueById = async (id) => {
    try {
        return withAuth(async (accessToken) => {
            const response = await axios.delete(`${API_URL}/leagues/${id}`, {
                headers: getAuthHeaders(accessToken),
            });
            return response.data;
        });
    } catch (error) {
        console.error('Ошибка при удалении лиги:', error);
        throw error;
    }
};
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
export const addTournamentToLeague = async (tournamentId, leagueId) =>
  withAuth(async (accessToken) => {
    const response = await axios.put(
      `${API_URL}/leagues/${leagueId}/tournaments/${tournamentId}`,
      null,
      { headers: getAuthHeaders(accessToken) }
    );
    return response.data;
  });

export const addManagerToLeague = async (leagueId, managerId) =>
  withAuth(async (accessToken) => {
    const response = await axios.put(
      `${API_URL}/leagues/${leagueId}/managers/${managerId}`,
      null,
      { headers: getAuthHeaders(accessToken) }
    );
    return response.data;
  });

  export const deleteManagerFromLeague = async (leagueId, managerId) =>
    withAuth(async (accessToken) => {
      const response = await axios.delete(
        `${API_URL}/leagues/${leagueId}/managers/${managerId}`,
        {
          headers: getAuthHeaders(accessToken),
        }
      );
      console.log("response", response);
      return response.data;
    });

// Удалить турнир из лиги
export const deleteTournamentFromLeague = async (leagueId, tournamentId) =>
  withAuth(async (accessToken) => {
    const response = await axios.delete(
      `${API_URL}/leagues/${leagueId}/tournaments/${tournamentId}`,
      {
        headers: getAuthHeaders(accessToken),
      }
    );
    console.log("response", response);
    return response.data;
  });

export const deleteTeamFromLeague = async (leagueId, teamId) =>
  withAuth(async (accessToken) => {
    const response = await axios.delete(
      `${API_URL}/leagues/${leagueId}/teams/${teamId}`,
      {
        headers: getAuthHeaders(accessToken),
      }
    );
    console.log("response", response);
    return response.data;
  });

// Получить все турниры из лиги
export const getAllTournamentsFromLeague = async (leagueId) =>
  withAuth(async (accessToken) => {
    const response = await axios.get(
      `${API_URL}/leagues/${leagueId}/tournaments`,
      getAuthHeaders(accessToken)
    );
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
    const response = await axios.get(
      `${API_URL}/leagues/${leagueId}/teams`,
      getAuthHeaders(accessToken)
    );
    return response.data;
  });

// Удалить все лиги
export const deleteAllLeagues = async () =>
  withAuth(async (accessToken) => {
    const response = await axios.delete(
      `${API_URL}/leagues`,
      getAuthHeaders(accessToken)
    );
    return response.data;
  });

/**
 * Получить все результаты для данной лиги.
 * @param {string} leagueId - Идентификатор лиги.
 * @returns {Promise<Array>} - Список результатов.
 */
export const getResultsByLeague = async (leagueId) => {
  try {
    return await withAuth(async (accessToken) => {
      const response = await axios.get(
        `${API_URL}/leagues/${leagueId}/results`,
        {
          headers: getAuthHeaders(accessToken),
        }
      );
      return response.data;
    });
  } catch (error) {
    console.error("Ошибка при получении результатов:", error);
    throw error;
  }
};
