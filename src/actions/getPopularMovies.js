import { GET_POPULAR_MOVIES_SUCCESS, GET_POPULAR_MOVIES_ERROR } from '../constants/action-types';
import axios from 'axios';

export const getPopularMoviesSuccess = data => ({
  type: GET_POPULAR_MOVIES_SUCCESS,
  payload: data
});

export const getPopularMoviesError = () => ({
  type: GET_POPULAR_MOVIES_ERROR
});

export const fetchLatestMovies = () => {
  return async dispatch => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
      const data = await response.data;
    
      dispatch(getPopularMoviesSuccess(data))
    } catch (error) {
      dispatch(getPopularMoviesError())
    }
  }
} 