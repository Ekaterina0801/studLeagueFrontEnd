import React from "react";

function TournamentTable({ tournaments, leagueId }) {
  if (tournaments.length === 0) {
    return <p>Турниров пока нет</p>;
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>№</th>
          <th>Id с сайта</th>
          <th>Название</th>
          <th>Дата начала турнира</th>
          <th>Дата завершения турнира</th>
          <th>Результаты</th>
        </tr>
      </thead>
      <tbody>
        {tournaments.map((tournament, index) => (
          <tr key={tournament.id}>
            <td>{index + 1}</td>
            <td><a href="#">{tournament.idSite}</a></td>
            <td>{tournament.name}</td>
            <td>{tournament.dateOfStart}</td>
            <td>{tournament.dateOfEnd}</td>
            <td><a href={`/leagues/${leagueId}/tournaments/${tournament.id}/results`}>Результаты</a></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TournamentTable;
