import { GET_MOVIE_TRAILER_SUCCESS, GET_MOVIE_TRAILER_ERROR } from '../constants/action-types';
import axios from 'axios';

export const getMovieTrailerSuccess = data => ({
  type: GET_MOVIE_TRAILER_SUCCESS,
  payload: data
});

export const getMovieTrailerError = () => ({
  type: GET_MOVIE_TRAILER_ERROR
});

export const fetchMovieTrailer = (id) => {
  return async dispatch => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
      const data = await response.data;

      dispatch(getMovieTrailerSuccess(id));
    } catch (error) {
      dispatch(getMovieTrailerError());
    }
  }
};