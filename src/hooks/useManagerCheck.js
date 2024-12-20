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
        if (!leagueId) {
            setIsManager(null); 
            return;
        }

        const fetchManagerStatus = async () => {
            try {
                const isUserManager = await checkIfManager(leagueId);
                setIsManager(isUserManager);
                setError(null); 
            } catch (err) {
                console.error("Error checking manager status:", err);
                setError(err);
                setIsManager(null); 
            }
        };

        fetchManagerStatus();
    }, [leagueId]); 

    return { isManager, error };
};

export default useManagerCheck;

