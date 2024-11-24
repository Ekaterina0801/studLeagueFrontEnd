import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Header from "./components/header/Header";
import TeamsPage from "./pages/TeamsPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PlayerPage from "./pages/PlayerPage";
import ControversialsPage from "./pages/ControversialsPage";
import AuthForm from "./components/auth-form/AuthForm";
import TournamentsPage from "./pages/TournamentsPage";

function App() {
  // Sample data for demonstration
const sampleTournament = {
  name: 'Championship Tournament',
};

const sampleControversials = [
  {
      fullResult: {
          team: {
              teamName: 'Team Alpha'
          }
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
              teamName: 'Team Beta'
          }
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
              teamName: 'Team Gamma'
          }
      },
      questionNumber: 3,
      answer: 'Pi',
      status: 'Rejected',
      comment: 'Inaccurate answer',
      appealJuryComment: 'Does not meet criteria',
  },
];

  const sampleLeagues = [
    { id: "1", name: "League A" },
    { id: "2", name: "League B" },
  ];
  const sampleTeams = [
    { id: "1", idSite: "1001", teamName: "Team Alpha" },
    { id: "2", idSite: "1002", teamName: "Team Beta" },
  ];
  const sampleLeagueId = "1";

  // Mock data example
const mockPlayer = {
  fullName: 'John Doe',
  tournaments: [
    { id: 1, name: 'Spring Championship' },
    { id: 2, name: 'Summer Cup' },
  ],
  teams: [
    { id: 1, teamName: 'Falcons' },
    { id: 2, teamName: 'Eagles' },
  ],
  transfers: [
    {
      id: 1,
      oldTeam: { id: 1, teamName: 'Falcons' },
      newTeam: { id: 3, teamName: 'Lions' },
      transferDate: '2023-07-10',
      comments: 'Mid-season transfer to Lions.',
    },
    {
      id: 2,
      oldTeam: { id: 2, teamName: 'Eagles' },
      newTeam: { id: 4, teamName: 'Sharks' },
      transferDate: '2023-08-15',
      comments: 'Player moved to Sharks for playoffs.',
    },
  ],
};

const mockOldTeams = [
  { id: 1, teamName: 'Falcons' },
  { id: 2, teamName: 'Eagles' },
];

const mockNewTeams = [
  { id: 3, teamName: 'Lions' },
  { id: 4, teamName: 'Sharks' },
  { id: 5, teamName: 'Bulls' },
];

const mockLeagueId = 1001;


  return (
    <Router>
      <Header />
      <Navbar />
      <Routes>
        <Route
          path="/tournaments/:tournamentId/controversials"
          element={ <ControversialsPage tournament={sampleTournament} controversials={sampleControversials} />
        }
        />
        <Route
          path="/tournaments/:tournamentId/results"
          element={<TeamsPage />}
        />
        <Route
          path="/teams/:teamId"
          element={<TeamsPage />}
        />
        <Route
          path="/teams/:teamId/players/:playerId"
          element={<PlayerPage
            player={mockPlayer}
            leagueId={mockLeagueId}
            oldTeams={mockOldTeams}
            newTeams={mockNewTeams}
          />}
        />
        <Route path="/sign-in" element={<TeamsPage />} />
        <Route path="/sign-up" element={<TeamsPage />} />
        <Route
          path="/teams"
          element={
            <TeamsPage
              leagues={sampleLeagues}
              teams={sampleTeams}
              leagueId={sampleLeagueId}
            />
          }
        />
        <Route
          path="/profile"
          element={
           <PlayerPage/>
          }
        />
        <Route
          path="/tournaments"
          element={
            <TournamentsPage
              leagues={sampleLeagues}
              tournaments={sampleTournament}
              leagueId={sampleLeagueId}
            />
          }
        />
        <Route
          path="/results"
          element={
            <AuthForm/>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
