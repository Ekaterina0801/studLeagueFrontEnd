import { useEffect, useState } from "react";
import Modal from "./Modal/Modal";
import { getTeams } from "../../api/apiTeams";

function AddTeamForm({ leagues, onAddNewTeam, onAddExistingTeam, onAddSiteTeam }) {
  const [newTeam, setNewTeam] = useState({ name: "", university: "", leagueId: "" });
  const [existingTeamId, setExistingTeamId] = useState("");
  const [siteTeamId, setSiteTeamId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [teams, setTeams] = useState([]);
  const [selectedLeagueId, setSelectedLeagueId] = useState("");

  const toggleModal = () => setShowModal((prev) => !prev);

  const handleNewTeamChange = (e) => {
    const { name, value } = e.target;
    setNewTeam((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewTeamSubmit = (e) => {
    e.preventDefault();
    if (onAddNewTeam) {
      onAddNewTeam(newTeam);
      toggleModal();
    }
  };

  const handleExistingTeamSubmit = (e) => {
    e.preventDefault();
    if (onAddExistingTeam) {
      onAddExistingTeam(existingTeamId);
      toggleModal();
    }
  };

  const handleSiteTeamSubmit = (e) => {
    e.preventDefault();
    if (onAddSiteTeam) {
      onAddSiteTeam(siteTeamId);
      toggleModal();
    }
  };

  const fetchTeams = async (leagueId) => {
    try {
      const response = await getTeams({ leagueId });
      setTeams(response.content || []);
      console.log('teams', response.content);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  const handleLeagueSelection = (e) => {
    const leagueId = e.target.value;
    setSelectedLeagueId(leagueId);
    if (leagueId) fetchTeams(leagueId);
  };

  return (
    <>
      <button onClick={toggleModal}>Добавить новую или существующую</button>
      {showModal && (
        <Modal show={showModal} onClose={toggleModal}>
          <div className="add-team-form">
            <h3>Добавить новую команду</h3>
            <form onSubmit={handleNewTeamSubmit}>
              <label htmlFor="teamName">Название команды:</label>
              <input
                type="text"
                id="teamName"
                name="name"
                value={newTeam.name}
                onChange={handleNewTeamChange}
                required
              />

              <label htmlFor="university">Университет:</label>
              <input
                type="text"
                id="university"
                name="university"
                value={newTeam.university}
                onChange={handleNewTeamChange}
                required
              />

              <label htmlFor="leagueId">Выберите лигу:</label>
              <select
                id="leagueId"
                name="leagueId"
                value={newTeam.leagueId}
                onChange={handleNewTeamChange}
                required
              >
                <option value="" disabled>
                  Выберите лигу
                </option>
                {leagues.map((league) => (
                  <option key={league.id} value={league.id}>
                    {league.name}
                  </option>
                ))}
              </select>
              <button type="submit">Добавить команду</button>
            </form>

            <h3>Добавить существующую команду</h3>
            <form onSubmit={handleExistingTeamSubmit}>
              <label htmlFor="leagueSelect">Выберите лигу:</label>
              <select
                id="leagueSelect"
                value={selectedLeagueId}
                onChange={handleLeagueSelection}
              >
                <option value="" disabled>
                  Выберите лигу
                </option>
                {leagues.map((league) => (
                  <option key={league.id} value={league.id}>
                    {league.name}
                  </option>
                ))}
              </select>

              {teams.length > 0 && (
                <>
                  <label htmlFor="existingTeamId">Выберите команду:</label>
                  <select
                    id="existingTeamId"
                    value={existingTeamId}
                    onChange={(e) => setExistingTeamId(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Выберите команду
                    </option>
                    {teams.map((team) => (
                      <option key={team.id} value={team.id}>
                        {team.name}
                      </option>
                    ))}
                  </select>
                </>
              )}
              <button type="submit">Добавить</button>
            </form>

            <h3>Добавить команду с сайта</h3>
            <form onSubmit={handleSiteTeamSubmit}>
              <label htmlFor="siteTeamId">Site Team ID:</label>
              <input
                type="text"
                id="siteTeamId"
                value={siteTeamId}
                onChange={(e) => setSiteTeamId(e.target.value)}
                required
              />
              <button type="submit">Добавить</button>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
}

export default AddTeamForm;
