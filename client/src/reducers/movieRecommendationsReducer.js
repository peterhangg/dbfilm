import { GET_MOVIE_RECOMMENDATIONS_SUCCESS, GET_MOVIE_RECOMMENDATIONS_ERROR } from '../constants/action-types';

const initialState = {
  movieRecommendations: [],
  loading: true,
  error: false
};

const movieDetailsReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_MOVIE_RECOMMENDATIONS_SUCCESS:
      return { ...state, movieRecommendations: action.payload, loading: false }
    case GET_MOVIE_RECOMMENDATIONS_ERROR:
      return { ...state, loading: false, error: true }
    default:
      return state
  }
};

export default movieDetailsReducer;