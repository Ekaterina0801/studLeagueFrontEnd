export const API_URL = 'http://localhost:8080/api';

// Функция для получения токенов
export const getAuthHeaders = () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    return {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Refresh-Token': refreshToken,
        },
    };
};

// Функция для обновления токенов, если access-токен истёк
export const refreshTokens = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    try {
        const response = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });
        const { accessToken, refreshToken: newRefreshToken } = response.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', newRefreshToken);
        return accessToken;
    } catch (error) {
        console.error('Error refreshing tokens:', error);
        throw error;
    }
};

// Обёртка для запросов с автоматическим обновлением токенов
export const withAuth = async (requestFn) => {
    try {
        return await requestFn();
    } catch (error) {
        if (error.response && error.response.status === 401) {
            const newAccessToken = await refreshTokens();
            return requestFn(newAccessToken);
        }
        throw error;
    }
};