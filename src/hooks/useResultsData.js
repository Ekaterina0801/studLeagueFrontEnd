import { useState, useEffect } from 'react';
import { getResultsByLeague } from '../api/apiLeagues';

export const useResultsData = (leagueId) => {
  const [resultsData, setResultsData] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await getResultsByLeague(leagueId);
        setResultsData(data);
        console.log('results', data);
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      }
    };

    if (leagueId) {
      fetchResults();
    }
  }, [leagueId]);

  return resultsData;
};
