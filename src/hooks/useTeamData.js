import { getTeamById } from "../api/apiTeams";
import { getTeamResults } from "../api/apiTeams";
import { useState,useEffect } from "react";
import { getFlags } from "../api/apiFlags";
const useTeamData = (teamId, leagueId) => {
    const [team, setTeam] = useState(null);
    const [teamResults, setTeamResults] = useState([]);
    const [flags, setFlags] = useState([]);
    const [allFlags, setAllFlags] = useState([]);
    const [transfers, setTransfers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchTeamData = async () => {
        try {
          setLoading(true);
          const teamData = await getTeamById(teamId);
          setTeam(teamData);
          setFlags(teamData.flags || []);
          setTransfers(teamData.transfers || []);
          const allFlags = await getFlags();
          const teamResults = await getTeamResults(teamId);
  
          setAllFlags(allFlags);
          setTeamResults(teamResults);
          setLoading(false);
        } catch (err) {
          setError("Ошибка загрузки данных команды");
          setLoading(false);
        }
      };
  
      fetchTeamData();
    }, [teamId]);
  
    return {
      team,
      teamResults,
      flags,
      allFlags,
      transfers,
      loading,
      error,
      setTeam,
      setFlags,
    };
  };
  
  export default useTeamData;