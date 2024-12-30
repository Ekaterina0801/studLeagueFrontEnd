import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPlayerById } from "../api/apiPlayers";
import useTeams from "../hooks/useTeams";
import Modal from "../components/forms/Modal/Modal";
import { addNewTransfer } from "../api/apiTransfers";
import moment from "moment";
import { useLeagueId } from "../hooks/useLeagueId";
import useManagerCheck from "../hooks/useManagerCheck";
const PlayerPage = () => {
  const currentLeagueId = useLeagueId();
  console.log('after call', currentLeagueId);
  const { playerId, leagueId } = useParams();
  const [player, setPlayer] = useState(null);
  const [playerResults, setPlayerResults] = useState([]);
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const { isManager, errorManager } = useManagerCheck(leagueId);
  const [transferForm, setTransferForm] = useState({
    oldTeamId: "",
    newTeamId: "",
    transferDate: "",
    comments: "",
  });

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        setLoading(true);
        const playerData = await getPlayerById(playerId);
        console.log("player", playerData);
        setPlayer(playerData);
        setTransfers(playerData.transfers || []);
        setLoading(false);
      } catch (err) {
        setError("Ошибка загрузки данных игрока");
        setLoading(false);
      }
    };

    fetchPlayerData();
  }, [playerId]);

  const [filters, setFilters] = useState({ leagueId: "" });
  const [sort, setSort] = useState({ field: "teamName", direction: "asc" });

  useEffect(() => {
    console.log('ll',leagueId);
    if (leagueId) {
      setFilters({ leagueId: leagueId });
    }
  }, []);

  const { teams } = useTeams(filters, sort);

  const handleTransferChange = (e) => {
    const { name, value } = e.target;
    setTransferForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleTransferSubmit = async (e) => {
    e.preventDefault();

    if (
      !transferForm.oldTeamId ||
      !transferForm.newTeamId ||
      !transferForm.transferDate
    ) {
      alert("Пожалуйста, заполните все обязательные поля.");
      return;
    }

    try {
      const formattedTransferDate = moment(transferForm.transferDate).format(
        "YYYY-MM-DD"
      );

      const transferData = {
        ...transferForm,
        playerId: playerId,
        transferDate: formattedTransferDate,
      };

      const result = await addNewTransfer(transferData);
      setTransfers((prevTransfers) => [...prevTransfers, result]);
      const updatedPlayerData = await getPlayerById(playerId);
      setPlayer(updatedPlayerData);
      toggleModal();
      alert("Трансфер выполнен успешно!");
    } catch (err) {
      console.error("Ошибка при выполнении трансфера:", err);
      alert("Не удалось выполнить трансфер.");
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
      <h1>
        {player.surname} {player.name} {player.patronymic}
      </h1>

      <h2>Команды игрока</h2>
      {player.teams.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>№</th>
              <th>Название</th>
              <th>Лига</th>
            </tr>
          </thead>
          <tbody>
            {player.teams.map((team, index) => (
              <tr key={team.id}>
                <td>{index + 1}</td>
                <td>{team?.name}</td>
                <td>{team?.league?.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Трансферов пока нет</p>
      )}
      <h2>Турниры</h2>
      {player.teamCompositions.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>№</th>
              <th>Название турнира</th>
              <th>Дата окончания</th>
              <th>Название команды</th>
            </tr>
          </thead>
          <tbody>
            {player.teamCompositions.map((composition, index) => (
              <tr key={composition.tournament.id}>
                <td>{index + 1}</td>
                <td>
                  <a href={`/tournaments/${composition.tournament.id}/results`}>
                    {composition.tournament.name}
                  </a>
                </td>
                <td>{composition.tournament.dateEnd}</td>
                <td>
                  <a
                    href={`/leagues/${leagueId}/teams/${composition.parentTeam.id}`}
                  >
                    {composition.parentTeam.name}
                  </a>
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
              <th>Старая команда</th>
              <th>Новая команда</th>
              <th>Дата трансфера</th>
              <th>Комментарий</th>
            </tr>
          </thead>
          <tbody>
            {player.transfers.map((transfer, index) => (
              <tr key={transfer.id}>
                <td>{index + 1}</td>
                <td>{transfer.oldTeam?.name}</td>
                <td>{transfer.newTeam?.name}</td>
                <td>{transfer.transferDate}</td>
                <td>{transfer.comments}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Трансферов пока нет</p>
      )}

      {isManager && (
        <button onClick={() => toggleModal("transfer")}>
          Сделать трансфер
        </button>
      )}

      <Modal show={showModal} onClose={() => toggleModal()}>
        {modalType === "transfer" && (
          <div>
            <h3>Перевести игрока в другую команду</h3>
            <form onSubmit={handleTransferSubmit}>
              <div>
                <h2>Текущие команды</h2>
                <select
                  id="oldTeamId"
                  name="oldTeamId"
                  value={transferForm.oldTeamId}
                  onChange={handleTransferChange}
                  required
                >
                  <option value="">Выберите команду</option>
                  {player.teams
                    .filter((team) => team.league.id.toString() === leagueId.toString()) 
                    .map((team) => (
                      <option key={team.id} value={team.id}>
                        {team.name}
                      </option>
                    ))}
                </select>

                <h2>Новые команды</h2>
                <select
                  id="newTeamId"
                  name="newTeamId"
                  value={transferForm.newTeamId}
                  onChange={handleTransferChange}
                  required
                >
                  <option value="">Выберите команду</option>
                  {teams.map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.name}
                    </option>
                  ))}
                </select>

                <label htmlFor="transferDate">Выберите дату:</label>
                <input
                  type="date"
                  id="transferDate"
                  name="transferDate"
                  value={transferForm.transferDate}
                  onChange={handleTransferChange}
                  required
                />

                <h2>Комментарий</h2>
                <input
                  type="text"
                  id="comments"
                  name="comments"
                  value={transferForm.comments}
                  onChange={handleTransferChange}
                />

                <button type="submit">Перевести игрока</button>
              </div>
            </form>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PlayerPage;
