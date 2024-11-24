import { useState, useEffect } from 'react';
import { getTeams } from '../controllers/apiTeams';
import axios from "axios"; // Если вы используете axios для получения данных

const useTeams = (filters, sort) => {
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      setIsLoading(true);
      try {
        const { leagueId } = filters;
        const { field, direction } = sort;

        // Вызов функции getTeams с фильтрами и сортировкой
        const teamsData = await getTeams({ leagueId }, { field, direction });
        
        setTeams(teamsData); // Обновляем состояние с полученными командами
      } catch (err) {
        setError("Ошибка при загрузке команд");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    // Выполняем запрос, если leagueId присутствует в фильтрах
    if (filters.leagueId) {
      fetchTeams();
    }
  }, [filters, sort]); // Хук срабатывает при изменении фильтров или сортировки

  return { teams, isLoading, error };
};

export default useTeams;
