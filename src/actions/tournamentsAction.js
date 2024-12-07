export const setTournaments = (tournaments) => ({
    type: 'SET_TOURNAMENTS',
    payload: tournaments,
  });
  
  export const setLoading = (isLoading) => ({
    type: 'SET_LOADING',
    payload: isLoading,
  });
  
  export const setError = (error) => ({
    type: 'SET_ERROR',
    payload: error,
  });
  
  export const setTotalPages = (totalPages) => ({
    type: 'SET_TOTAL_PAGES',
    payload: totalPages,
  });
  