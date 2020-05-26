import {
  USER_LOADING,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  AUTH_ERROR,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_ERRORS
} from '../constants/action-types';
import { returnErrors } from './errorActions';
import axios from 'axios';

// check token & Load User
export const loadUser = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: USER_LOADING });
      const response = await axios.get('/api/auth/user', tokenConfig(getState));
      const data = await response.data;
      
      dispatch({ type: USER_LOADED, payload: data});
    } catch (error) {
      dispatch(returnErrors(error.response.data, error.response.status));
      dispatch({ type: AUTH_ERROR });
    }
  };
};

// Register User
export const register = ({ name, email, password }) => {
  return async dispatch => {
    try {
      // headers
      const config = { 
        headers: { "Content-type": "application/json" } 
      };
      // Request body
      const body = JSON.stringify({ name, email, password });

      const response = await axios.post("/api/users", body, config);
      const data = await response.data;

      dispatch({ type: CLEAR_ERRORS });
      dispatch({ type: REGISTER_SUCCESS, payload: data });
    
    } catch (error) {
      dispatch({ type: REGISTER_FAIL });
      dispatch(returnErrors(error.response.data, error.response.status, 'REGISTER_FAIL'));
    }
  }
};

// Logout User
export const logout = () => {
  return { type: LOGOUT_SUCCESS };
};

//setup config/headers and token
export const tokenConfig = (getState) => {
  // Get token from local storage:
  const token = getState().authReducer.token;
  // set headers
  const config = {
    headers: {
      'Content-type': 'application/json',
    }
  };
  // If token, add to headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  console.log("THIS IS THE HEADER CONFIG ==> ", config);
  return config;
};