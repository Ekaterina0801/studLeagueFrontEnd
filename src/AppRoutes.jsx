import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthForm from "./components/auth-form/AuthForm";
import TournamentsPage from "./pages/TournamentsPage";
import TeamPage from "./pages/TeamProfile";
import LeagueResults from "./pages/LeagueResultsPage";
import TournamentPage from "./pages/TournamentResults";
import ProfilePage from "./pages/ProfilePage";
import LeaguePage from "./pages/LeaguePage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ControversialsPage from "./pages/ControversialsPage";
import PlayerPage from "./pages/PlayerPage";
import TeamsPage from "./pages/TeamsPage";
import UsersPage from "./pages/UsersPage";

const AppRoutes = () => {
  
  return (
    <Routes>
      {/* Controversial Page Route */}
      <Route
        path="/leagues/:leagueId/tournaments/:tournamentId/controversials"
        element={<ControversialsPage />}
      />
      <Route
        path="/"
        element={<TeamsPage />}
      />

      {/* Tournament Page Route */}
      <Route
        path="/tournaments/:tournamentId/results"
        element={<TournamentPage />}
      />

      {/* League Results Route */}
      <Route path="/results" element={<LeagueResults />} />

      {/* Team Page Route */}
      <Route path="/leagues/:leagueId/teams/:teamId" element={<TeamPage />} />

      {/* Player Page Route */}
      <Route
        path="/leagues/:leagueId/teams/:teamId/players/:playerId"
        element={<PlayerPage />}
      />

      {/* Authentication Routes */}
      <Route path="/sign-in" element={<AuthForm />} />
      <Route path="/sign-up" element={<AuthForm />} />

      {/* Teams Page Route */}
      <Route path="/teams" element={<TeamsPage />} />

      {/* Profile Page Route */}
      <Route path="/profile" element={<ProfilePage />} />

      <Route
        path="/leagues/:leagueId"
        element={
           <LeaguePage />
        }
      />
      
      {/* Tournaments Page Route */}
      <Route path="/tournaments" element={<TournamentsPage />} />
      <Route path="/users" element={<UsersPage />} />

      {/* Reset Password Route */}
      <Route path="/reset-password" element={<ResetPasswordPage />} />
    </Routes>
  );
};

export default AppRoutes;
