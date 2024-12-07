import { useState } from "react";
import { addNewPlayer } from "../api/apiPlayers";
import { deletePlayerFromTeam } from "../api/apiTeams";
export const usePlayersByTeam = (teamId) => {
  const [playerForm, setPlayerForm] = useState({
    name: "",
    patronymic: "",
    surname: "",
    university: null,
    dateOfBirth: null,
    teamIds: [teamId],
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const handlePlayerChange = (e) => {
    const { name, value } = e.target;
    setPlayerForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handlePlayerSubmit = async (e) => {
    e.preventDefault();
    try {
      await addNewPlayer(playerForm);
      setSuccessMessage("Новый игрок создан и успешно добавлен к команде");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError("Ошибка добавления игрока к команде");
    }
  };

  const handlePlayerRemove = async (playerId) => {
    try {
      await deletePlayerFromTeam(teamId, playerId);
      setSuccessMessage("Игрок успешно удален из команды");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError("Ошибка удаления игрока");
    }
  };

  return {
    playerForm,
    successMessage,
    error,
    handlePlayerChange,
    handlePlayerSubmit,
    handlePlayerRemove,
  };
};
