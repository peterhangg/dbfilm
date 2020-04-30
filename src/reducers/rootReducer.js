import { combineReducers } from 'redux';
import configReducer from './configReducer';
import nowPlayingReducer from './nowPlayingReducer';
import popularMoviesReducer from './popularMoviesReducer';
import topRatedMoviesReducer from './topRatedMoviesReducer';
import upcomingMoviesReducer from './upcomingMoviesReducer';

const rootReducer = combineReducers({
  configReducer,
  nowPlayingReducer,
  popularMoviesReducer,
  topRatedMoviesReducer,
  upcomingMoviesReducer
});

export default rootReducer;