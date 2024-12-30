import React, { useState } from "react";
import { useParams } from "react-router-dom";
import TeamsSection from "../components/tables/TeamSection";
import ResultsSection from "../components/tables/ResultsSection";
import FileUpload from "../components/file-upload/FileUpload";
import useManagerCheck from "../hooks/useManagerCheck";
import useTournamentData from "../hooks/useTournamentData";
import Loader from "../components/spinner/Spinner";
const TournamentPage = () => {
  const { tournamentId } = useParams();
  const {
    tournament,
    teamCompositions,
    tableResult,
    leagueId,
    loading,
    error: tournamentError,
  } = useTournamentData(tournamentId);

  const { isManager, error: managerError } = useManagerCheck(leagueId);

  const [showQuestions, setShowQuestions] = useState(true);
  if (tournamentError) {
    return <p>{tournamentError?.message || tournamentError}</p>;
  }

  if (loading) {
    return <Loader />;
  }

  const toggleQuestions = () => {
    setShowQuestions((prevState) => !prevState);
  };

  return (
    <div>
      <h1>{tournament.name}</h1>

      {isManager && (
        <>
          <h3>Загрузить составы команд</h3>
          <FileUpload
            tournamentId={tournamentId}
            leagueId={leagueId}
            type="compositions"
          />{" "}
        </>
      )}

      <TeamsSection
        tournamentId={tournamentId}
        teamCompositions={teamCompositions}
        leagueId={leagueId}
        leaguesIds={tournament.leaguesIds}
        showButton={isManager}
      />

      <h2>Результаты</h2>

      {isManager && (
        <>
          <h3>Загрузить результаты турнира</h3>
          <FileUpload
            tournamentId={tournamentId}
            leagueId={leagueId}
            type="results"
          />
        </>
      )}
      <a
        href={`/leagues/${leagueId}/tournaments/${tournamentId}/controversials`}
        className="button-link"
      >
        Перейти к спорным
      </a>

      <ResultsSection
        tableResult={tableResult}
        showQuestions={showQuestions}
        toggleQuestions={toggleQuestions}
        leagueId={leagueId}
      />
    </div>
  );
};

export default TournamentPage;
