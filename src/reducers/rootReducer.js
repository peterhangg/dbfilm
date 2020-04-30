import { combineReducers } from 'redux';
import configReducer from './configReducer';
import nowPlayingReducer from './nowPlayingReducer';
import latestMoviesReducer from './latestMoviesReducer';

const rootReducer = combineReducers({
  nowPlayingReducer,
  configReducer,
  latestMoviesReducer
});

export default rootReducer;