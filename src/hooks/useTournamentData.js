import { getTournamentById } from "../api/apiTournaments";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
const useTournamentData = (tournamentId) => {
    const [tournament, setTournament] = useState(null);
    const [teamCompositions, setTeamCompositions] = useState([]);
    const [tableResult, setTableResult] = useState([]);
    const [leagueId, setLeagueId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
          const tournamentData = await getTournamentById(tournamentId);
          setTournament(tournamentData);
          setTeamCompositions(tournamentData.teamCompositions);
          setTableResult(tournamentData.results);
          const leagueIdFromCookie = Cookies.get("leagueId");
          setLeagueId(leagueIdFromCookie);
        } catch (error) {
          setError('Ошибка при загрузке данных');
          console.error("Ошибка при загрузке данных:", error);
        } finally {
          setLoading(false);
        }
      };
  
      if (tournamentId) {
        fetchData();
      }
    }, [tournamentId]);
  
    return { tournament, teamCompositions, tableResult, leagueId, loading, error };
  };
  
  export default useTournamentData;