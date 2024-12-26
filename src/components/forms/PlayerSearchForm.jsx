
import usePlayers from "../../hooks/usePlayers";
import { useState, useEffect, useMemo } from "react";
import debounce from "lodash.debounce";


const PlayerSearchForm = ({ onSubmit, onClose}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [queryToSubmit, setQueryToSubmit] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (playerId) {
      onSubmit(playerId);
      onClose(); 
    }
  };

  const handleSearchChange = useMemo(
    () =>
      debounce((value) => {
        setQueryToSubmit(value.trim() || null); 
      }, 500), 
    []
  );


  useEffect(() => {
    return () => handleSearchChange.cancel();
  }, [handleSearchChange]);


  const filters = useMemo(() => {
    const parts = (queryToSubmit || "").split(" ").filter(Boolean);
    return {
      name: parts[1] || "", 
      surname: parts[0] || "", 
      patronymic: parts[2] || "", 
      teamId: null,
      bornBefore: null,
      bornAfter: null,
    };
  }, [queryToSubmit]);

  const sort = useMemo(() => ({
    field: "surname",
    direction: "asc",
  }), []);

  const { players, isLoading, error } = usePlayers(filters, sort, 0);

  return (
    <div>
        <form onSubmit={handleSubmit}>


      <input
        type="text"
        placeholder="Введите фамилию, имя и отчество игрока"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value); 
          handleSearchChange(e.target.value); 
        }}
      />
              </form>
      {queryToSubmit ? (
        isLoading ? (
          <p>Загрузка...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : players.length > 0 ? (
            <div className="player-list">
            <ul>
              {players.map((player) => (
                <li key={player.id}>
                {player.id} {player.surname} {player.name} {player.patronymic}{" "}
                <button onClick={() => {
                  onSubmit(player.id); 
                  onClose(); 
                }}>
                  Добавить
                </button>
              </li>
              ))}
            </ul>
          </div>
          
        ) : (
          <p>Игроки не найдены</p>
        )
      ) : (
        <p>Введите фамилию, имя и отчество для поиска игроков</p>
      )}
    </div>
  );
};

export default PlayerSearchForm;
