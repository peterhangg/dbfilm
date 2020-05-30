import { ADD_FAVOURITE_MOVIE, GET_FAVOURITE_MOVIES, DELETE_FAVOURITE_MOVIE } from './../constants/action-types';

const initialState = {
  favouriteMovies: [],
  loading: false,
  error: false
};

const favouriteMovieReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_FAVOURITE_MOVIE:
      return { ...state, favouriteMovies: [...state.favouriteMovies, action.payload] };
    case GET_FAVOURITE_MOVIES:
      return { ...state, favouriteMovies: action.payload };
    case DELETE_FAVOURITE_MOVIE:
      return { ...state, favouriteMovies: state.favouriteMovies.filter(movie => movie. id !== action.payload) };
    default:
      return state;
  }
};

export default favouriteMovieReducer;