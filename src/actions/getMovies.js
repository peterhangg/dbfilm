import { GET_MOVIES, GET_MOVIES_ERROR, GET_MOVIES_SUCCESS } from '../constants/action-types';
import axios from 'axios';

export const getMovies = () => ({
  type: GET_MOVIES
});

export const getMoviesSuccess = data => ({
  type: GET_MOVIES_SUCCESS,
  payload: data
});

export const getMoviesError = () => ({
  type: GET_MOVIES_ERROR
});

export const fetchMovies = () => {
  return async dispatch => {
    dispatch(getMovies());

    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
      const data = await response.data;
    
      dispatch(getMoviesSuccess(data))
    } catch (error) {
      dispatch(getMoviesError())
    }
  }
} 

