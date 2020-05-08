import { combineReducers } from 'redux';
import configReducer from './configReducer';
import nowPlayingReducer from './nowPlayingReducer';
import popularMoviesReducer from './popularMoviesReducer';
import topRatedMoviesReducer from './topRatedMoviesReducer';
import upcomingMoviesReducer from './upcomingMoviesReducer';
import searchMoviesReducer from './searchMoviesReducer';
import movieCreditsReducer from './movieCreditsReducer';

const rootReducer = combineReducers({
  configReducer,
  nowPlayingReducer,
  popularMoviesReducer,
  topRatedMoviesReducer,
  upcomingMoviesReducer,
  searchMoviesReducer,
  movieCreditsReducer
});

export default rootReducer;