import React from 'react';
import { Link } from 'react-router-dom'; 
import './style.css';

const Sidebar = ({ leagues }) => {
    const [isSidebarExpanded, setIsSidebarExpanded] = React.useState(true);

    const toggleSidebar = () => {
        setIsSidebarExpanded(!isSidebarExpanded);
    };

    return (
        <nav className={`sidebar ${isSidebarExpanded ? 'expanded' : 'collapsed'}`}>
            <div className="menu_content">

                
                {/* Секция со списком лиг */}
                <ul className="menu_items">
                    <div className="menu_title menu_editor">Лиги</div>
                    {leagues.map(league => (
                        <li key={league.id} className="item">
                            <Link 
                                to={`/leagues/${league.id}/tournaments`} 
                                className="nav_link league-link"
                                data-league-id={league.id}
                            >
                                <span className="navlink_icon">
                                    <i className="bx bxs-magic-wand"></i>
                                </span>
                                <span className="navlink">{league.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Кнопки развернуть и свернуть */}
                <div className="bottom_content">
                    <div 
                        className="bottom expand_sidebar" 
                        onClick={toggleSidebar}
                    >
                        <span>{isSidebarExpanded ? 'Collapse' : 'Expand'}</span>
                        <i className={`bx ${isSidebarExpanded ? 'bx-log-out' : 'bx-log-in'}`}></i>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Sidebar;
