import { useEffect, useState } from "react";
import { getTeams } from "../api/apiTeams";

const useTeamsList = (leagueId) => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      const availableTeams = await getTeams({ leagueId });
      setTeams(availableTeams.content);
    };

    fetchTeams();
  }, [leagueId]);

  return teams;
};

export default useTeamsList;
