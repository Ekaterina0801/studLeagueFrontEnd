import React, { useState } from 'react';
import { getAllControversialsFromTournament } from '../api/apiTournaments';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Cookies from "js-cookie"; 
import useManagerCheck from '../hooks/useManagerCheck';
const ControversialsPage = () => {
    const {tournamentId} = useParams(); 
    const [controversials, setControversials] = useState([]);
    const [leagueId, setLeagueId] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const controversialsData = await getAllControversialsFromTournament(tournamentId);
            setControversials(controversialsData);
            console.log('controversials', controversialsData);
            const leagueIdFromCookie = Cookies.get("leagueId");
            setLeagueId(leagueIdFromCookie);
          } catch (error) {
            console.error("Ошибка при загрузке данных:", error);
          }
        };
    
        fetchData();
      }, [tournamentId]);
      const { isManager, errorManager } = useManagerCheck(leagueId); 
  if (errorManager) {
    return <p>Error loading manager status: {error.message}</p>;
}
    return (
        <div>
            {/* <h1>{tournament ? tournament.name : 'Турнир недоступен'}</h1> */}
            <h1>Спорные ответы турнира</h1>
            {controversials && controversials.length > 0 ? (
                <table className="table">
                    <thead>
                        <tr>
                            <th>№</th>
                            <th>Название команды</th>
                            <th>Номер вопроса</th>
                            <th>Ответ команды</th>
                            <th>Статус</th>
                            <th>Комментарий</th>
                            <th>Комментарий апелляционного жюри</th>
                        </tr>
                    </thead>
                    <tbody>
                        {controversials.map((controversial, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{controversial.fullResult?.team?.name || 'Нет названия'}</td>
                                <td>{controversial.questionNumber}</td>
                                <td>{controversial.answer}</td>
                                <td>{controversial.status}</td>
                                <td>{controversial.comment}</td>
                                <td>{controversial.appealJuryComment}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Спорные отсутствуют</p>
            )}
        </div>
    );
};

export default ControversialsPage;
