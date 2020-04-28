import { combineReducers } from 'redux';
import getMovies from './movieReducer';

const rootReducer = combineReducers({
  getMovies
});

export default rootReducer;