import { useState, useEffect, Profiler } from 'react';
import { getLeagues } from '../api/apiLeagues';
import Cookies from 'js-cookie';
const useLeagues = () => {
  const [leagues, setLeagues] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const fetchedLeagues = await getLeagues();
        setLeagues(fetchedLeagues);

        const savedLeagueId = Cookies.get("leagueId");
        console.log('savedLeagueId:', savedLeagueId);

        const defaultLeagueId = 1; // Assume league ID is a number

        // Check if there's a saved league ID; if not, default to '1'
        if (savedLeagueId && fetchedLeagues.some(league => league.id === Number(savedLeagueId))) {
          setSelectedLeague(Number(savedLeagueId));
        } else {
          setSelectedLeague(defaultLeagueId); // Set to default number
          Cookies.set("leagueId", defaultLeagueId); // Save default in cookies
        }
      } catch (err) {
        setError("Ошибка при загрузке лиг");
        console.error("Error loading leagues:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeagues();
  }, []);

  return {
    leagues,
    selectedLeague,
    setSelectedLeague,
    isLoading,
    error,
  };
};
export default useLeagues;