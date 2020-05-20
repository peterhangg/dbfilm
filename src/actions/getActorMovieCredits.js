import { GET_ACTOR_MOVIE_CREDITS_SUCCESS, GET_ACTOR_MOVIE_CREDITS_ERROR } from '../constants/action-types';
import axios from 'axios';

export const getActorMovieCreditsSuccess = data => ({
  type: GET_ACTOR_MOVIE_CREDITS_SUCCESS,
  payload: data
});

export const getActorMovieCreditsError = () => ({
  type: GET_ACTOR_MOVIE_CREDITS_ERROR
});

export const fetchActorMovieCredits = (id) => {
  return async dispatch => {
    try {
      const response = await axios(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
      const data = await response.data;

      dispatch(getActorMovieCreditsSuccess(data));
    } catch (error) {
      dispatch(getActorMovieCreditsError());
    }
  }
};