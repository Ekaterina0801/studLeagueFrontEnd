import React, { useState, useEffect } from 'react';
import { getSystemResults } from '../../api/apiSystemResult';
function LeagueForm({ newLeague, systemResults, onChange, onSubmit }) {

  return (
    <form onSubmit={onSubmit}>
      <label>Название лиги:</label>
      <input 
        type="text" 
        name="name" 
        value={newLeague.name} 
        onChange={onChange} 
        required 
      />
      <label>Система результатов:</label>
      <select 
        name="systemResultId" 
        value={newLeague.systemResultId} 
        onChange={onChange} 
      >
        <option value="">Выберите систему результатов</option>
        {systemResults.map((result) => (
          <option key={result.id} value={result.id}>
            {result.name} 
          </option>
        ))}
      </select>

      <button type="submit">Добавить лигу</button>
    </form>
  );
}

export default LeagueForm;
