import { GET_CONFIG } from '../constants/action-types';
import axios from 'axios';

const getConfig = data => ({
  type: GET_CONFIG,
  payload: data
});

export const fetchConfig = () => {
  return async dispatch => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/configuration?api_key=${process.env.REACT_APP_API_KEY}`);
      const data = await response.data

      dispatch(getConfig(data));
    } catch (error) {
      console.log(error)
    }
  }
}