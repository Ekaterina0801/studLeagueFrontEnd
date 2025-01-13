import './style.css';
import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

const sidebarItems = [
  { name: "Игроки", icon: "👥", path: "/admin/players" },
  { name: "Команды", icon: "👤", path: "/admin/teams" },
  { name: "Лиги", icon: "📄", path: "/admin/leagues" },
  { name: "Пользователи", icon: "👤", path: "/admin/users" },
  { name: "Результаты", icon: "👥", path: "/admin/results" },
  { name: "Системы результатов", icon: "👥", path: "/admin/scoring-systems" },
  { name: "Флаги", icon: "👥", path: "/admin/flags" },
];

const Sidebar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    setIsAuthenticated(!!accessToken);
  }, []);


  return (
    <div className="sidebar">
      <div className="logo">Админ-панель</div>
      <div className="nav-links">
        {sidebarItems.map((item) => (
          <NavLink 
            key={item.name} 
            to={item.path} 
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            <span>{item.icon} {item.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

