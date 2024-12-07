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
import { Provider } from 'react-redux';
import store from "./store";
function App() {
  // Sample data for testing
  const sampleTournament = {
    name: 'Championship Tournament',
  };

  const sampleControversials = [
    {
      fullResult: {
        team: {
          teamName: 'Team Alpha',
        },
      },
      questionNumber: 1,
      answer: '42',
      status: 'Pending',
      comment: 'Needs review',
      appealJuryComment: 'Further details required',
    },
    {
      fullResult: {
        team: {
          teamName: 'Team Beta',
        },
      },
      questionNumber: 2,
      answer: 'E=mc^2',
      status: 'Approved',
      comment: 'Accepted answer',
      appealJuryComment: 'Confirmed by jury',
    },
    {
      fullResult: {
        team: {
          teamName: 'Team Gamma',
        },
      },
      questionNumber: 3,
      answer: 'Pi',
      status: 'Rejected',
      comment: 'Inaccurate answer',
      appealJuryComment: 'Does not meet criteria',
    },
  ];

  const sampleLeagues = [
    { id: '1', name: 'League A' },
    { id: '2', name: 'League B' },
  ];

  const sampleTeams = [
    { id: '1', idSite: '1001', teamName: 'Team Alpha' },
    { id: '2', idSite: '1002', teamName: 'Team Beta' },
  ];

  const sampleLeagueId = '1';

  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Navbar />
        <Routes>
          {/* Controversial Page Route */}
          <Route
            path="/leagues/:leagueId/tournaments/:tournamentId/controversials"
            element={<ControversialsPage tournament={sampleTournament} controversials={sampleControversials} />}
          />

          {/* Tournament Page Route */}
          <Route
            path="/tournaments/:tournamentId/results"
            element={<TournamentPage />}
          />

          {/* League Results Route */}
          <Route
            path="/results"
            element={<LeagueResults />}
          />

          {/* Team Page Route */}
          <Route
            path="/leagues/:leagueId/teams/:teamId"
            element={<TeamPage />}
          />

          {/* Player Page Route */}
          <Route
            path="/leagues/:leagueId/teams/:teamId/players/:playerId"
            element={<PlayerPage />}
          />

          {/* Authentication Routes */}
          <Route path="/sign-in" element={<AuthForm />} />
          <Route path="/sign-up" element={<AuthForm />} />

          {/* Teams Page Route */}
          <Route
            path="/teams"
            element={<TeamsPage leagues={sampleLeagues} teams={sampleTeams} leagueId={sampleLeagueId} />}
          />

          {/* Profile Page Route */}
          <Route
            path="/profile"
            element={<ProfilePage />}
          />

          {/* Tournaments Page Route */}
          <Route
            path="/tournaments"
            element={<TournamentsPage leagues={sampleLeagues} tournaments={sampleTournament} leagueId={sampleLeagueId} />}
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;