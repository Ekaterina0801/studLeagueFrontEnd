import React, { useState,useEffect } from "react";
import Modal from "../components/forms/Modal/Modal";
import TeamForm from"../components/forms/TeamForm";
import SiteTeamForm from "../components/forms/SiteTeamForm";
import TeamTable from "../components/tables/TeamTable";
import MainContent from "../components/main-section/MainSection";
import useTeams from "../hooks/useTeams";
import Cookies from "js-cookie"; 
function TeamsPage({ leagues = [] }) {
  const [showModal, setShowModal] = useState(false);
  const [newTeam, setNewTeam] = useState({ teamName: "", university: "" });
  const [siteTeamId, setSiteTeamId] = useState("");
  const [filters, setFilters] = useState({ leagueId: "" });
  const [sort, setSort] = useState({ field: "teamName", direction: "asc" });

  // Эффект для получения ID лиги из cookies при монтировании компонента
  useEffect(() => {
    const leagueIdFromCookie = Cookies.get("leagueId");
    if (leagueIdFromCookie) {
      setFilters({ leagueId: leagueIdFromCookie }); // Устанавливаем фильтр по ID лиги из cookies
    }
  }, []); // Этот эффект сработает один раз при монтировании

  // Печать текущих фильтров и проверка на правильность
  useEffect(() => {
    console.log("Current filters: ", filters);
  }, [filters]);

  // Получаем команды через хук
  const { teams, isLoading, error } = useTeams(filters, sort);

  const toggleModal = () => setShowModal(!showModal);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTeam((prevTeam) => ({ ...prevTeam, [name]: value }));
  };

  const handleTeamSubmit = (e) => {
    e.preventDefault();
    console.log("Adding team:", newTeam);
    toggleModal(); 
  };

  const handleSiteTeamSubmit = (e) => {
    e.preventDefault();
    console.log("Adding team from site with ID:", siteTeamId);
    toggleModal(); 
  };

  const handleSortChange = (field) => {
    const newSortDirection = sort.field === field && sort.direction === "asc" ? "desc" : "asc";
    setSort({ field, direction: newSortDirection });
  };

  if (isLoading) {
    return <div>Загрузка команд...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <MainContent>
      <h2>Команды</h2>
      <button onClick={toggleModal}>Добавить новую команду</button>

      <Modal show={showModal} onClose={toggleModal}>
        <h2>Добавление новой команды</h2>
        <TeamForm newTeam={newTeam} leagues={leagues} onChange={handleChange} onSubmit={handleTeamSubmit} />

        <h2>Добавить команду с сайта МАК</h2>
        <SiteTeamForm siteTeamId={siteTeamId} onChange={(e) => setSiteTeamId(e.target.value)} onSubmit={handleSiteTeamSubmit} />
      </Modal>

      <TeamTable
        teams={teams}
        leagueId={filters.leagueId} // Передаем фильтр по ID лиги
        onSortChange={handleSortChange}
        sortField={sort.field}
        sortDirection={sort.direction}
      />
    </MainContent>
  );
}

export default TeamsPage;