import React from 'react'

import MovieCast from '../../components/MovieCast/MovieCast';
import MovieTrailer from '../../components/MovieTrailer/MovieTrailer';
import MovieDetails from '../../components/MovieDetails/MovieDetails';
import MovieReviews from '../../components/movieReviews/MovieReviews';
import './movieInfo.scss';

const MovieInfo = () => {

  return (
    <div className="movie-info-container">
      <MovieDetails />
      <div className="movie-info-container_credit">
        <MovieCast />
        <MovieTrailer />
        <MovieReviews />
      </div>
    </div>
  )
}


export default MovieInfo;
