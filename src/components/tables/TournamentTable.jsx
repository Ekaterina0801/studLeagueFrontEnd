import React, { useState } from "react";

function TournamentTable({ tournaments, leagueId, onSortChange, sortField, sortDirection }) {
  const [sort, setSort] = useState({ field: "name", direction: "asc" });
  const getSortIndicator = (field) => {
    if (sortField === field) {
      return sortDirection === "asc" ? "▲" : "▼";
    }
    return "▲";
  };

  if (tournaments.length === 0) {
    return <p>Турниров пока нет</p>;
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>
            № 
          </th>
          <th onClick={() => onSortChange("idSite")}>
            Id с сайта {getSortIndicator("idSite")}
          </th>
          <th onClick={() => onSortChange("name")}>
            Название {getSortIndicator("name")}
          </th>
          <th onClick={() => onSortChange("dateOfStart")}>
            Дата начала турнира {getSortIndicator("dateOfStart")}
          </th>
          <th onClick={() => onSortChange("dateOfEnd")}>
            Дата завершения турнира {getSortIndicator("dateOfEnd")}
          </th>
          <th>Результаты</th>
        </tr>
      </thead>
      <tbody>
        {tournaments.map((tournament, index) => (
          <tr key={tournament.id}>
            <td>{index + 1}</td>
            <td><a href="#">{tournament.idSite}</a></td>
            <td>{tournament.name}</td>
            <td>{tournament.dateStart}</td>
            <td>{tournament.dateEnd}</td>
            <td><a href={`/tournaments/${tournament.id}/results`}>Результаты</a></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TournamentTable;

