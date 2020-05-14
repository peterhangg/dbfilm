import React from 'react'

import MovieCast from '../../components/MovieCast/MovieCast';
import MovieTrailer from '../../components/MovieTrailer/MovieTrailer';
import MovieDetails from '../../components/MovieDetails/MovieDetails';
import MovieReviews from '../../components/movieReviews/MovieReviews';
import MovieRecommendations from '../../components/MovieRecommendations/MovieRecommendations';


import './movieInfo.scss';

const MovieInfo = () => {

  return (
    <div className="movie-info-container">
      <MovieDetails />
      <div className="movie-info-container_credit">
        <MovieCast />
        <MovieTrailer />
        <MovieReviews />
        <MovieRecommendations />
      </div>
    </div>
  )
}


export default MovieInfo;
