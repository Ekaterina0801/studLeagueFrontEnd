import './style.css';

import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { FaChevronDown } from 'react-icons/fa';
import useLeagues from '../../hooks/useLeagues';
import { saveLeagueId } from '../../hooks/cookieUtils';


const Navbar = () => {
  const { leagues, selectedLeague, setSelectedLeague, isLoading, error } = useLeagues(); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  const handleLeagueChange = (leagueId) => {
    setSelectedLeague(leagueId); // Update selected league
    saveLeagueId(leagueId); // Save the league ID in cookies
    setIsDropdownOpen(false); // Close the dropdown

    // Reload the page
    window.location.reload(); // Reloads the page
  };

  if (isLoading) {
    return <div>Загрузка лиг...</div>;
  }

  if (error) {
    return <div>{error}</div>; 
  }

  // Ensure the ID is matched correctly
  const selectedLeagueName = leagues.find(league => league.id === Number(selectedLeague))?.name || 'Выберите лигу';

  return (
    <div className="navbar">
      <div className="logo">Рейтинг</div>
      <div className="nav-links">
        <NavLink to={`/teams`} className={({ isActive }) => (isActive ? "active-link" : "")}>Команды</NavLink>
        <NavLink to={`/tournaments`} className={({ isActive }) => (isActive ? "active-link" : "")}>Турниры</NavLink>
        <NavLink to={`/results`} className={({ isActive }) => (isActive ? "active-link" : "")}>Результаты</NavLink>
        <NavLink to="/profile" className={({ isActive }) => (isActive ? "active-link" : "")}>Профиль</NavLink>
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
