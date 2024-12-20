import AddTeamForm from "../forms/AddTeamForm";
import { useState, useEffect } from "react";
import { getLeagueById } from "../../api/apiLeagues";
import { addTeamToTournament } from "../../api/apiTournaments";
import { addNewTeam } from "../../api/apiTeams";
const TeamsSection = ({ tournamentId, teamCompositions, leagueId, leaguesIds, showButton}) => {
  const [leagues, setLeagues] = useState([]);

  useEffect(() => {
    console.log(leaguesIds);
    const fetchLeaguesByIds = async (leaguesIds) => {
      try {
        const leaguesData = await Promise.all(
          leaguesIds.map((id) => getLeagueById(id)) 
        );
        console.log('datra',leaguesData);
        setLeagues(leaguesData); 
      } catch (error) {
        console.error("Ошибка при загрузке лиг:", error);
      }
    };

    fetchLeaguesByIds(leaguesIds);
  }, []);
  
  const handleAddNewTeam = async (formData) => {
    try {
      var teamData = {}
      teamData.name = formData.name;
      teamData.league = await getLeagueById(formData.leagueId); 
      teamData.university = formData.university;
      teamData.tournamentIds = [tournamentId];
      console.log('teamData', teamData);
      const newTeam = await addNewTeam(teamData);
      alert("Команда успешно добавлена!");
      console.log("New team added:", newTeam);
    } catch (error) {
      console.error("Ошибка при добавлении новой команды:", error);
      alert("Не удалось добавить команду.");
    }
  };

  const handleAddExistingTeam = async (teamId) => {
    try {
      console.log('league',leagueId);
      console.log('team', teamId);
      await addTeamToTournament(tournamentId, teamId); 
      alert("Существующая команда добавлена!");
    } catch (error) {
      console.error("Ошибка при добавлении существующей команды:", error);
      alert("Не удалось добавить существующую команду.");
    }
  };

  const handleAddSiteTeam = async (siteTeamId) => {
    try {
      await addSiteTeamToTournament(siteTeamId, leagueId); 
      alert("Команда с сайта добавлена!");
    } catch (error) {
      console.error("Ошибка при добавлении команды с сайта:", error);
      alert("Не удалось добавить команду с сайта.");
    }
  };

  return (
    <div>
  <h2>Команды</h2>
  {teamCompositions.length === 0 ? (
    <p>Составы пока скрыты</p>
  ) : (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>№</th>
            <th>Название команды</th>
            <th>Состав команды</th>
          </tr>
        </thead>
        <tbody>
          {teamCompositions.map((teamComposition) => (
            <tr key={teamComposition.parentTeam.id}>
              <td>{teamComposition.parentTeam.id}</td>
              <td>
                <a
                  href={`/leagues/${leagueId}/teams/${teamComposition.parentTeam.id}`}
                  className="name-ref"
                >
                  {teamComposition.parentTeam.name}
                </a>
              </td>
              <td>
                <ul>
                  {teamComposition.players.map((player) => (
                    <li key={player.id}>
                      {player.surname} {player.name} {player.patronymic}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
  {showButton&&(<AddTeamForm
    leagues={leagues}
    onAddNewTeam={handleAddNewTeam}
    onAddExistingTeam={handleAddExistingTeam}
    onAddSiteTeam={handleAddSiteTeam}
  />)}
  
</div>

  );
};

export default TeamsSection;
