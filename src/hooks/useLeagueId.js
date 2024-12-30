import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export const useLeagueId = () => {
  const [leagueId, setLeagueId] = useState("");

  useEffect(() => {
    const leagueIdFromCookie = Cookies.get("leagueId");
    console.log('inhook', leagueIdFromCookie);
    if (leagueIdFromCookie) {
      setLeagueId(leagueIdFromCookie);
    }
  }, []);
  console.log('res',leagueId);

  return leagueId;
};
