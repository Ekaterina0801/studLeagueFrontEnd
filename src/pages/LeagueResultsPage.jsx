import React, { useState, useEffect } from "react";
import { API_URL } from "../api/apiHeaders";
import { withAuth } from "../api/apiHeaders";
import { getAuthHeaders } from "../api/apiHeaders";
import useManagerCheck from "../hooks/useManagerCheck";
import { useLeagueId } from "../hooks/useLeagueId";
import { useResultsData } from "../hooks/useResultsData";
import { useAvailableSystems } from "../hooks/useAvailableSystems";
import { useModal } from "../hooks/useModal";
import ResultsTable from "../components/tables/Resultstable";
import Modal from "../components/forms/Modal/Modal";
import { useLeagueData } from "../hooks/useLeagueData";
import { addNewLeague } from "../api/apiLeagues";
const LeagueResults = () => {
    const leagueId = useLeagueId();
    const availableSystems = useAvailableSystems();
    const resultsData = useResultsData(leagueId);
    const leagueData = useLeagueData(leagueId);
    const [message, setMessage] = useState('');
    const [selectedSystem, setSelectedSystem] = useState('');
    const [excludedGames, setExcludedGames] = useState(0); 

    useEffect(() => {
      if (leagueData) {
        setSelectedSystem(leagueData.systemResultId);
        setExcludedGames(leagueData.countExcludedGames);
      }
    }, [leagueData]);
    const { showModal, toggleModal } = useModal();
    
  
    const { isManager, errorManager } = useManagerCheck(leagueId);
    if (errorManager) {
      return <p>Error loading manager status: {errorManager.message}</p>;
    }
    const handleCountGamesChange = (event) => {
      setExcludedGames(event.target.value);
    };

    const handleGameExclusionSubmit = async (event) => {
      event.preventDefault();
      console.log(excludedGames)
      withAuth(async (accessToken) => {
        try {
          const response = await fetch(
            `${API_URL}/leagues/${leagueId}/excluded-games?countGames=${excludedGames}`,
            {
              method: "PUT",
              headers: getAuthHeaders(accessToken),
            }
          );
  
          if (!response.ok) {
            throw new Error("Ошибка при обновлении системы результатов");
          }
          setMessage('Система успешно изменена!');
      setTimeout(() => {
        window.location.reload();
    }, 2000);
        } catch (error) {
          console.error("Ошибка:", error);
        }
      });
    
    };
    
  
    const handleSystemChange = (event) => {
      setSelectedSystem(event.target.value);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      setMessage('Система успешно изменена!');
      setTimeout(() => {
        window.location.reload();
    }, 2000);
      withAuth(async (accessToken) => {
        try {
          const response = await fetch(
            `${API_URL}/leagues/${leagueId}/system-results?systemResultId=${selectedSystem}`,
            {
              method: "PUT",
              headers: getAuthHeaders(accessToken),
            }
          );
  
          if (!response.ok) {
            throw new Error("Ошибка при обновлении системы результатов");
          }
          setMessage('Система успешно изменена!');
      setTimeout(() => {
        window.location.reload();
    }, 2000);
        } catch (error) {
          console.error("Ошибка:", error);
        }
      });
    };
  
    if (!leagueId) {
      return <p>Определение текущей лиги...</p>;
    }
  
    if (!resultsData) {
      return <p>Загрузка данных...</p>;
    }
  
    const countGames =
      resultsData.length > 0
        ? Math.max(
            ...resultsData.map(
              (entry) => Object.keys(entry.resultsByTour || {}).length
            )
          )
        : 0;
  
    return (
      <div>
        <h1>Результаты лиги</h1>
        {message && <p className="success-message">{message}</p>}
        {isManager && (
          <button onClick={toggleModal}>Изменить систему результатов</button>
        )}
        {showModal && (
         <Modal show={showModal} onClose={toggleModal}>
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
       
         {/* Новая кнопка и форма для изменения количества игр */}
         <form onSubmit={handleGameExclusionSubmit} style={{ marginTop: "20px" }}>
           <label htmlFor="excludedGames">
             Укажите количество игр, которые не включаются:
           </label>
           <input
             type="number"
             id="excludedGames"
             min="0"
             value={excludedGames}
             onChange={handleCountGamesChange}
           />
           <button type="submit">Изменить количество игр</button>
         </form>
       </Modal>
       
        )}
  
        {resultsData && resultsData.length > 0 ? (
          <ResultsTable resultsData={resultsData} countGames={countGames} />
        ) : (
          <p>Нет результатов для отображения</p>
        )}
      </div>
    );
  };
  
  export default LeagueResults;
  