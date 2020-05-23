import { GET_MOVIE_REVIEWS_SUCCESS, GET_MOVIE_REVIEWS_ERROR } from '../constants/action-types';
import axios from 'axios';

export const getMovieReviewsSuccess = data => ({
  type: GET_MOVIE_REVIEWS_SUCCESS,
  payload: data
});

export const getMovieReviewsError = () => ({
  type: GET_MOVIE_REVIEWS_ERROR
});

export const fetchMovieReviews = (id) => {
  return async dispatch => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
      const data = await response.data;

      dispatch(getMovieReviewsSuccess(data));
    } catch (error) {
      dispatch(getMovieReviewsError());
    }
  }
}