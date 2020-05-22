import { GET_SEARCH_MOVIES_SUCCESS, GET_SEARCH_MOVIES_ERROR } from '../constants/action-types';

const initialState = {
  movies: [],
  loading: true,
  error: false
};

const searchMoviesReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_SEARCH_MOVIES_SUCCESS:
      return { ...state, movies: action.payload, loading: false }
    case GET_SEARCH_MOVIES_ERROR:
      return { ...state, loading: false, error: true }
    default:
      return state
  }
};

export default searchMoviesReducer;