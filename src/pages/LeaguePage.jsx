import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getLeagueById,addManagerToLeague, deleteManagerFromLeague } from '../api/apiLeagues';
import Modal from '../components/forms/Modal/Modal';
import UserSearchForm from '../components/forms/UserSearchForm';
import Loader from '../components/spinner/Spinner';
import SuccessMessage from '../components/successMessage/SuccessMessage';
import useManagerCheck from '../hooks/useManagerCheck';
const LeaguePage = () => {
  const { leagueId } = useParams();
  const [league, setLeague] = useState({});
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedManagerId, setSelectedManagerId] = useState("");
  const isManager = useManagerCheck(league);

  useEffect(() => {
    const fetchLeagueData = async () => {
      try {
        const fetchedLeague = await getLeagueById(leagueId);
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
    setLoading(true);
    try {
      await addManagerToLeague(leagueId, managerId);
      const updatedLeague = await getLeagueById(leagueId);
      setLeague(updatedLeague);
      setManagers(updatedLeague.managers || []);
      setMessage("Менеджер успешно добавлен!");
    } catch (err) {
      setError("Ошибка добавления менеджера");
    } finally {
      setLoading(false);
    }
  };

  const handleManagerRemove = async (managerId) => {
    setLoading(true);
    try {
      await deleteManagerFromLeague(leagueId, managerId);
      const updatedLeague = await getLeagueById(leagueId);
      setLeague(updatedLeague);
      setManagers(updatedLeague.managers || []);
      setMessage("Менеджер успешно удален");
    } catch (err) {
      setError("Ошибка удаления менеджера");
    } finally {
      setLoading(false);
    }
  };

  const toggleModal = () => setShowModal((prev) => !prev);

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  if (!isManager) {
    return (
      <div className="no-access">
        <h2>У вас нет прав просмотра</h2>
        <p>Вы не являетесь менеджером данной лиги.</p>
      </div>
    );
  }

  return (
    <div>
      {loading && <Loader />}
      {message && <SuccessMessage message={message} />}
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
        <UserSearchForm onSubmit={handleManagerAdd} onClose={toggleModal} />
      </Modal>
    </div>
  );
};

export default LeaguePage;

