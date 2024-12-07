import React, { useState, useEffect } from "react";
import Modal from "../components/forms/Modal/Modal";
import TournamentForm from "../components/forms/TournamentForm"
import ExistingTournamentForm from "../components/forms/ExistingTournamentForm";
import SiteTournamentForm from "../components/forms/SiteTournamentForm";
import TournamentTable from "../components/tables/TournamentTable"
import useTournaments from "../hooks/useTournaments";
import SearchBar from "../components/search-bar/SearchBar";
import { useLeagueId } from "../hooks/useLeagueId";
import { useModal } from "../hooks/useModal";
import { useNewTournament } from "../hooks/useNewTournament";
const TournamentsPage = () => {
  const leagueId = useLeagueId();
  const { isModalOpen, toggleModal } = useModal();
  const { newTournament, handleChange, handleSubmit } = useNewTournament(leagueId);

  const [searchInput, setSearchInput] = useState("");
  const [existingTournamentId, setExistingTournamentId] = useState("");
  const [siteTournamentId, setSiteTournamentId] = useState("");

  const [filters, setFilters] = useState({ leagueId: leagueId });
  const [sort, setSort] = useState({ field: "name", direction: "asc" });
  const [currentPage, setCurrentPage] = useState(0);

  const { tournaments, totalPages, isLoading, error } = useTournaments(filters, sort, currentPage);
  console.log('tourn',tournaments);
  useEffect(() => {
    if (leagueId) {
      setFilters((prev) => ({ ...prev, leagueId }));
    }
  }, [leagueId]);
  
  const handleSearch = (input) => {
    setSearchInput(input);
    setFilters((prevFilters) => ({ ...prevFilters, name: input }));
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

  return (
    <div>
      <h2>Турниры</h2>
      <SearchBar onSearch={handleSearch} />
      <button onClick={toggleModal}>Добавить новый или существующий турнир</button>

      <Modal show={isModalOpen} onClose={toggleModal}>
        <TournamentForm newTournament={newTournament} onChange={handleChange} onSubmit={handleSubmit} />
        <ExistingTournamentForm
          allTournaments={tournaments}
          existingTournamentId={existingTournamentId}
          onChange={setExistingTournamentId}
        />
        <SiteTournamentForm
          siteTournamentId={siteTournamentId}
          onChange={setSiteTournamentId}
        />
      </Modal>

      <TournamentTable
        tournaments={tournaments}
        onSortChange={handleSortChange}
        sortField={sort.field}
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