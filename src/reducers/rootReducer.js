import { combineReducers } from 'redux';
import nowPlayingReducer from './nowPlayingReducer';
import configReducer from './configReducer';

const rootReducer = combineReducers({
  nowPlayingReducer,
  configReducer
});

export default rootReducer;