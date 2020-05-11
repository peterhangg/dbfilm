import React from 'react'

import MovieCast from '../../components/MovieCast/MovieCast';
import MovieTrailer from '../../components/MovieTrailer/MovieTrailer';

import './movieInfo.scss';

const MovieInfo = () => {

  return (
    <div className="movie-info-container">
      <h1>WELCOME TO MOVIE INFO PAGE</h1>
      <MovieCast />
      <MovieTrailer />
    </div>
  )
}


export default MovieInfo;
