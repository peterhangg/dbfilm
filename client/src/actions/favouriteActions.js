import {
  ADD_FAVOURITE_MOVIE,
  GET_FAVOURITE_MOVIES,
  DELETE_FAVOURITE_MOVIE
} from './../constants/action-types';

import { returnErrors } from './errorActions';
import axios from 'axios';
import { tokenConfig } from './authActions';

export const fetchFavouriteMovies = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get('https://dbfilm-react.herokuapp.com/api/favourite', tokenConfig(getState));
      const data = await response.data;
  
      dispatch({ type: GET_FAVOURITE_MOVIES, payload: data });
    } catch (error) {
      dispatch(returnErrors(error.response.data, error.response.status));
    }
  }
};

export const addToFavourites = (movieData) => {
  // Request body
  const body = JSON.stringify(movieData);

  return async (dispatch, getState) => {
    try {
      const response = await axios.post('https://dbfilm-react.herokuapp.com/api/favourite', body, tokenConfig(getState));
      const data = await response.data;
      dispatch({ type: ADD_FAVOURITE_MOVIE, payload: data });
    } catch (error) {
      dispatch(returnErrors(error.response.data, error.response.status));
    }
  };
};

export const deleteFavouriteMovie = (movieId) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.delete(`https://dbfilm-react.herokuapp.com/api/favourite/${movieId}`, tokenConfig(getState));
      const data = await response.data;
      dispatch({ type: DELETE_FAVOURITE_MOVIE, payload: data });
    } catch (error) {
      dispatch(returnErrors(error.response.data, error.response.status));
    }
  };
};