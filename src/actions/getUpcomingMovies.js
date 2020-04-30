import { GET_UP_COMING_MOVIES_SUCCESS, GET_UP_COMING_MOVIES_ERROR } from '../constants/action-types';
import axios from 'axios';

export const getUpcomingMoviesSuccess = data => ({
  type: GET_UP_COMING_MOVIES_SUCCESS,
  payload: data
});

export const getUpcomingMoviesError = () => ({
  type: GET_UP_COMING_MOVIES_ERROR
});

export const fetchUpcomingMovies = () => {
  return async dispatch => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
      const data = await response.data;

      dispatch(getUpcomingMoviesSuccess(data));
    } catch (error) {
      dispatch(getUpcomingMoviesError());
    }
  }
};