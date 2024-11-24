import axios from 'axios';
import { withAuth, getAuthHeaders, API_URL } from './apiHeaders';


// Получить все спорные записи
export const getControversials = async (filters = {}) => {
    return withAuth(async () => {
        const queryParams = new URLSearchParams(filters).toString();
        const response = await axios.get(`${API_URL}/controversials?${queryParams}`, getAuthHeaders());
        return response.data;
    });
};

// Создать новый спорный
export const addNewControversial = async (controversialDto) => {
    return withAuth(async () => {
        const response = await axios.post(`${API_URL}/controversials`, controversialDto, getAuthHeaders());
        return response.data;
    });
};

// Получить спорный по ID
export const getControversialById = async (id) => {
    return withAuth(async () => {
        const response = await axios.get(`${API_URL}/controversials/${id}`, getAuthHeaders());
        return response.data;
    });
};

// Удалить спорный по ID
export const deleteControversial = async (id) => {
    return withAuth(async () => {
        const response = await axios.delete(`${API_URL}/controversials/${id}`, getAuthHeaders());
        return response.data;
    });
};

// Удалить все спорные
export const deleteAllControversials = async () => {
    return withAuth(async () => {
        const response = await axios.delete(`${API_URL}/controversials`, getAuthHeaders());
        return response.data;
    });
};

// Функция для фильтрации и сортировки спорных записей
export const filterAndSortControversials = async ({
    questionNumber,
    statuses,
    startDate,
    endDate,
    fullResultId,
    sortBy = [],
    sortOrder = [],
}) => {
    return withAuth(async () => {
        const params = new URLSearchParams({
            questionNumber,
            statuses: statuses ? statuses.join(',') : undefined,
            startDate,
            endDate,
            fullResultId,
            sortBy: sortBy.join(','),
            sortOrder: sortOrder.join(','),
        }).toString();

        const response = await axios.get(`${API_URL}/controversials?${params}`, getAuthHeaders());
        return response.data;
    });
};
