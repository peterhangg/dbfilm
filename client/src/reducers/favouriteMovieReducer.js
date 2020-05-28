import { ADD_FAVOURITE_MOVIE } from './../constants/action-types';

const initialState = {
  favouriteMovies: {},
  loading: false,
  error: false
};

const favouriteMovieReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_FAVOURITE_MOVIE:
      return { ...state, favouriteMovies: action.payload };
    default:
      return state;
  }
};

export default favouriteMovieReducer;