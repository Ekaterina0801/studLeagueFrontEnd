import React, { useState,useEffect } from "react";
import Modal from "../components/forms/Modal/Modal";
import TeamForm from"../components/forms/TeamForm";
import SiteTeamForm from "../components/forms/SiteTeamForm";
import TeamTable from "../components/tables/TeamTable";
import MainContent from "../components/main-section/MainSection";
import useTeams from "../hooks/useTeams";
import SearchBar from "../components/search-bar/SearchBar";
import useManagerCheck from "../hooks/useManagerCheck";
import { useModal } from "../hooks/useModal";
import useSearch from "../hooks/useSearch";
import useNewTeam from "../hooks/useNewTeam";
import { useLeagueId } from "../hooks/useLeagueId";
import { useDispatch } from "react-redux";
import { deleteTeamFromLeague } from "../api/apiLeagues";
import { removeTeam } from "../actions/teamsAction";
const TeamsPage = ({ leagues = [] }) => {
  const [filters, setFilters] = useState({ leagueId: '' });
  const [sort, setSort] = useState({ field: 'teamName', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(0);
  const { showModal, toggleModal } = useModal();
  const { searchInput, handleSearch } = useSearch(); 
  const { newTeam, handleChange, handleTeamSubmit, creation_message } = useNewTeam(); 
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const leagueId = useLeagueId(); 
  useEffect(() => {
    if (leagueId) {
      setFilters((prevFilters) => ({ ...prevFilters, leagueId: leagueId, name: searchInput }));
    }
  }, [searchInput, leagueId]);

  const { teams, totalPages, isLoading, error } = useTeams(filters, sort, currentPage); 

  const { isManager, errorManager } = useManagerCheck(leagueId);
  if (errorManager) {
    return <p>Error loading manager status: {errorManager.message}</p>;
  }

  const handleSortChange = (field) => {
    const newDirection = sort.field === field && sort.direction === 'asc' ? 'desc' : 'asc';
    setSort({ field, direction: newDirection });
  };

  const handlePageChange = (page) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  /* const handleSiteTeamSubmit = async (e) => {
    e.preventDefault();
  
    if (!siteTeamId) {
      alert("Введите ID команды с сайта.");
      return;
    }
  
    try {
      const addedTeam = await addTeam(leagueId, siteTeamId);
      //dispatch(addTeamToStore(addedTeam));
  
      setSiteTeamId("");
  
      toggleModal();
  
      alert("Команда успешно добавлена!");
    } catch (error) {
      console.error("Ошибка при добавлении команды с сайта:", error);
      alert("Не удалось добавить команду. Попробуйте позже.");
    }
  }; */
  

  const handleTeamRemove = async (teamId) => {
    const confirmed = window.confirm("Вы уверены, что хотите удалить эту команду?");
    if (!confirmed) return;

    try {
      await deleteTeamFromLeague(leagueId, teamId);
      dispatch(removeTeam(teamId)); 
      setMessage('Команда успешно удалена!');
    } catch (error) {
      console.error("Ошибка при удалении команды:", error);
      alert("Не удалось удалить команду. Попробуйте позже");
    }
  };

  if (!filters.leagueId) {
    return <div>Выберите лигу для отображения команд.</div>;
  }

  if (isLoading) {
    return <div>Загрузка команд...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <MainContent>
      <h2>Команды</h2>
      {message && <p className="success-message">{message}</p>}
      <SearchBar onSearch={handleSearch} />
      {isManager && (
        <button onClick={toggleModal}>Добавить новую команду</button>
      )}

      {showModal && (
        <Modal show={showModal} onClose={toggleModal}>
          <h2>Добавление новой команды</h2>
          <TeamForm
            newTeam={newTeam}
            leagues={leagues}
            onChange={handleChange}
            onSubmit={handleTeamSubmit}
            message={creation_message}
          />

          {/* <h2>Добавить команду с сайта МАК</h2>
          <SiteTeamForm
            siteTeamId={siteTeamId}
            onChange={(e) => setSiteTeamId(e.target.value)}
            onSubmit={handleSiteTeamSubmit}
          /> */}
        </Modal>
      )}

      <TeamTable
        teams={teams}
        leagueId={filters.leagueId}
        onSortChange={handleSortChange}
        sortField={sort.field}
        sortDirection={sort.direction}
        onTeamRemove={handleTeamRemove}
        showDeleteButton={isManager}
      />

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            className="pageNumberButton"
            key={index}
            onClick={() => handlePageChange(index)}
            disabled={index === currentPage}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </MainContent>
  );
};

export default TeamsPage;