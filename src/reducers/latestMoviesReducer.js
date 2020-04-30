import { GET_LATEST_SUCCESS, GET_LATEST_ERROR } from '../constants/action-types';

const initialState = {
  movies: [],
  loading: true,
  errors: false
};

const latestMoviesReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_LATEST_SUCCESS: 
      return { ...state, movies: action.payload, loading: false }
    case GET_LATEST_ERROR:
      return { ...state, loading: false, hasError: true }
    default:
      return state
  }
};

export default latestMoviesReducer;