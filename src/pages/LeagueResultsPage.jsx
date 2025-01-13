import React, { useState, useEffect } from "react";
import useManagerCheck from "../hooks/useManagerCheck";
import { useLeagueId } from "../hooks/useLeagueId";
import { useResultsData } from "../hooks/useResultsData";
import { useAvailableSystems } from "../hooks/useAvailableSystems";
import { useModal } from "../hooks/useModal";
import ResultsTable from "../components/tables/ResultsTable";
import Modal from "../components/forms/Modal/Modal";
import { useLeagueData } from "../hooks/useLeagueData";
import { changeSystemResult, updateExcludedGames } from "../api/apiLeagues";
import Loader from "../components/spinner/Spinner";
import SuccessMessage from "../components/successMessage/SuccessMessage";
import ErrorMessage from "../components/errorMessage/ErrorMessage";
const LeagueResults = () => {
  const leagueId = useLeagueId();
  const availableSystems = useAvailableSystems();
  const resultsData = useResultsData(leagueId);
  const leagueData = useLeagueData(leagueId);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedSystem, setSelectedSystem] = useState("");
  const [excludedGames, setExcludedGames] = useState(0);
  const [loading, setLoading] = useState(false);

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
    setLoading(true); 
    try {
      await updateExcludedGames(leagueId, excludedGames);
      setSuccessMessage("Количество игр успешно изменено!");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      setErrorMessage("Произошла ошибка редактирования");
      console.error("Ошибка:", error);
    } finally {
      setLoading(false); 
    }
  };

  const handleSystemChange = (event) => {
    setSelectedSystem(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); 
    try {
      await changeSystemResult(leagueId, selectedSystem);
      setSuccessMessage("Система успешно изменена!");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      setErrorMessage("Произошла ошибка редактирования");
      console.error("Ошибка:", error);
    } finally {
      setLoading(false); 
    }
  };

  if (!leagueId) {
    return <Loader />; 
  }

  if (!resultsData) {
    return <Loader />; 
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
      {loading && <Loader />} 
      <h1>Результаты лиги</h1>
      {successMessage && <SuccessMessage message={successMessage} />}
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {isManager && (
        <button onClick={toggleModal}>Изменить систему результатов</button>
      )}
      {showModal && (
        <Modal show={showModal} onClose={toggleModal}>
          <form onSubmit={handleSubmit}>
            <label htmlFor="systemResultId">
              Выберите систему результатов:
            </label>
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

          <form
            onSubmit={handleGameExclusionSubmit}
            style={{ marginTop: "20px" }}
          >
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
