import { GET_MOVIE_CREDITS_SUCCESS, GET_MOVIE_CREDITS_ERROR } from '../constants/action-types';
import axios from 'axios';

const getMovieCreditsSuccess = data => ({
  type: GET_MOVIE_CREDITS_SUCCESS,
  payload: data
});

export const getMovieCreditsError = () => ({
  type: GET_MOVIE_CREDITS_ERROR
});

export const fetchMovieCredits= (id) => {
  return async dispatch => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}`);
      const data = await response.data

      dispatch(getMovieCreditsSuccess(data));
    } catch (error) {
      dispatch(getMovieCreditsError());
    }
  }
};