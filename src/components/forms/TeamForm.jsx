import React from "react";

import "./style.css"

function TeamForm({ newTeam, onChange, onSubmit, message }) {
  return (
    <form onSubmit={onSubmit}>
       {message && <p className="success-message">{message}</p>}
      <label>Название команды:</label>
      <input type="text" name="teamName" value={newTeam.teamName} onChange={onChange} required />

      <label>Университет:</label>
      <input type="text" name="university" value={newTeam.university} onChange={onChange} required />

      <label>ID сайта МАК:</label>
      <input type="text" name="idSite" value={newTeam.idSite} onChange={onChange} />

      <button type="submit">Добавить команду</button>
    </form>
  );
}

export default TeamForm;

