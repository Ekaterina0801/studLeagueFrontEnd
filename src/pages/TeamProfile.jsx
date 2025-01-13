import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  addFlagToTeam,
  addPlayerToTeam,
  deletePlayerFromTeam,
  getTeamById,
} from "../api/apiTeams";
import useTeamData from "../hooks/useTeamData";
import TransferSearchForm from "../components/forms/TransferSearchForm";
import Modal from "../components/forms/Modal/Modal";
import { addNewFlag, getFlags } from "../api/apiFlags";
import { addNewPlayer, getPlayers } from "../api/apiPlayers";
import { deleteFlagFromTeam } from "../api/apiTeams";
import { addNewTransfer } from "../api/apiTransfers";
import PlayerSearchForm from "../components/forms/PlayerSearchForm";
import useTeamsList from "../hooks/useTeamsList";
import { useModal } from "../hooks/useModal";
import useManagerCheck from "../hooks/useManagerCheck";
import SuccessMessage from "../components/successMessage/SuccessMessage";
import ErrorMessage from "../components/errorMessage/ErrorMessage";
const TeamPage = () => {
  const { teamId, leagueId } = useParams();
  const {
    team,
    teamResults,
    flags,
    allFlags,
    transfers,
    loading,
    error,
    setTeam,
    setFlags,
  } = useTeamData(teamId, leagueId);
  const teams = useTeamsList(leagueId);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { showModal, modalType, setShowModal, setModalType } = useModal();
  const { isManager, errorManager } = useManagerCheck(leagueId);


  const [playerForm, setPlayerForm] = useState({
    name: "",
    patronymic: "",
    surname: "",
    university: null,
    dateOfBirth: null,
    teamIds: [],
  });

  const [flagId, setFlagId] = useState("");
  const [newFlagName, setNewFlagName] = useState("");
  const [transferForm, setTransferForm] = useState({
    playerId: "",
    oldTeamId: "",
    newTeamId: "",
    transferDate: "",
    comment: "",
  });

  
  const handleTransferChange = (e) => {
    const { name, value } = e.target;
    setTransferForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handlePlayerChange = (e) => {
    const { name, value } = e.target;
    setPlayerForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handlePlayerSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const dateOfBirth = playerForm.dateOfBirth 
        ? new Date(playerForm.dateOfBirth).toISOString().slice(0, 10) 
        : null;
  
      const updatedPlayerForm = { 
        ...playerForm, 
        teamIds: [teamId], 
        dateOfBirth 
      };
  
      await addNewPlayer(updatedPlayerForm);
  
      setSuccessMessage("Новый игрок создан и успешно добавлен к команде");
      toggleModal();
      window.location.reload();
    } catch (err) {
      setErrorMessage("Ошибка добавления игрока");
      console.error("Ошибка добавления игрока:", err);
    }
  };
  

  const handleFlagSubmit = async (e) => {
    e.preventDefault();
    if (!flagId) return;
    try {
      await addFlagToTeam(teamId, flagId);
      const updatedTeam = await getTeamById(teamId);
      setTeam(updatedTeam);
      setFlags(updatedTeam.flags || []);
      setSuccessMessage("Флаг успешно добавлен к команде");
      toggleModal();
    } catch (err) {
      setErrorMessage("Ошибка добавления флага");
      console.error("Ошибка добавления флага:", err);
    }
  };

  const handleNewFlagSubmit = async (e) => {
    e.preventDefault();
    if (!newFlagName) return;
    try {
      const newFlag = { name: newFlagName, leagueId, teamsIds: [teamId] };
      await addNewFlag(newFlag);
      const updatedTeam = await getTeamById(teamId);
       setTimeout(async () => {
        const updatedTeam = await getTeamById(teamId);
        setTeam(updatedTeam);
        setFlags(updatedTeam.flags || []);
    }, 2000);
      setNewFlagName("");
      setSuccessMessage("Новый флаг успешно создан");
      toggleModal();
    } catch (err) {
      setErrorMessage("Ошибка создания флага");
      console.error("Ошибка создания флага:", err);
    }
  };

  const handlePlayerSearchSubmit = async (playerId) => {
    try {
      await addPlayerToTeam(teamId, playerId);
      const updatedTeam = await getTeamById(teamId);
      setTeam(updatedTeam);
      setFlags(updatedTeam.flags || []);
      setSuccessMessage("Игрок успешно добавлен");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setErrorMessage("Ошибка добавления игрока к команде");
    }
  };

  const handleFlagRemove = async (flagId) => {
    try {
      await deleteFlagFromTeam(teamId, flagId);
      const updatedTeam = await getTeamById(teamId);
      setTeam(updatedTeam);
      setFlags(updatedTeam.flags || []);
      setSuccessMessage("Флаг успешно удален из команды");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setErrorMessage("Ошибка удаления флага");
    }
  };

  const handlePlayerRemove = async (playerId) => {
    try {
      await deletePlayerFromTeam(teamId, playerId);
      const updatedTeam = await getTeamById(teamId);
      setTeam(updatedTeam);
      setSuccessMessage("Игрок успешно удален из команды");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setErrorMessage("Ошибка удаления игрока");
    }
  };

  const handleTransferSubmit = async (e) => {
    e.preventDefault();
    try {
      await addNewTransfer(transferForm);
      toggleModal();
      setSuccessMessage("Трансфер игрока успешно выполнен");
      setTimeout(() => setSuccessMessage(""), 3000);
      window.location.reload();
    } catch (err) {
      setErrorMessage("Ошибка трансфера игрока");
    }
  };

  const toggleModal = (type = "") => {
    setModalType(type);
    setShowModal((prev) => !prev);
  };

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>{team.name}</h1>
      {successMessage && <SuccessMessage message={successMessage} />}
      {errorMessage && <ErrorMessage message={errorMessage} />}

      <h2>Флаги</h2>
      <div className="flags">
        {team.flags.length > 0 ? (
          team.flags.map((flag) => (
            <div key={flag.id} className="flag">
              {flag.name}
              {isManager && (
              <span
                className="remove-icon"
                onClick={() => handleFlagRemove(flag.id)}
              >
                🗑
              </span>
)}
            </div>
          ))
        ) : (
          <p>Пока нет флагов</p>
        )}
      </div>
      {isManager && (
  <>
    <button onClick={() => toggleModal("flag")}>Добавить флаг</button>
    <button onClick={() => toggleModal("player")}>Добавить нового игрока</button>
  </>
)}

      <Modal show={showModal} onClose={() => toggleModal()}>
        {modalType === "flag" && (
          <div>
            <h2>Добавление флага к команде</h2>
            <form onSubmit={handleFlagSubmit}>
              <label htmlFor="flagId">Выберите флаг:</label>
              <select
                id="flagId"
                name="flagId"
                value={flagId}
                onChange={(e) => setFlagId(e.target.value)}
                required
              >
                <option value="">Выберите флаг</option>
                {allFlags.map((flag) => (
                  <option key={flag.id} value={flag.id}>
                    {flag.name}
                  </option>
                ))}
              </select>
              <button type="submit">Добавить флаг к команде</button>
            </form>

            <h3>Или создайте новый флаг</h3>
            <form onSubmit={handleNewFlagSubmit}>
              <label htmlFor="newFlagName">Название флага:</label>
              <input
                type="text"
                id="newFlagName"
                name="newFlagName"
                value={newFlagName}
                onChange={(e) => setNewFlagName(e.target.value)}
                required
              />
              <button type="submit">Создать новый флаг</button>
            </form>
          </div>
        )}

        {modalType === "player" && (
          <div>
            <div>
              <h2>Добавление существующего игрока</h2>
              <PlayerSearchForm
                onSubmit={handlePlayerSearchSubmit}
                onClose={() => toggleModal()}
              />
            </div>
            <h2>Добавление нового игрока</h2>
            <form onSubmit={handlePlayerSubmit}>
              <label htmlFor="name">Имя</label>
              <input
                type="text"
                id="name"
                name="name"
                value={playerForm.name}
                onChange={handlePlayerChange}
                required
              />
              <label htmlFor="patronymic">Отчество</label>
              <input
                type="text"
                id="patronymic"
                name="patronymic"
                value={playerForm.patronymic}
                onChange={handlePlayerChange}
                required
              />
              <label htmlFor="surname">Фамилия</label>
              <input
                type="text"
                id="surname"
                name="surname"
                value={playerForm.surname}
                onChange={handlePlayerChange}
                required
              />
              <label htmlFor="university">Университет</label>
              <input
                type="text"
                id="university"
                name="university"
                value={playerForm.university}
                onChange={handlePlayerChange}
              />
              <label htmlFor="dateOfBirth">Дата рождения</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={playerForm.playerDateBirth}
                onChange={handlePlayerChange}
              />
              <button type="submit">Добавить игрока к команде</button>
            </form>
          </div>
        )}
      </Modal>

      <Modal
        show={showModal && modalType === "transfer"}
        onClose={() => toggleModal()}
      >
        <h3>Перевести игрока в другую команду</h3>

        <TransferSearchForm
          onSubmit={(newTeamId) => {
            setTransferForm((prevForm) => ({
              ...prevForm,
              newTeamId,
            }));
          }}
          onClose={() => toggleModal()}
          selectedLeagueId={leagueId}
        />

        <form onSubmit={handleTransferSubmit}>
          <div>
            <label htmlFor="oldTeamId">Текущая команда</label>
            <select
              id="oldTeamId"
              name="oldTeamId"
              value={transferForm.oldTeamId}
              onChange={handleTransferChange}
              required
            >
              <option value="">Выберите текущую команду</option>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>

            <label htmlFor="newTeamId">Новая команда</label>
            <input
              type="text"
              id="newTeamId"
              name="newTeamId"
              value={
                teams.find((team) => team.id === transferForm.newTeamId)
                  ?.name || ""
              }
              readOnly
            />

            <label htmlFor="transferDate">Дата трансфера</label>
            <input
              type="date"
              id="transferDate"
              name="transferDate"
              value={transferForm.transferDate}
              onChange={handleTransferChange}
              required
            />

            <label htmlFor="comment">Комментарий</label>
            <input
              type="text"
              id="comment"
              name="comment"
              value={transferForm.comment}
              onChange={handleTransferChange}
            />

            <input
              type="hidden"
              name="playerId"
              value={transferForm.playerId}
            />
          </div>
          <button type="submit">Перевести</button>
        </form>
      </Modal>

      <h2>Состав команды</h2>
      {team.players.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>№</th>
              <th>ФИО игрока</th>
              {isManager&&(<th>Удалить</th>)}
              
            </tr>
          </thead>
          <tbody>
            {team.players.map((player, index) => (
              <tr key={player.id}>
                <td>{index + 1}</td>
                <td>
                  <a
                    href={`/leagues/${leagueId}/teams/${team.id}/players/${player.id}`}
                  >
                    {player.surname +
                      " " +
                      player.name +
                      " " +
                      player.patronymic}
                  </a>
                </td>
                {isManager && (<td>
                  
                  <span
                    className="remove-icon"
                    onClick={() => handlePlayerRemove(player.id)}
                  >
                    🗑️
                  </span>
                  <span className="remove-tooltip">Удалить из команды</span>
                </td>)}
                
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Игроков пока нет</p>
      )}

      <h2>Турниры</h2>
      {teamResults.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>№</th>
              <th>Название турнира</th>
              <th>Результат</th>
              <th>Состав команды</th>
            </tr>
          </thead>
          <tbody>
            {teamResults.map((result, index) => (
              <tr key={result.tournament.id}>
                <td>{index + 1}</td>
                <td>
                  <a href={`/tournaments/${result.tournament.id}/results`}>
                    {result.tournament.name}
                  </a>
                </td>
                <td>{`${result.totalScore} / ${result.countQuestions}`}</td>
                <td>
                  {result.players && result.players.length > 0 ? (
                    <ul>
                      {result.players.map((player) => (
                        <li
                          key={player.id}
                        >{`${player.surname} ${player.name} ${player.patronymic}`}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>Игроков в составе нет</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Турниров пока нет</p>
      )}

      <h2>Трансферы</h2>
      {transfers.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>№</th>
              <th>Игрок</th>
              <th>Старая команда</th>
              <th>Новая команда</th>
              <th>Дата трансфера</th>
              <th>Комментарий</th>
            </tr>
          </thead>
          <tbody>
            {transfers.map((transfer, index) => (
              <tr key={transfer.id}>
                <td>{index + 1}</td>
                <td>
                  <a
                    href={`/leagues/${leagueId}/teams/${team.id}/players/${transfer.player.id}`}
                  >
                    {transfer.player.getFullName()}
                  </a>
                </td>
                <td>{transfer.oldTeam?.name}</td>
                <td>{transfer.newTeam?.name}</td>
                <td>{transfer.date}</td>
                <td>{transfer.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Трансферов пока нет</p>
      )}
    </div>
  );
};

export default TeamPage;
