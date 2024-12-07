import React, { useState} from "react";
import { useParams } from "react-router-dom";
import TeamsSection from "../components/tables/TeamSection";
import ResultsSection from "../components/tables/ResultsSection";
import FileUpload from "../components/file-upload/FileUpload";
import useManagerCheck from "../hooks/useManagerCheck";
import useTournamentData from "../hooks/useTournamentData";
const TournamentPage = () => {
    const { tournamentId } = useParams();
    const { tournament, teamCompositions, tableResult, leagueId, loading, error: tournamentError } = useTournamentData(tournamentId);
  
    const { isManager, error: managerError } = useManagerCheck(leagueId);
  
    const [showQuestions, setShowQuestions] = useState(true);
  
  
    if (tournamentError) {
      return <p>{tournamentError?.message || tournamentError}</p>;
    }
  
    if (loading) {
      return <p>Загрузка...</p>;
    }
  
    const toggleQuestions = () => {
      setShowQuestions(prevState => !prevState);
    };
  
    return (
      <div>
        <h1>{tournament.name}</h1>
        
        <TeamsSection
          tournamentId={tournamentId}
          teamCompositions={teamCompositions}
          leagueId={leagueId}
          leaguesIds={tournament.leaguesIds}
        />
  
        <h2>Результаты</h2>
        <h3>Загрузить результаты турнира</h3>
        <FileUpload tournamentId={tournamentId} leagueId={leagueId} />
        <a
          href={`/leagues/${leagueId}/tournaments/${tournamentId}/controversials`}
          className="name-ref"
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