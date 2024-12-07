import React from "react";
import Cookies from "js-cookie"; // Убедитесь, что установлен пакет js-cookie
import { useNavigate } from "react-router-dom"; // Для редиректа
import { logout } from "../api/apiHeaders";
const ProfilePage = () => {
  const navigate = useNavigate(); // Хук для редиректа

  const handleLogout = () => {
   logout();
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Профиль пользователя</h1>
      <button onClick={handleLogout} style={logoutButtonStyle}>
        Выйти из профиля
      </button>
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
