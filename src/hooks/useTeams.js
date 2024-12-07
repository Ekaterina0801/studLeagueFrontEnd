import { useState, useEffect } from 'react';
import { getTeams } from '../api/apiTeams';
import axios from "axios"; 
const useTeams = (filters, sort, currentPage) => {
  const [teams, setTeams] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      setIsLoading(true);
      setError(null); 
      try {
       const { leagueId, name } = filters;
        const { field, direction } = sort;

        if (!leagueId) {
          return;
        }
        const teamsData = await getTeams({ leagueId,name }, { field, direction }, currentPage, 10); 

        console.log('Fetched teams data:', teamsData); 
        
  
        if (teamsData && Array.isArray(teamsData.content)) {
          setTeams(teamsData.content);
          setTotalPages(teamsData.totalPages || 0);
        } else {
          setTeams([]);
          setTotalPages(0);
        }
      } catch (err) {
        setError("Ошибка при загрузке команд: " + (err.message || "Произошла ошибка"));
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeams();
  }, [filters, sort, currentPage]); 

  return { teams, totalPages, isLoading, error };
};

export default useTeams;
