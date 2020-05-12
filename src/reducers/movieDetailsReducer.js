import { GET_MOVIE_DETAILS_SUCCESS, GET_MOVIE_DETAILS_ERROR } from '../constants/action-types';

const initialState = {
  movieDetails: {},
  loading: true,
  error: false
};

const movieDetailsReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_MOVIE_DETAILS_SUCCESS:
      return {...state, movieDetails: action.payload, loading: false }
    case GET_MOVIE_DETAILS_ERROR:
      return { ...state, loading: false, error: true }
    default:
      return state
  }
};

export default movieDetailsReducer;