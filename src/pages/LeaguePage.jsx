import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getLeagueById,addManagerToLeague, deleteManagerFromLeague } from '../api/apiLeagues';
import Modal from '../components/forms/Modal/Modal';
import UserSearchForm from '../components/forms/UserSearchForm';
const LeaguePage = () => {
  const { leagueId } = useParams();
  const [league, setLeague] = useState({});
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedManagerId, setSelectedManagerId] = useState("");

  useEffect(() => {
    const fetchLeagueData = async () => {
      try {
        const fetchedLeague = await getLeagueById(leagueId);
        console.log(fetchLeagueData);
        setLeague(fetchedLeague);
        setManagers(fetchedLeague.managers || []);
      } catch (err) {
        setError("Ошибка при загрузке лиги");
      } finally {
        setLoading(false);
      }
    };

    fetchLeagueData();
  }, [leagueId]);

  const handleManagerAdd = async (managerId) => {
    try {
      await addManagerToLeague(leagueId, managerId);
      const updatedLeague = await getLeagueById(leagueId);
      setLeague(updatedLeague);
      setManagers(updatedLeague.managers || []);
    } catch (err) {
      setError("Ошибка добавления менеджера");
    }
  }; 

  const handleManagerRemove = async (managerId) => {
    try {
      await deleteManagerFromLeague(leagueId, managerId);
      const updatedLeague = await getLeagueById(leagueId);
      setLeague(updatedLeague);
      setManagers(updatedLeague.managers || []);
    } catch (err) {
      setError("Ошибка удаления менеджера");
    }
  };

  const toggleModal = () => setShowModal((prev) => !prev);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Редактирование лиги: {league.name}</h1>

      <h2>Менеджеры</h2>
      {managers.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>№</th>
              <th>ФИО менеджера</th>
              <th>Удалить</th>
            </tr>
          </thead>
          <tbody>
            {managers.map((manager, index) => (
              <tr key={manager.id}>
                <td>{index + 1}</td>
                <td>
                  <a href={`/leagues/${leagueId}/managers/${manager.id}`}>
                    {`${manager.fullname}`}
                  </a>
                </td>
                <td>
                  <span
                    className="remove-icon"
                    onClick={() => handleManagerRemove(manager.id)}
                  >
                    🗑️
                  </span>
                  <span className="remove-tooltip">Удалить из лиги</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Менеджеров пока нет</p>
      )}

      <button onClick={toggleModal}>Добавить менеджера</button>

      <Modal show={showModal} onClose={toggleModal}>
        <h2>Добавление менеджера</h2>
        <UserSearchForm
          onSubmit={handleManagerAdd}
          onClose={toggleModal}
        />
      </Modal>
    </div>
  );
};

export default LeaguePage;
