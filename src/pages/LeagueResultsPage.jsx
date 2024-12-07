import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie'; 
import { API_URL } from '../api/apiHeaders';
import { withAuth } from '../api/apiHeaders';
import { getAuthHeaders } from '../api/apiHeaders';
import useManagerCheck from '../hooks/useManagerCheck';
const LeagueResults = () => {
  const [leagueId, setLeagueId] = useState(null);
  const [availableSystems, setAvailableSystems] = useState([]);
  const [resultsData, setResultsData] = useState([]);
  const [selectedSystem, setSelectedSystem] = useState('');

  useEffect(() => {
    const leagueIdFromCookie = Cookies.get('leagueId');
    if (leagueIdFromCookie) {
      setLeagueId(leagueIdFromCookie);
    } else {
      console.error('League ID не найден в cookies.');
    }
  }, []);

  const { isManager, errorManager } = useManagerCheck(leagueId); 
  if (errorManager) {
    return <p>Error loading manager status: {error.message}</p>;
}

  useEffect(() => {
    if (leagueId) {
      fetch(`${API_URL}/leagues/${leagueId}/results`)
        .then(async (response) => {
          const rawResponse = await response.text();
          if (response.ok) {
            try {
              const jsonResponse = JSON.parse(rawResponse);
              setResultsData(jsonResponse);
              console.log('results',jsonResponse);
              setSelectedSystem(jsonResponse.currentSystemId || '');
            } catch (error) {
              console.error("Ошибка парсинга JSON:", rawResponse, error);
            }
          } else {
            console.error('Ошибка ответа сервера:', response.statusText);
          }
        })
        .catch((error) => console.error("Ошибка загрузки данных:", error));
    }
  }, [leagueId]);

  useEffect(() => {
    fetch(`${API_URL}/system-results`)
      .then(async (response) => {
        const rawResponse = await response.text();
        if (response.ok) {
          try {
            const jsonResponse = JSON.parse(rawResponse);
            setAvailableSystems(jsonResponse);
          } catch (error) {
            console.error("Ошибка парсинга JSON:", rawResponse, error);
          }
        } else {
          console.error('Ошибка ответа сервера:', response.statusText);
        }
      })
      .catch((error) => console.error("Ошибка загрузки данных:", error));
  }, []);


  const handleSystemChange = (event) => {
    setSelectedSystem(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    withAuth(async (accessToken) => {
      try {
        const response = await fetch(`${API_URL}/leagues/${leagueId}/system-results?systemResultId=${selectedSystem}`, {
          method: 'PUT',
          headers: getAuthHeaders(accessToken),
        });
  
        if (!response.ok) {
          throw new Error('Ошибка при обновлении системы результатов');
        }
        const data = await response.text();
        console.log(data);  // Можно обработать ответ
      } catch (error) {
        console.error('Ошибка:', error);
      }
    });
  };
  

  if (!leagueId) {
    return <p>Определение текущей лиги...</p>;
  }

  if (!resultsData) {
    return <p>Загрузка данных...</p>;
  }

  const countGames = resultsData.length > 0 
    ? Math.max(...resultsData.map((entry) => Object.keys(entry.resultsByTour || {}).length))
    : 0;

  return (
    <div>
      <h1>Результаты лиги</h1>

      {/* Форма для выбора системы результатов */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="systemResultId">Выберите систему результатов:</label>
        <select
          id="systemResultId"
          value={selectedSystem}
          onChange={handleSystemChange}
        >
          {availableSystems.map((system) => (
            <option key={system.id} value={system.id}>
              {system.name}
            </option>
          ))}
        </select>
        <button type="submit">Изменить систему результатов</button>
      </form>

      {/* Таблица с результатами */}
      <table className="table">
        <thead>
          <tr>
            <th>Команда</th>
            {Array.from({ length: countGames }).map((_, index) => (
              <th key={index}>Тур {index + 1}</th>
            ))}
            <th>Суммарные баллы</th>
          </tr>
        </thead>
        <tbody>
          {resultsData.map((entry) => (
            <tr key={entry.teamId}>
              <td>{entry.teamName}</td>
              {Array.from({ length: countGames }).map((_, index) => (
                <td key={index}>
                  {entry.resultsByTour?.[index + 1] || 0}
                </td>
              ))}
              <td>{entry.totalScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeagueResults;
