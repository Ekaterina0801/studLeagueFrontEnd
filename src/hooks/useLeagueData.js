import { useState, useEffect } from 'react';
import { getLeagueById } from '../api/apiLeagues';

export const useLeagueData = (leagueId) => {
    const [leagueData, setLeagueData] = useState([]);
  
    useEffect(() => {
      const fetchLeague = async () => {
        try {
          const data = await getLeagueById(leagueId);
          setLeagueData(data);
        } catch (error) {
          console.error("Ошибка загрузки данных:", error);
        }
      };
  
      if (leagueId) {
        fetchLeague();
      }
    }, [leagueId]);
  
    return leagueData;
  };