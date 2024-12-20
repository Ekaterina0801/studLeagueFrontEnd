const initialState = {
    teams: [],
    totalPages: 0,
    isLoading: false,
    error: null,
  };
  
  const teamsReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_TEAMS":
        return {
          ...state,
          teams: action.payload,
        };
      case "SET_TOTAL_PAGES":
        return {
          ...state,
          totalPages: action.payload,
        };
      case "SET_LOADING":
        return {
          ...state,
          isLoading: action.payload,
        };
      case "SET_ERROR":
        return {
          ...state,
          error: action.payload,
        };
      case "REMOVE_TEAM":
        return {
          ...state,
          teams: state.teams.filter(
            (team) => team.id !== action.payload
          ),
        };
      default:
        return state;
    }
  };
  
  
  export default teamsReducer;
  