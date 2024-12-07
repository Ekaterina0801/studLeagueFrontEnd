import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export const useLeagueId = () => {
  const [leagueId, setLeagueId] = useState(null);

  useEffect(() => {
    const leagueIdFromCookie = Cookies.get("leagueId");
    if (leagueIdFromCookie) {
      setLeagueId(leagueIdFromCookie);
    }
  }, []);

  return leagueId;
};
