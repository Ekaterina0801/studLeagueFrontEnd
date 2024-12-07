import React from "react";
function ExistingTeamForm({ allTeams, onChange, onSubmit }) {
    console.log('allTeams',allTeams);
    return (
      <form onSubmit={onSubmit}>
        <label>Выберите команду:</label>
        <select name="teamId" onChange={(e) => onChange(e.target.value)} required>
          {allTeams.map((team) => (
            <option key={team.id} value={team.id}>{team.name}</option>
          ))}
        </select>
        <button type="submit">Добавить существующую команду</button>
      </form>
    );
  }
  
  export default ExistingTeamForm;
  