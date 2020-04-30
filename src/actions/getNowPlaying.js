import { GET_NOWPLAYING_SUCCESS, GET_NOWPLAYING_ERROR } from '../constants/action-types';
import axios from 'axios';

export const getNowPlayingSuccess = data => ({
  type: GET_NOWPLAYING_SUCCESS,
  payload: data
});

export const getNowPlayingError = () => ({
  type: GET_NOWPLAYING_ERROR
});

export const fetchNowPlaying = () => {
  return async dispatch => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
      const data = await response.data;
    
      dispatch(getNowPlayingSuccess(data));
    } catch (error) {
      dispatch(getNowPlayingError());
    }
  }
};

