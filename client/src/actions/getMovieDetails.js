import { GET_MOVIE_DETAILS_SUCCESS, GET_MOVIE_DETAILS_ERROR } from '../constants/action-types';
import axios from 'axios';

export const getMovieDetailsSuccess = data => ({
  type: GET_MOVIE_DETAILS_SUCCESS,
  payload: data
});

export const getMovieDetailsError = () => ({
  type: GET_MOVIE_DETAILS_ERROR
});

export const fetchMovieDetails = (id) => {
  return async dispatch => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
      const data = await response.data;

      dispatch(getMovieDetailsSuccess(data));
    } catch (error) {
      dispatch(getMovieDetailsError());
    }
  }
};