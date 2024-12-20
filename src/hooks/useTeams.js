import { useState, useEffect } from 'react';
import { getTeams } from '../api/apiTeams';
import { useDispatch, useSelector } from "react-redux";
import {setLoading,setError, setTeams, setTotalPages} from "../actions/teamsAction"; 
const useTeams = (filters, sort, currentPage) => {
  const dispatch = useDispatch();
  const {teams, totalPages, isLoading, error } = useSelector((state) => state.teams);

  useEffect(() => {
    const fetchTeams = async () => {
      if (!filters.leagueId) {
        return; 
      }
      dispatch(setLoading(true)); 
      
      try {
       const { leagueId, name } = filters;
        const { field, direction } = sort;

        if (!leagueId) {
          return;
        }
        const teamsData = await getTeams({ leagueId,name }, { field, direction }, currentPage, 10); 

        console.log('Fetched teams data:', teamsData); 
        
  
        if (teamsData && Array.isArray(teamsData.content)) {
          dispatch(setTeams(teamsData.content));
          dispatch(setTotalPages(teamsData.totalPages || 0));
        } else {
          dispatch(setTeams([]));
          dispatch(setTeams(0));
        }
      } catch (err) {
        dispatch(setError("Ошибка при загрузке команд: " + (err.message || "Произошла ошибка")));
        console.error(err);
      } finally {
        dispatch(setLoading(false)); 
      }
    };

    fetchTeams();
  }, [dispatch, filters, sort, currentPage]); 

  return { teams, totalPages, isLoading, error };
};

export default useTeams;
