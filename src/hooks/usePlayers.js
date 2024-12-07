import { useState, useEffect } from "react";
import { getPlayers } from "../api/apiPlayers";


const usePlayers = (filters, sort, currentPage) => {
  const [players, setPlayers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      setIsLoading(true);
      setError(null); 
      try {
        const { name, surname, teamId, bornBefore, bornAfter } = filters;
        const { field, direction } = sort;

        const playersData = await getPlayers(
          {
            name,
            surname,
            teamId,
            bornBefore,
            bornAfter,
          },
          {
            field,
            direction,
          },
          currentPage,
          10 // Adjust page size as needed
        );

        console.log("Fetched players data:", playersData);

        if (playersData && Array.isArray(playersData.content)) {
          setPlayers(playersData.content);
          setTotalPages(playersData.totalPages || 0);
        } else {
          setPlayers([]);
          setTotalPages(0);
        }
      } catch (err) {
        setError("Ошибка при загрузке игроков: " + (err.message || "Произошла ошибка"));
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlayers();
  }, [filters, sort, currentPage]); // Re-run when filters, sort, or page changes

  return { players, totalPages, isLoading, error };
};

export default usePlayers;
