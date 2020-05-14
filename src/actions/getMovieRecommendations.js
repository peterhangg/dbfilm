import { GET_MOVIE_RECOMMENDATIONS_SUCCESS, GET_MOVIE_RECOMMENDATIONS_ERROR } from '../constants/action-types';
import axios from 'axios';

export const getMovieRecommandationsSuccess = data => ({
  type: GET_MOVIE_RECOMMENDATIONS_SUCCESS,
  payload: data
});

export const getMovieRecommendationsError = () => ({
  type: GET_MOVIE_RECOMMENDATIONS_ERROR
});

export const fetchMovieRecommendations = (id) => {
  return async dispatch => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
      const data = await response.data;

      dispatch(getMovieRecommandationsSuccess(data));
    } catch (error) {
      dispatch(getMovieRecommendationsError());
    }
  }
};