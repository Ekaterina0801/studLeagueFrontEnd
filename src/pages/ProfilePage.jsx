import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom"; 
import { logout } from "../api/apiHeaders";
import { deleteLeagueById, getLeaguesByUser } from "../api/apiLeagues";
import { useState, useEffect } from "react";
import LeagueForm from "../components/forms/LeagueForm";
import useNewLeague from "../hooks/useNewLeague";
import { useModal } from "../hooks/useModal";
import Modal from "../components/forms/Modal/Modal";
import useManagerCheck from "../hooks/useManagerCheck";
import Loader from "../components/spinner/Spinner";
import { addNewLeague } from "../api/apiLeagues";
const ProfilePage = () => {
  const navigate = useNavigate();
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { newLeague, systemResults, handleChange} = useNewLeague(); 
  const { showModal, toggleModal } = useModal();
  const [message, setMessage] = useState('');


  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const leaguesData = await getLeaguesByUser();
        setLeagues(leaguesData);
      } catch (err) {
        setError("Ошибка при загрузке лиг");
      } finally {
        setLoading(false);
      }
    };

    fetchLeagues();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/sign-in"); 
  };
  const handleLeagueSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const leagueDTO = {
        name: newLeague.name,
        countExcludedGames: newLeague.countExcludedGames || 0, 
        systemResultId: newLeague.systemResultId,
      };

      const result = await addNewLeague(leagueDTO);
      setMessage('Лига добавлена успешно!');
      window.location.reload();
    } catch (error) {
      console.error('Error adding new league:', error);
      alert('Произошла ошибка при добавлении лиги.');
    }
    finally{
      setLoading(false);
    }
  };

  const handleLeagueDelete = async (leagueId) => {
    const confirmDelete = window.confirm("Вы уверены, что хотите удалить эту лигу?");
    if (!confirmDelete) return;
    setLoading(true);
    try {
      await deleteLeagueById(leagueId); 
      setLeagues((prevLeagues) => prevLeagues.filter((league) => league.id !== leagueId));
      setMessage('Лига успешно удалена!');
    } catch (err) {
      console.error("Ошибка при удалении лиги:", err);
      alert("Не удалось удалить лигу. Попробуйте еще раз.");
    }
    finally{
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />; 
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Профиль пользователя</h1>
      {loading && <Loader />} 
      {message && <SuccessMessage message={message} />}
      <button onClick={handleLogout} style={logoutButtonStyle}>
        Выйти из профиля
      </button>
      <h2>Ваши лиги</h2>
      <button onClick={toggleModal}>Добавить новую лигу</button>
      {showModal && (
        <Modal show={showModal} onClose={toggleModal}>
          <h2>Добавление новой команды</h2>
          <LeagueForm
            newLeague={newLeague}
            systemResults={systemResults}
            onChange={handleChange}
            onSubmit={handleLeagueSubmit}
          />
        </Modal>
      )}
      {leagues.length > 0 ? (
        <table className="table" style={{ margin: "20px auto", width: "80%" }}>
          <thead>
            <tr>
              <th>№</th>
              <th>Название лиги</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {leagues.map((league, index) => (
              <tr key={league.id}>
                <td>{index + 1}</td>
                <td>
                  <a href={`/leagues/${league.id}`}>{league.name}</a>
                </td>
                <td>
                  <span
                    className="remove-icon"
                    onClick={() => handleLeagueDelete(league.id)}
                  >
                    🗑️
                  </span>
                  <span className="remove-tooltip">Удалить лигу</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>У вас пока нет лиг</p>
      )}
    </div>
  );
};


// Стили кнопки (опционально)
const logoutButtonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  backgroundColor: "#ff4d4d",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default ProfilePage;
