import { getTournaments } from "../api/apiTournaments";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setError, setTournaments, setTotalPages } from "../actions/tournamentsAction"; 
export const useTournaments = (filters, sort, currentPage, pageSize = 10) => {
    const dispatch = useDispatch();
    
    const { tournaments, totalPages, isLoading, error } = useSelector((state) => state.tournaments);
  
    const fetchTournaments = async () => {
      if (!filters.leagueId&&!filters.name) {
        return; 
      }
  
      dispatch(setLoading(true)); 
  
      try {
        const { leagueId, name } = filters;
        const { field, direction } = sort;
  
        const tournamentsData = await getTournaments(
          { leagueId, name },
          { field, direction },
          currentPage,
          pageSize 
        );
  
        if (tournamentsData && tournamentsData.content) {
          dispatch(setTournaments(tournamentsData.content));
          dispatch(setTotalPages(tournamentsData.totalPages || 0));
        } else {
          dispatch(setTournaments([]));
          dispatch(setTotalPages(0));
        }
      } catch (err) {
        dispatch(setError('Ошибка при загрузке турниров'));
        console.error("Error fetching tournaments:", err);
      } finally {
        dispatch(setLoading(false)); 
      }
    };
  
    // Run fetchTournaments when dependencies change (filters, sort, page)
    useEffect(() => {
      fetchTournaments();
    }, [dispatch, filters, sort, currentPage, pageSize]);
  
    // Return refetch function that can be used to trigger a reload of tournaments
    const refetch = () => {
      fetchTournaments();
    };
  
    return { tournaments, totalPages, isLoading, error, refetch };
  };
  