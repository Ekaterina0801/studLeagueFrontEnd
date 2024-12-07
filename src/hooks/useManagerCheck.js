import { useState, useEffect } from "react";
import { checkIfManager } from "../api/apiHeaders";

/**
 * Пользовательский хук для проверки, является ли пользователь менеджером лиги
 * @param {number} leagueId - ID лиги
 * @returns {boolean | null} - Статус менеджера (true/false) или null, если статус еще загружается
 */
const useManagerCheck = (leagueId) => {
    const [isManager, setIsManager] = useState(null); 
    const [error, setError] = useState(null);

    useEffect(() => {
        // Проверяем, что leagueId установлен, чтобы избежать лишних запросов
        if (!leagueId) {
            setIsManager(null); // Сбрасываем статус менеджера
            return;
        }

        const fetchManagerStatus = async () => {
            try {
                const isUserManager = await checkIfManager(leagueId);
                setIsManager(isUserManager);
                setError(null); // Сбрасываем ошибки, если все прошло успешно
            } catch (err) {
                console.error("Error checking manager status:", err);
                setError(err);
                setIsManager(null); // Сбрасываем статус при ошибке
            }
        };

        fetchManagerStatus();
    }, [leagueId]); // Хук запускается только при изменении leagueId

    return { isManager, error };
};

export default useManagerCheck;

