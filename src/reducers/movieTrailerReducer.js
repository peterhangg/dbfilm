import { GET_MOVIE_TRAILER_SUCCESS, GET_MOVIE_TRAILER_ERROR } from '../constants/action-types';

const initialState = {
  trailer: {},
  loading: true,
  error: false
};

const movieTrailerReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_MOVIE_TRAILER_SUCCESS:
      return { ...state, credit: action.payload, loading: false }
    case GET_MOVIE_TRAILER_ERROR:
      return { ...state, loading: false, error: true }
    default:
      return state
  }
};

export default movieTrailerReducer;