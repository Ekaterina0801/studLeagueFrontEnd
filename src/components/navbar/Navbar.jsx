const Navbar = () => {
    return ( <nav class="navbar">
        <div class="logo_item">
            <i class="bx bx-menu" id="sidebarOpen"></i>
            <img src="images/logo.png" alt="Логотип"/>Рейтинг
        </div>
    
        <div class="navbar_content">
            <img src="images/profile.jpg" alt="Профиль" class="profile" />
            <a href="/leagues/{league_id}/results" class="nav_link results-link">
                <span class="navlink_icon">
                    <i class="bx bxs-magic-wand"></i>
                </span>
                <span class="navlink">Результаты</span>
            </a>
            <a href="/leagues/{league_id}/teams" class="nav_link teams-link">
                <span class="navlink_icon">
                    <i class="bx bxs-magic-wand"></i>
                </span>
                <span class="navlink">Команды</span>
            </a>
            <a href="/leagues/{league_id}/tournaments" class="nav_link tournaments-link">
                <span class="navlink_icon">
                    <i class="bx bxs-magic-wand"></i>
                </span>
                <span class="navlink">Турниры</span>
            </a>
        </div>
    </nav> );
}
 
export default Navbar;