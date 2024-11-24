import React from "react";

import "./style.css"

function SiteTeamForm({ siteTeamId, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <label>Site Team ID:</label>
      <input type="text" value={siteTeamId} onChange={onChange} required />
      <button type="submit">Add Site Team</button>
    </form>
  );
}

export default SiteTeamForm;
