import { combineReducers } from 'redux';
import configReducer from './configReducer';
import nowPlayingReducer from './nowPlayingReducer';
import popularMoviesReducer from './popularMoviesReducer';
import topRatedMoviesReducer from './topRatedMoviesReducer';
import upcomingMoviesReducer from './upcomingMoviesReducer';
import searchMoviesReducer from './searchMoviesReducer';
import movieCreditsReducer from './movieCreditsReducer';
import movieTrailerReducer from './movieTrailerReducer';
import movieDetailsReducer from './movieDetailsReducer';
import movieReviewsReducer from './movieReviewsReducer';
import movieRecommendationsReducer from './movieRecommendationsReducer';
import actorDetailsReducer from './actorDetailsReducer';
import actorMovieCreditsReducer from './actorMovieCreditsReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  configReducer,
  nowPlayingReducer,
  popularMoviesReducer,
  topRatedMoviesReducer,
  upcomingMoviesReducer,
  searchMoviesReducer,
  movieCreditsReducer,
  movieTrailerReducer,
  movieDetailsReducer,
  movieReviewsReducer,
  movieRecommendationsReducer,
  actorDetailsReducer,
  actorMovieCreditsReducer,
  errorReducer,
  authReducer
});

export default rootReducer;