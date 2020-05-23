import { GET_MOVIE_REVIEWS_SUCCESS, GET_MOVIE_REVIEWS_ERROR } from '../constants/action-types';

const initialState = {
  reviews: [],
  loading: true,
  error: false
};

const movieReviewsReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_MOVIE_REVIEWS_SUCCESS:
      return { ...state, reviews: action.payload, loading: false }
    case GET_MOVIE_REVIEWS_ERROR:
      return { ...state, loading: false, error: true }
  default:
    return state
  }
};

export default movieReviewsReducer;