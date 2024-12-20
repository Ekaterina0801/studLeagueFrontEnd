import React from 'react';
const ResultsTable = ({ resultsData, countGames }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>#</th> 
          <th>Команда</th>
          {Array.from({ length: countGames }).map((_, index) => (
            <th key={index}>Тур {index + 1}</th>
          ))}
          <th>Суммарные баллы</th>
        </tr>
      </thead>
      <tbody>
        {resultsData.map((entry, rowIndex) => (
          <tr key={entry.teamId}>
            <td>{rowIndex + 1}</td> 
            <td>{entry.teamName}</td>
            {Array.from({ length: countGames }).map((_, index) => (
              <td key={index}>{entry.resultsByTour?.[index + 1] || "-"}</td>
            ))}
            <td>{entry.totalScore}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ResultsTable;

