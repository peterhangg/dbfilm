import { GET_SEARCH_MOVIES_SUCCESS, GET_SEARCH_MOVIES_ERROR } from '../constants/action-types';
import axios from 'axios';

export const getSearchMoviesSuccess = data => ({
  type: GET_SEARCH_MOVIES_SUCCESS,
  payload: data
});

export const getSearchMoviesError = () => ({
  type: GET_SEARCH_MOVIES_ERROR
});

export const fetchSearchMovies = (searchResult) => {
  return async dispatch => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchResult}&page=1&include_adult=false`);
      const data = await response.data;

      dispatch(getSearchMoviesSuccess(data));
    } catch (error) {
      dispatch(getSearchMoviesError());
    }
  }
};