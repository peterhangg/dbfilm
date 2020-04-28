import { GET_MOVIES, GET_MOVIES_SUCCESS, GET_MOVIES_ERROR } from '../constants/action-types';

const initialState = {
  movies: [],
  loading: false,
  errors: false
};

const movieReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_MOVIES:
      return { ...state, loading: true } 
    case GET_MOVIES_SUCCESS: 
      return { ...state, movies: action.payload, loading: false }
    case GET_MOVIES_ERROR:
      return { ...state, loading: false, hasError: true }
    default:
      return state
  }
};

export default movieReducer;