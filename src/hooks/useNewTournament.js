import { useState } from "react";

export const useNewTournament = (leagueId) => {
  const [newTournament, setNewTournament] = useState({
    name: "",
    dateStart: "",
    dateEnd: "",
    leaguesIds: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTournament((prev) => ({ ...prev, [name]: value }));
  };

  return { newTournament, handleChange};
};
