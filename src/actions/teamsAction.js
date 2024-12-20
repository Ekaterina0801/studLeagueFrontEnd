export const setTeams = (teams) => ({
    type: 'SET_TEAMS',
    payload: teams,
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

  export const removeTeam = (teamId) => ({
    type: "REMOVE_TEAM",
    payload: teamId,
  });
  
  