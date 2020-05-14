import { GET_MOVIE_CREDITS_SUCCESS, GET_MOVIE_CREDITS_ERROR } from '../constants/action-types';

const initialState = {
  credit: [],
  loading: true,
  error: false
};

const movieCreditsReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_MOVIE_CREDITS_SUCCESS:
      return { ...state, credit: action.payload, loading: false }
    case GET_MOVIE_CREDITS_ERROR:
      return { ...state, loading: false, error: true }
    default:
      return state
  }
};

export default movieCreditsReducer;