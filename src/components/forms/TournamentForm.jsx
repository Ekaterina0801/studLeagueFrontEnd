import React from "react";

function TournamentForm({ newTournament, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <label>Название турнира:</label>
      <input type="text" name="name" value={newTournament.name} onChange={onChange} required />

      <label>Дата начала:</label>
      <input type="date" name="dateOfStart" value={newTournament.dateOfStart} onChange={onChange} required />

      <label>Дата завершения:</label>
      <input type="date" name="dateOfEnd" value={newTournament.dateOfEnd} onChange={onChange} required />
      
      <button type="submit">Добавить новый турнир</button>
    </form>
  );
}

export default TournamentForm;
