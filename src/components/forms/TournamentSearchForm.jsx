import { useState, useMemo, useEffect } from "react";
import { debounce } from "lodash";
import { useTournaments } from "../../hooks/useTournaments";
import { getTournaments } from "../../api/apiTournaments";
const TournamentSearchForm = ({ onSearch, onClose }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [queryToSubmit, setQueryToSubmit] = useState(null); 
    const [searchResults, setSearchResults] = useState([]); 
    const [isLoading, setIsLoading] = useState(false); 
    const [error, setError] = useState(null);
  
   
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
  
    useEffect(() => {
      if (!queryToSubmit) {
        setSearchResults([]);
        setError(null);
        return;
      }
  
      const fetchTournaments = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const results = await getTournaments({ name: queryToSubmit });
          setSearchResults(results?.content || []);
        } catch (err) {
          console.error("Ошибка поиска турниров:", err);
          setError("Ошибка при загрузке турниров");
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchTournaments();
    }, [queryToSubmit]);
  
    return (
      <div>
        <form>
          <input
            type="text"
            placeholder="Введите название турнира"
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
          ) : searchResults.length > 0 ? (
            <div className="tournament-list">
              <ul>
                {searchResults.map((tournament) => (
                  <li key={tournament.id}>
                    {tournament.name}{" "}
                    <button
                      onClick={() => {
                        onSearch(tournament.id); 
                        onClose(); 
                      }}
                    >
                      Добавить
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>Турниры не найдены</p>
          )
        ) : (
          <p>Введите название турнира для поиска</p>
        )}
      </div>
    );
  };
export default TournamentSearchForm;  