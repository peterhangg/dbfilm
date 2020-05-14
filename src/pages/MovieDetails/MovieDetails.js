import React from 'react'

import MovieCast from '../../components/MovieCast/MovieCast';
import MovieTrailer from '../../components/MovieTrailer/MovieTrailer';
import MovieDetailsHeader from '../../components/MovieDetailsHeader/MovieDetailsHeader';
import MovieReviews from '../../components/movieReviews/MovieReviews';
import MovieRecommendations from '../../components/MovieRecommendations/MovieRecommendations';


import './movieDetails.scss';

const MovieInfo = () => {

  return (
    <div className="movie-info-container">
      <MovieDetailsHeader />
      <MovieCast />
      <MovieTrailer />
      <MovieReviews />
      <MovieRecommendations />
    </div>
  )
}


export default MovieInfo;
