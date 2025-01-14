import './style.css';

import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { FaChevronDown } from 'react-icons/fa';
import useLeagues from '../../hooks/useLeagues';
import { saveLeagueId } from '../../hooks/cookieUtils';4
import { useEffect } from 'react';


const Navbar = () => {
  const { leagues, selectedLeague, setSelectedLeague, isLoading, error } = useLeagues(); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {

    const accessToken = localStorage.getItem('accessToken');
    setIsAuthenticated(!!accessToken);
  }, []);

  const handleLeagueChange = (leagueId) => {
    setSelectedLeague(leagueId); 
    saveLeagueId(leagueId); 
    setIsDropdownOpen(false); 


    window.location.reload(); 
  };

  if (isLoading) {
    return <div>Загрузка лиг...</div>;
  }

  if (error) {
    return <div>{error}</div>; 
  }


  const selectedLeagueName = leagues.find(league => league.id === Number(selectedLeague))?.name || 'Выберите лигу';

  return (
    <div className="navbar">
      <div className="logo">Имя розы</div>
      <div className="nav-links">
        <NavLink to={`/teams`} className={({ isActive }) => (isActive ? "active-link" : "")}>Команды</NavLink>
        <NavLink to={`/tournaments`} className={({ isActive }) => (isActive ? "active-link" : "")}>Турниры</NavLink>
        <NavLink to={`/results`} className={({ isActive }) => (isActive ? "active-link" : "")}>Результаты</NavLink>
        <NavLink to={isAuthenticated ? "/profile" : "/sign-in"} className={({ isActive }) => (isActive ? "active-link" : "")}>
          {isAuthenticated ? "Профиль" : "Авторизация"}
        </NavLink>
      </div>
      <div className="league-selector" ref={dropdownRef}>
        <div
          className={`select-icon ${isDropdownOpen ? 'open' : ''}`}
          onClick={() => setIsDropdownOpen((prev) => !prev)} 
        >
          <span>{selectedLeagueName}</span>
          <FaChevronDown />
        </div>
        {isDropdownOpen && (
          <div className="dropdown">
            <ul>
              {leagues.map((league) => (
                <li key={league.id} onClick={() => handleLeagueChange(league.id)}>
                  {league.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
