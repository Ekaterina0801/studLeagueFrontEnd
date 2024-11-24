import React from "react";

function TeamTable({ teams, leagueId }) {
  if (teams.length === 0) {
    return <p>Команд пока нет</p>;
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>№</th>
          <th>МАК ID</th>
          <th>Название</th>
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

