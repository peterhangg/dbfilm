import { GET_TOP_RATED_MOVIES_SUCCESS, GET_TOP_RATED_MOVIES_ERROR } from '../constants/action-types';
import axios from 'axios';

export const getTopRatedMoviesSuccess = data => ({
  type: GET_TOP_RATED_MOVIES_SUCCESS,
  payload: data
});

export const getTopRatedMoviesError = () => ({
  type: GET_TOP_RATED_MOVIES_ERROR
});

export const fetchTopRatedMovies = () => {
  return async dispatch => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
      const data = await response.data;

      dispatch(getTopRatedMoviesSuccess(data));
    } catch (error) {
      dispatch(getTopRatedMoviesError());
    }
  }
};