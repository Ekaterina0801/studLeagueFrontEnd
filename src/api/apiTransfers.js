import axios from 'axios';
import { withAuth, getAuthHeaders, API_URL } from './apiHeaders';
// Получить все трансферы
export const getTransfers = async (filters = {}) => {
    return withAuth(async () => {
        const queryParams = new URLSearchParams(filters).toString();
        const response = await axios.get(`${API_URL}/transfers?${queryParams}`, getAuthHeaders());
        return response.data;
    });
};

// Получить трансфер по ID
export const getTransferById = async (id) => {
    return withAuth(async () => {
        const response = await axios.get(`${API_URL}/transfers/${id}`, getAuthHeaders());
        return response.data;
    });
};

// Создать новый трансфер
export const addNewTransfer = async (transferDTO) => {
    try {
        console.log('dto', transferDTO);
        return withAuth(async (accessToken) => {
            console.log(accessToken);
            const response = await axios.post(`${API_URL}/transfers`, transferDTO, {
                headers: getAuthHeaders(accessToken),
            });
            console.log('response',response.data);
            return response.data;
        });
    } catch (error) {
        console.error('Ошибка при создании трансфера:', error);
        throw error;
    }
};

// Удалить трансфер по ID
export const deleteTransfer = async (id) => {
    return withAuth(async () => {
        const response = await axios.delete(`${API_URL}/transfers/${id}`, getAuthHeaders());
        return response.data;
    });
};

// Функция для фильтрации и сортировки трансферов
export const filterAndSortTransfers = async ({
    playerId,
    oldTeamId,
    newTeamId,
    leagueId,
    startDate,
    endDate,
    sortField = "transferDate",
    sortDirection = "asc",
}) => {
    return withAuth(async () => {
        const params = new URLSearchParams({
            playerId,
            oldTeamId,
            newTeamId,
            leagueId,
            startDate,
            endDate,
            sortField,
            sortDirection,
        }).toString();

        const response = await axios.get(`${API_URL}/transfers?${params}`, getAuthHeaders());
        return response.data;
    });
};

