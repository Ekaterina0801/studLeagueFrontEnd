import React from "react";

function ExistingTournamentForm({ allTournaments, onChange, onSubmit, existingTournamentId }) {
  return (
    <form onSubmit={onSubmit}>
      <label>Выберите турнир:</label>
      <select
        name="tournamentId"
        value={existingTournamentId}  
        onChange={(e) => onChange(e.target.value)} 
        required
      >
        {allTournaments.map((tournament) => (
          <option key={tournament.id} value={tournament.id}>
            {tournament.name}
          </option>
        ))}
      </select>
      <button type="submit">Добавить существующий турнир</button>
    </form>
  );
}
export default ExistingTournamentForm;