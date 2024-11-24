import Cookies from 'js-cookie';

export const getSavedLeagueId = () => {
  return Cookies.get("leagueId");
};

export const saveLeagueId = (leagueId) => {
  Cookies.set("leagueId", leagueId);
};
