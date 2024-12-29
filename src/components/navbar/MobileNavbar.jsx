import React, { useState, useRef, useEffect } from "react";
import "./style.css";
import { NavLink } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { MdOutlineMenu, MdClose } from "react-icons/md";
import useLeagues from "../../hooks/useLeagues";
import { saveLeagueId } from "../../hooks/cookieUtils";
const MobileNavigation = () => {
    const [click, setClick] = useState(false);
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
  
    const selectedLeagueName =
      leagues.find((league) => league.id === Number(selectedLeague))?.name || 'Выберите лигу';
  
    const Hamburger = (
      <MdOutlineMenu className="HamburgerMenu" size="30px" color="white" onClick={() => setClick(!click)} />
    );
  
    const Close = (
      <MdClose className="HamburgerMenu" size="30px" color="white" onClick={() => setClick(!click)} />
    );
  
    return (
      <>
        <div className="navbar-mobile-logo">
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
          {click ? Close : Hamburger}
        </div>
  
        {click && (
          <div className="navbar-mobile">
            <div className="nav-links">
              <NavLink
                to="/teams"
                className={({ isActive }) => (isActive ? 'active-link' : '')}
              >
                Команды
              </NavLink>
              <NavLink
                to="/tournaments"
                className={({ isActive }) => (isActive ? 'active-link' : '')}
              >
                Турниры
              </NavLink>
              <NavLink
                to="/results"
                className={({ isActive }) => (isActive ? 'active-link' : '')}
              >
                Результаты
              </NavLink>
              <NavLink
                to={isAuthenticated ? '/profile' : '/sign-in'}
                className={({ isActive }) => (isActive ? 'active-link' : '')}
              >
                {isAuthenticated ? 'Профиль' : 'Авторизация'}
              </NavLink>
            </div>
          </div>
        )}
      </>
    );
  };
  
  export default MobileNavigation;
  