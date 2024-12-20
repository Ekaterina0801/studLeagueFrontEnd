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
const ProfilePage = () => {
  const navigate = useNavigate();
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { newLeague, systemResults, handleChange, handleLeagueSubmit } = useNewLeague(); 
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
    navigate("/login"); 
  };

  const handleLeagueDelete = async (leagueId) => {
    const confirmDelete = window.confirm("Вы уверены, что хотите удалить эту лигу?");
    if (!confirmDelete) return;

    try {
      await deleteLeagueById(leagueId); 
      setLeagues((prevLeagues) => prevLeagues.filter((league) => league.id !== leagueId));
      setMessage('Лига успешно удалена!');
    } catch (err) {
      console.error("Ошибка при удалении лиги:", err);
      alert("Не удалось удалить лигу. Попробуйте еще раз.");
    }
  };

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Профиль пользователя</h1>
      {message && <p className="success-message">{message}</p>}
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
