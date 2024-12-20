import React from "react";

function SiteTournamentForm({ siteTournamentId, onChange, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault(); 
    onSubmit(e,siteTournamentId);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Айди с сайта МАК:</label>
      <input
        type="text"
        name="idSite"
        value={siteTournamentId || ''}  
        onChange={(e) => onChange(e.target.value)} 
        required
      />
      <button type="submit">Добавить турнир</button>
    </form>
  );
}

export default SiteTournamentForm;
