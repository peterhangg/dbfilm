import { combineReducers } from 'redux';
import configReducer from './configReducer';
import nowPlayingReducer from './nowPlayingReducer';
import popularMoviesReducer from './popularMoviesReducer';

const rootReducer = combineReducers({
  nowPlayingReducer,
  configReducer,
  popularMoviesReducer
});

export default rootReducer;