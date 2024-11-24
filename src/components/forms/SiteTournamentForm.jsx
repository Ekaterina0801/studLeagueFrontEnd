import React from "react";

function SiteTournamentForm({ siteTournamentId, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <label>Айди с сайта МАК:</label>
      <input type="text" name="idSite" value={siteTournamentId} onChange={(e) => onChange(e.target.value)} required />
      <button type="submit">Добавить турнир</button>
    </form>
  );
}

export default SiteTournamentForm;
