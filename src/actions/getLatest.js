import { GET_LATEST_SUCCESS, GET_LATEST_ERROR } from '../constants/action-types';
import axios from 'axios';

export const getLatestSuccess = data => ({
  type: GET_LATEST_SUCCESS,
  payload: data
});

export const getLatestError = () => ({
  type: GET_LATEST_ERROR
});

export const fetchLatestMovies = () => {
  return async dispatch => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/latest?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
      const data = await response.data;
    
      dispatch(getLatestSuccess(data))
    } catch (error) {
      dispatch(getLatestError())
    }
  }
} 