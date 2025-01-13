import React, { useState } from "react";
import moment from "moment";
function TournamentTable({ tournaments, onSortChange, sortField, onTournamentRemove, showDeleteButton }) {

  const getSortIndicator = (field) => {
    if (sortField === field) {
      return "▲";
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
          <th>№</th>
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
          {showDeleteButton && ( <th>Удалить</th>)}
        </tr>
      </thead>
      <tbody>
        {tournaments.map((tournament, index) => (
          <tr key={tournament.id}>
            <td>{index + 1}</td>
            <td><a href="#">{tournament.idSite}</a></td>
            <td><a href={`/tournaments/${tournament.id}/results`}>{tournament.name}</a></td>
            <td>{moment(tournament.dateStart).format("DD.MM.YYYY HH:mm")}</td>
            <td>{moment(tournament.dateEnd).format("DD.MM.YYYY HH:mm")}</td>
            {showDeleteButton &&(
              <td>
              <span
                className="remove-icon"
                onClick={() => onTournamentRemove(tournament.id)}
              >
                🗑️
              </span>
              <span className="remove-tooltip">Удалить турнир</span>
            </td>
            )}
            
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TournamentTable;
