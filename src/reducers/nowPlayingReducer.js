import { GET_NOWPLAYING_SUCCESS, GET_NOWPLAYING_ERROR } from '../constants/action-types';

const initialState = {
  movies: [],
  loading: true,
  errors: false
};

const nowPlayingReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_NOWPLAYING_SUCCESS: 
      return { ...state, movies: action.payload, loading: false }
    case GET_NOWPLAYING_ERROR:
      return { ...state, loading: false, hasError: true }
    default:
      return state
  }
};

export default nowPlayingReducer;