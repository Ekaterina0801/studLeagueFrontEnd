import React, { useState, useEffect } from "react";
import Modal from "../components/forms/Modal/Modal";
import TournamentForm from "../components/forms/TournamentForm";
import ExistingTournamentForm from "../components/forms/ExistingTournamentForm";
import SiteTournamentForm from "../components/forms/SiteTournamentForm";
import TournamentTable from "../components/tables/TournamentTable";
import { useTournaments } from "../hooks/useTournaments";
import SearchBar from "../components/search-bar/SearchBar";
import { useLeagueId } from "../hooks/useLeagueId";
import { useModal } from "../hooks/useModal";
import { useNewTournament } from "../hooks/useNewTournament";
import useManagerCheck from "../hooks/useManagerCheck";
import {
  addTournamentToLeague,
  deleteTournamentFromLeague,
} from "../api/apiLeagues";
import { useDispatch } from "react-redux";
import { removeTournament } from "../actions/tournamentsAction";
import TournamentSearchForm from "../components/forms/TournamentSearchForm";
import { addTeamsToTournament } from "../api/apiMak";
import Loader from "../components/spinner/Spinner";
import SuccessMessage from "../components/successMessage/SuccessMessage";
import { addNewTournament } from "../api/apiTournaments";
import ErrorMessage from "../components/errorMessage/ErrorMessage";
const TournamentsPage = () => {
  const leagueId = useLeagueId();
  const dispatch = useDispatch();
  const { showModal, toggleModal } = useModal();
  const { newTournament, handleChange} =
    useNewTournament(leagueId);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const [existingTournamentId, setExistingTournamentId] = useState("");
  const [siteTournamentId, setSiteTournamentId] = useState("");

  const [filters, setFilters] = useState({ leagueId: leagueId });
  const [sort, setSort] = useState({ field: "name", direction: "asc" });
  const [currentPage, setCurrentPage] = useState(0);

  const { tournaments, totalPages, isLoading, error, refetch } = useTournaments(
    filters,
    sort,
    currentPage
  );
  const { isManager, errorManager } = useManagerCheck(leagueId);

  useEffect(() => {
    if (leagueId) {
      setFilters((prev) => ({ ...prev, leagueId }));
    }
  }, [leagueId]);

  const handleTournamentRemove = async (tournamentId) => {
    const confirmed = window.confirm(
      "Вы уверены, что хотите удалить этот турнир?"
    );
    if (!confirmed) return;
    setLoading(true);
    try {
      await deleteTournamentFromLeague(leagueId, tournamentId);
      dispatch(removeTournament(tournamentId));
      setSuccessMessage("Турнир успешно удален");
    } catch (error) {
      console.error("Ошибка при удалении турнира:", error);
      setErrorMessage("Не удалось удалить турнир. Попробуйте позже");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    newTournament.leaguesIds = [leagueId];

    const startDate = newTournament.dateStart ? new Date(newTournament.dateStart) : null;
    const endDate = newTournament.dateEnd ? new Date(newTournament.dateEnd) : null;

    const formattedTournament = {
      ...newTournament,
      dateStart: startDate ? startDate.toISOString().slice(0, 19) : null,
      dateEnd: endDate ? endDate.toISOString().slice(0, 19) : null,
    };

    try {
      if (!formattedTournament.name || !formattedTournament.dateStart || !formattedTournament.dateEnd) {
        alert("Заполните все обязательные поля.");
        return;
      }

      await addNewTournament(formattedTournament);
      setSuccessMessage("Турнир успешно добавлен!");
      refetch();
      toggleModal();
    } catch (error) {
      console.error("Ошибка при создании турнира:", error);
      setErrorMessage("Не удалось создать турнир");
    }
    finally{
      setLoading(false);
    }
  };

  const handleSearch = (input) => {
    setSearchInput(input);
    setFilters((prevFilters) => ({ ...prevFilters, name: input }));
  };

  const handleTournamentSearchSubmit = async (tournamentId) => {
    setLoading(true);
    try {
      await addTournamentToLeague(tournamentId, leagueId);
      setSearchResults([]);
      refetch();
    } catch (err) {
      console.error("Ошибка поиска", err);
      alert("Не удалось найти турнир");
    } finally {
      setLoading(false);
    }
  };

  const handleTournamentSiteSubmit = async (e, siteTournamentId) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addTeamsToTournament(leagueId, siteTournamentId);
      refetch();
      setSuccessMessage("Турнир с сайта успешно добавлен!");
    } catch (err) {
      console.error("Ошибка добавления турнира к лиге:", err);
      setErrorMessage("Не удалось добавить турнир");
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = (field) => {
    const newDirection =
      sort.field === field && sort.direction === "asc" ? "desc" : "asc";
    setSort({ field, direction: newDirection });
  };

  const handlePageChange = (page) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Турниры</h2>
      {loading && <Loader />}
      {successMessage && <SuccessMessage message={successMessage} />}
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <SearchBar onSearch={handleSearch} />
      {isManager && (
        <button onClick={toggleModal}>
          Добавить новый или существующий турнир
        </button>
      )}

      {showModal && (
        <Modal show={showModal} onClose={toggleModal}>
          <TournamentForm
            newTournament={newTournament}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
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
          <button
            key={index}
            onClick={() => handlePageChange(index)}
            disabled={index === currentPage}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TournamentsPage;
