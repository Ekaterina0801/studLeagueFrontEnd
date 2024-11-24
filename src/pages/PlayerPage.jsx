import React, { useState } from 'react';

const PlayerPage = ({ player, leagueId, oldTeams = [], newTeams = [] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transferData, setTransferData] = useState({
    oldTeamId: '',
    newTeamId: '',
    transferDate: '',
    comment: ''
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransferData({ ...transferData, [name]: value });
  };

  const handleTransferSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting transfer:', transferData);
    closeModal();
  };

  return (
    <div className="player-profile">
      <h1>{player ? player.fullName : 'Player Name Not Available'}</h1>

      <h2>Турниры</h2>
      {player?.tournaments && player.tournaments.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>№</th>
              <th>Название турнира</th>
            </tr>
          </thead>
          <tbody>
            {player.tournaments.map((tournament, index) => (
              <tr key={tournament.id}>
                <td>{index + 1}</td>
                <td>
                  <a
                    href={`/leagues/${leagueId}/tournaments/${tournament.id}/results`}
                    className="name-ref"
                  >
                    {tournament.name}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Турниров пока нет</p>
      )}

      <button onClick={openModal}>Сделать трансфер</button>

      {/* Transfer Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h3>Перевести игрока в другую команду</h3>
            <form onSubmit={handleTransferSubmit}>
              <h2>Текущие команды</h2>
              <select
                name="oldTeamId"
                value={transferData.oldTeamId}
                onChange={handleChange}
                required
              >
                <option value="">Select team</option>
                {oldTeams.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.teamName}
                  </option>
                ))}
              </select>

              <h2>Возможные команды</h2>
              <select
                name="newTeamId"
                value={transferData.newTeamId}
                onChange={handleChange}
                required
              >
                <option value="">Select team</option>
                {newTeams.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.teamName}
                  </option>
                ))}
              </select>

              <label htmlFor="transferDate">Выберите дату:</label>
              <input
                type="date"
                name="transferDate"
                value={transferData.transferDate}
                onChange={handleChange}
                required
              />

              <h2>Комментарий</h2>
              <input
                type="text"
                name="comment"
                value={transferData.comment}
                onChange={handleChange}
              />

              <button type="submit">Перевести игрока</button>
            </form>
          </div>
        </div>
      )}

      <h2>Команды</h2>
      {player?.teams && player.teams.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>№</th>
              <th>Название команды</th>
            </tr>
          </thead>
          <tbody>
            {player.teams.map((team, index) => (
              <tr key={team.id}>
                <td>{index + 1}</td>
                <td>
                  <a
                    href={`/leagues/${leagueId}/teams/${team.id}`}
                    className="name-ref"
                  >
                    {team.teamName}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Команд пока нет</p>
      )}

      <h2>Трансферы</h2>
      {player?.transfers && player.transfers.length > 0 ? (
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
                <td>
                  <a
                    href={`/leagues/${leagueId}/teams/${transfer.oldTeam.id}`}
                    className="name-ref"
                  >
                    {transfer.oldTeam.teamName}
                  </a>
                </td>
                <td>
                  <a
                    href={`/leagues/${leagueId}/teams/${transfer.newTeam.id}`}
                    className="name-ref"
                  >
                    {transfer.newTeam.teamName}
                  </a>
                </td>
                <td>{transfer.transferDate}</td>
                <td>{transfer.comments}</td>
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

export default PlayerPage;
