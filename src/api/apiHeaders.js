export const API_URL = 'http://185.178.45.196:8080/api';
import axios from "axios";

// Функция для получения заголовков с авторизацией
export const getAuthHeaders = (accessToken) => {
    const refreshToken = localStorage.getItem('refreshToken');
    console.log(accessToken);
    console.log(refreshToken);
    console.log('exp',localStorage.getItem('expiresAt'));
    return {
        Authorization: `Bearer ${accessToken}`,
        'Refresh-Token': refreshToken,
    };
};

export const checkIfManager = async (leagueId) => {
    return withAuth(async (accessToken) => {
        console.log(accessToken);
        const response = await  axios.get(`${API_URL}/leagues/${leagueId}/is-manager`,  {
            headers: getAuthHeaders(accessToken),
        });
        console.log('response',response);
        return response.data;
    });
};

const isTokenExpired = () => {
    const expiresAt = localStorage.getItem("expiresAt");
    return !expiresAt || Date.now() > expiresAt;
  };
  
  export const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("expiresAt");
    //window.location.href = "/teams"; 
  };
  
// Функция для обновления токенов, если access-токен истёк
export const refreshTokens = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (isTokenExpired()) {
        logout(); // Если токен истёк, выполняем выход
        throw new Error("Session expired. Please log in again.");
      }
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
    let accessToken = localStorage.getItem('accessToken');

    // Проверяем, не истёк ли токен
    if (isTokenExpired()) {
        console.log("Refresh token expired...");
        logout();
        //throw new Error("Session expired. Please log in again.");
    }
    // Если токен уже есть, пробуем сразу выполнить запрос
    try {
        return await requestFn(accessToken);
    } catch (error) {
        // Если ошибка 401 (неавторизован), пробуем обновить токен
        if (error.response && error.response.status === 401) {
            accessToken = await refreshTokens();
            return requestFn(accessToken); // Повторно выполняем запрос с обновленным токеном
        }
        throw error;
    }
};
