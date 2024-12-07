import { useState } from "react";
import { addNewTournament } from "../api/apiTournaments";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    newTournament.leaguesIds = [leagueId];

    const startDate = newTournament.dateStart ? new Date(newTournament.dateStart) : null;
    const endDate = newTournament.dateEnd ? new Date(newTournament.dateEnd) : null;

    const formattedTournament = {
      ...newTournament,
      dateStart: startDate ? startDate.toISOString().slice(0, 19) : null,
      dateEnd: endDate ? endDate.toISOString().slice(0, 19) : null,
    };

    try {
      if (!formattedTournament.name || !formattedTournament.dateStart || !formattedTournament.dateEnd) {
        alert("Заполните все обязательные поля.");
        return;
      }

      await addNewTournament(formattedTournament);
      alert("Турнир успешно добавлен!");
      setNewTournament({ name: "", dateStart: "", dateEnd: "", leaguesIds: [] });
    } catch (error) {
      console.error("Ошибка при создании турнира:", error);
      alert("Не удалось создать турнир.");
    }
  };

  return { newTournament, handleChange, handleSubmit };
};
