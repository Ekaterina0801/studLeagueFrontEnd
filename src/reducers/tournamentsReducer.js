const initialState = {
    tournaments: [],
    totalPages: 0,
    isLoading: false,
    error: null,
  };
  
  const tournamentsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_TOURNAMENTS':
        return {
          ...state,
          tournaments: action.payload,
        };
      case 'SET_LOADING':
        return {
          ...state,
          isLoading: action.payload,
        };
      case 'SET_ERROR':
        return {
          ...state,
          error: action.payload,
        };
      case 'SET_TOTAL_PAGES':
        return {
          ...state,
          totalPages: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default tournamentsReducer;
  