import { getTournaments } from "../api/apiTournaments";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setError, setTournaments, setTotalPages } from "../actions/tournamentsAction"; 

const useTournaments = (filters, sort, currentPage, pageSize = 10) => {
  const dispatch = useDispatch();
  
  const { tournaments, totalPages, isLoading, error } = useSelector((state) => state.tournaments);

  useEffect(() => {
    const fetchTournaments = async () => {
      if (!filters.leagueId) {
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


    fetchTournaments();
  }, [dispatch, filters, sort, currentPage, pageSize]);

  return { tournaments, totalPages, isLoading, error };
};

export default useTournaments;
