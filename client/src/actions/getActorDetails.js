import { GET_ACTOR_DETAILS_SUCCESS, GET_ACTOR_DETAILS_ERROR } from '../constants/action-types'
import axios from 'axios';

export const getActorDetailsSuccess = data => ({
  type: GET_ACTOR_DETAILS_SUCCESS,
  payload: data
});

export const getActorDetailsError = () => ({
  type: GET_ACTOR_DETAILS_ERROR
});

export const fetchActorDetails = (id) => {
  return async dispatch => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
      const data = await response.data;
      
      dispatch(getActorDetailsSuccess(data));
    } catch (error) {
      dispatch(getActorDetailsError());
    }
  }
};