import React from "react";

import "./style.css"

function TeamForm({ newTeam, leagues, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <label>Название команды:</label>
      <input type="text" name="teamName" value={newTeam.teamName} onChange={onChange} required />

      <label>Университет:</label>
      <input type="text" name="university" value={newTeam.university} onChange={onChange} required />

      <label>Выберите лигу:</label>
      <select name="leagueId" value={newTeam.leagueId} onChange={onChange} required>
        {leagues && leagues.length > 0 ? (
          leagues.map((league) => (
            <option key={league.id} value={league.id}>{league.name}</option>
          ))
        ) : (
          <option value="" disabled>Нет доступных лиг</option>
        )}
      </select>
      <button type="submit">Добавить команду</button>
    </form>
  );
}

export default TeamForm;

