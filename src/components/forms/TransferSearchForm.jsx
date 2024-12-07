import React, { useState, useMemo, useEffect } from "react";
import debounce from "lodash.debounce";
import useTeams from "../../hooks/useTeams";
import { useCallback } from "react";
const TransferSearchForm = ({ onSubmit, onClose, selectedLeagueId }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
  
    // Дебаунс строки поиска
    const handleSearchChange = useMemo(
      () =>
        debounce((value) => {
          setDebouncedQuery(value.trim());
        }, 500),
      []
    );
  
    useEffect(() => {
      return () => handleSearchChange.cancel();
    }, [handleSearchChange]);
  
    const filters = useMemo(
      () => ({
        name: debouncedQuery || "",
        leagueId: selectedLeagueId || null,
      }),
      [debouncedQuery, selectedLeagueId]
    );
  
    const { teams, isLoading, error } = useTeams(
      filters,
      { field: "teamName", direction: "asc" },
      0
    );
  
    const handleTeamSelect = useCallback((teamId) => {
      onSubmit(teamId);
      onClose();
    }, [onSubmit, onClose]);
  
    return (
      <div>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Введите название команды"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              handleSearchChange(e.target.value);
            }}
          />
        </form>
  
        {debouncedQuery ? (
          isLoading ? (
            <p>Загрузка...</p>
          ) : error ? (
            <p style={{ color: "red" }}>Ошибка: {error}</p>
          ) : teams?.length > 0 ? (
            <ul>
              {teams.map((team) => (
                <li key={team.id}>
                  <span>{team.name}</span>
                  <button onClick={() => handleTeamSelect(team.id)}>Выбрать</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Команды не найдены</p>
          )
        ) : (
          <p>Введите название команды для поиска</p>
        )}
      </div>
    );
  };
  export default TransferSearchForm;