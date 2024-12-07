import React from "react";
import "./style.css"

function TeamTable({ teams, leagueId, onSortChange, sortField, sortDirection }) {
  if (teams.length === 0) {
    return <p>Команд пока нет</p>;
  }

  const getSortIndicator = (field) => {
    if (sortField === field) {
      return sortDirection === "asc" ? "▲" : "▼";
    }
    return "▲";
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>
            № 
          </th>
          <th onClick={() => onSortChange("idSite")}>
            МАК ID {getSortIndicator("idSite")}
          </th>
          <th onClick={() => onSortChange("teamName")}>
            Название {getSortIndicator("teamName")}
          </th>
        </tr>
      </thead>
      <tbody>
        {teams.map((team, index) => (
          <tr key={team.id}>
            <td>{index + 1}</td>
            <td>{team.idSite}</td>
            <td>
              <a href={`/leagues/${leagueId}/teams/${team.id}`}>{team.name}</a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TeamTable;


