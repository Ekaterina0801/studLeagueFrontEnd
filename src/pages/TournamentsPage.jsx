import React, { useState, useEffect } from "react";
import Modal from "../components/forms/Modal/Modal";
import TournamentForm from "../components/forms/TournamentForm"
import ExistingTournamentForm from "../components/forms/ExistingTournamentForm";
import SiteTournamentForm from "../components/forms/SiteTournamentForm";
import TournamentTable from "../components/tables/TournamentTable"
import { useTournaments } from "../hooks/useTournaments";
import SearchBar from "../components/search-bar/SearchBar";
import { useLeagueId } from "../hooks/useLeagueId";
import { useModal } from "../hooks/useModal";
import { useNewTournament } from "../hooks/useNewTournament";
import useManagerCheck from "../hooks/useManagerCheck";
import { addTournamentToLeague, deleteTournamentFromLeague } from "../api/apiLeagues";
import { useDispatch } from "react-redux";
import { removeTournament } from "../actions/tournamentsAction";
import TournamentSearchForm from "../components/forms/TournamentSearchForm";
import { getTournaments } from "../api/apiTournaments";
import useSuccessMessage from "../hooks/useSuccessMessage";
import { addTeamsToTournament } from "../api/apiMak";

const TournamentsPage = () => {
  const leagueId = useLeagueId();
  const dispatch = useDispatch();
  const { showModal, toggleModal } = useModal(); 
  const { newTournament, handleChange, handleSubmit } = useNewTournament(leagueId);
  const [searchResults, setSearchResults] = useState([]);
  const { successMessage, showSuccessMessage } = useSuccessMessage();


  const [searchInput, setSearchInput] = useState("");
  const [existingTournamentId, setExistingTournamentId] = useState("");
  const [siteTournamentId, setSiteTournamentId] = useState("");

  const [filters, setFilters] = useState({ leagueId: leagueId });
  const [sort, setSort] = useState({ field: "name", direction: "asc" });
  const [currentPage, setCurrentPage] = useState(0);

  const { tournaments, totalPages, isLoading, error, refetch } = useTournaments(filters, sort, currentPage);
  const { isManager, errorManager } = useManagerCheck(leagueId);

  useEffect(() => {
    if (leagueId) {
      setFilters((prev) => ({ ...prev, leagueId }));
    }
  }, [leagueId]);

  const handleTournamentRemove = async (tournamentId) => {
    const confirmed = window.confirm("Вы уверены, что хотите удалить этот турнир?");
    if (!confirmed) return;

    try {
      await deleteTournamentFromLeague(leagueId, tournamentId);
      dispatch(removeTournament(tournamentId)); 
    } catch (error) {
      console.error("Ошибка при удалении турнира:", error);
      alert("Не удалось удалить турнир. Попробуйте позже.");
    }
  };

  const handleSearch = (input) => {
    setSearchInput(input);
    setFilters((prevFilters) => ({ ...prevFilters, name: input }));
  };

const handleTournamentSearchSubmit = async (tournamentId) => {
  try {
    await addTournamentToLeague(tournamentId, leagueId);
    setSearchResults([]); 
    refetch();
    setTimeout(() => setSuccessMessage(""), 3000);
  } catch (err) {
    console.error("Ошибка добавления турнира к лиге:", err);
    alert("Не удалось добавить турнир.");
  }
};

const handleTournamentSiteSubmit = async (e, siteTournamentId) => {
  e.preventDefault();
  
  try {
    await addTeamsToTournament(leagueId, siteTournamentId);
    refetch();
    // setSuccessMessage("Турнир успешно добавлен");
    setTimeout(() => setSuccessMessage(""), 3000);
  } catch (err) {
    console.error("Ошибка добавления турнира к лиге:", err);
    alert("Не удалось добавить турнир.");
  }
};


  const handleModalSearch = async (input) => {
    try {
      const searchResultsData = await getTournaments({ name: input, leagueId }, sort, 0, 10);
      setSearchResults(searchResultsData.content || []);
    } catch (error) {
      console.error("Ошибка поиска турниров:", error);
      setSearchResults([]);
    }
  };
  

  const handleSortChange = (field) => {
    const newDirection = sort.field === field && sort.direction === "asc" ? "desc" : "asc";
    setSort({ field, direction: newDirection });
  };

  const handlePageChange = (page) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  if (isLoading) {
    return <div>Загрузка турниров...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Турниры</h2>
      {/* Добавление формы поиска турнир */}
      <SearchBar onSearch={handleSearch} />

      {isManager && (
        <button onClick={toggleModal}>Добавить новый или существующий турнир</button>
      )}

      {showModal && (
        <Modal show={showModal} onClose={toggleModal}>
          <TournamentForm newTournament={newTournament} onChange={handleChange} onSubmit={handleSubmit} />
          <TournamentSearchForm
      onSearch={handleTournamentSearchSubmit}
      searchResults={searchResults} 
      onClose={toggleModal}
    />
          <ExistingTournamentForm
            allTournaments={tournaments}
            existingTournamentId={existingTournamentId}
            onChange={setExistingTournamentId}
          />
          <SiteTournamentForm
            siteTournamentId={siteTournamentId}
            onChange={setSiteTournamentId}
            onSubmit={handleTournamentSiteSubmit}
          />
        </Modal>
      )}

      <TournamentTable
        tournaments={tournaments}
        onSortChange={handleSortChange}
        sortField={sort.field}
        onTournamentRemove={handleTournamentRemove} 
        showDeleteButton={isManager}
      />

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => handlePageChange(index)} disabled={index === currentPage}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TournamentsPage;
