import {
  ADD_FAVOURITE_MOVIE 
} from './../constants/action-types';

import { returnErrors } from './errorActions';
import axios from 'axios';
import { tokenConfig } from './authActions';

export const addToFavourites = (movieData) => {
  // Request body
  const body = JSON.stringify(movieData);

  return async (dispatch, getState) => {
    try {
      const response = await axios.post('/api/favourite', body, tokenConfig(getState));
      const data = await response.data;
      dispatch({ type: ADD_FAVOURITE_MOVIE, payload: data });
    } catch (error) {
      dispatch(returnErrors(error.response.data, error.response.status));
    }
  };
}