import React from "react";


function TournamentForm({ newTournament, onChange, onSubmit }) {


  return (
    <form onSubmit={onSubmit}>
      <label>Название турнира:</label>
      <input
        type="text"
        name="name"
        value={newTournament.name}
        onChange={onChange}
        required
      />

      <label>Дата начала:</label>
      <input
        type="date"
        name="dateStart"
        value={newTournament.dateOfStart}
        onChange={onChange}
        required
      />

      <label>Дата завершения:</label>
      <input
        type="date"
        name="dateEnd"
        value={newTournament.dateOfEnd}
        onChange={onChange}
        required
      />

      {/* Скрытое поле для leagueId */}
      <input
        type="hidden"
        name="leagueId"
        value={newTournament.leagueId} 
      />

      <button type="submit">Добавить новый турнир</button>
    </form>
  );
}
export default TournamentForm;