import { GET_POPULAR_MOVIES_SUCCESS, GET_POPULAR_MOVIES_ERROR } from '../constants/action-types';

const initialState = {
  movies: [],
  loading: true,
  error: false
};

const popularMoviesReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_POPULAR_MOVIES_SUCCESS: 
      return { ...state, movies: action.payload, loading: false }
    case GET_POPULAR_MOVIES_ERROR:
      return { ...state, loading: false, error: true }
    default:
      return state
  }
};

export default popularMoviesReducer;