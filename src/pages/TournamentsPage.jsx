import React, { useState } from "react";
import Modal from "../components/forms/Modal/Modal";
import TournamentForm from "../components/forms/TournamentForm"
import ExistingTournamentForm from "../components/forms/ExistingTournamentForm";
import SiteTournamentForm from "../components/forms/SiteTournamentForm";
import TournamentTable from "../components/tables/TournamentTable"
import Cookies from 'js-cookie'; // Assuming you are using js-cookie for cookie management

function TournamentsPage({ allTournaments }) {
  const [showModal, setShowModal] = useState(false);
  const [newTournament, setNewTournament] = useState({ name: "", dateOfStart: "", dateOfEnd: "", leagueId: "" });
  const [existingTournamentId, setExistingTournamentId] = useState("");
  const [siteTournamentId, setSiteTournamentId] = useState("");
  const [filters, setFilters] = useState({ leagueId: "" });
  const [sort, setSort] = useState({ field: "name", direction: "asc" });

  // Effect to get league ID from cookies when the component mounts
  useEffect(() => {
    const leagueIdFromCookie = Cookies.get("leagueId");
    if (leagueIdFromCookie) {
      setFilters({ leagueId: leagueIdFromCookie }); // Set filter for league ID from cookies
    }
  }, []);

  // Print current filters for debugging
  useEffect(() => {
    console.log("Current filters: ", filters);
  }, [filters]);

  // Fetch tournaments using a custom hook
  const { tournaments, isLoading, error } = useTournaments(filters, sort);

  const toggleModal = () => setShowModal(prev => !prev);

  const handleNewTournamentChange = (e) => {
    const { name, value } = e.target;
    setNewTournament(prevTournament => ({ ...prevTournament, [name]: value }));
  };

  const handleNewTournamentSubmit = (e) => {
    e.preventDefault();
    console.log("Adding new tournament:", newTournament);
    toggleModal(); 
    // Add API call to save the tournament here
  };

  const handleExistingTournamentSubmit = (e) => {
    e.preventDefault();
    console.log("Adding existing tournament:", existingTournamentId);
    toggleModal(); 
    // Add API call to associate the existing tournament here
  };

  const handleSiteTournamentSubmit = (e) => {
    e.preventDefault();
    console.log("Adding tournament from site with ID:", siteTournamentId);
    toggleModal(); 
    // Add API call to fetch the tournament by ID here
  };

  const handleSortChange = (field) => {
    const newSortDirection = sort.field === field && sort.direction === "asc" ? "desc" : "asc";
    setSort({ field, direction: newSortDirection });
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
      <button onClick={toggleModal}>Добавить новый или существующий турнир</button>

      <Modal show={showModal} onClose={toggleModal}>
        <h2>Добавление нового турнира</h2>
        <TournamentForm 
          newTournament={newTournament} 
          onChange={handleNewTournamentChange} 
          onSubmit={handleNewTournamentSubmit} 
        />

        <h2>Добавить существующий турнир</h2>
        <ExistingTournamentForm 
          allTournaments={allTournaments} 
          onChange={setExistingTournamentId} 
          onSubmit={handleExistingTournamentSubmit} 
        />

        <h2>Добавить турнир с сайта МАК</h2>
        <SiteTournamentForm 
          siteTournamentId={siteTournamentId} 
          onChange={(e) => setSiteTournamentId(e.target.value)} 
          onSubmit={handleSiteTournamentSubmit} 
        />
      </Modal>

      <TournamentTable tournaments={tournaments} leagueId={filters.leagueId} />
    </div>
  );
}

export default TournamentsPage;
