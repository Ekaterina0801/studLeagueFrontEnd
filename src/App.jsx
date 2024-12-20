import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Header from "./components/header/Header";
import TeamsPage from "./pages/TeamsPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PlayerPage from "./pages/PlayerPage";
import ControversialsPage from "./pages/ControversialsPage";
import AuthForm from "./components/auth-form/AuthForm";
import TournamentsPage from "./pages/TournamentsPage";
import TeamPage from "./pages/TeamProfile";
import LeagueResults from "./pages/LeagueResultsPage";
import TournamentPage from "./pages/TournamentResults";
import ProfilePage from "./pages/ProfilePage";
import { Provider } from "react-redux";
import store from "./store";
import LeaguePage from "./pages/LeaguePage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import AppRoutes from "./AppRoutes";
function App() {
  
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Navbar />
        <AppRoutes
        />
      </Router>
    </Provider>
  );
}

export default App;
