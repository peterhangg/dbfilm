import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';

import MovieCast from '../../components/MovieCast/MovieCast';
import MovieTrailer from '../../components/MovieTrailer/MovieTrailer';
import MovieDetailsHeader from '../../components/MovieDetailsHeader/MovieDetailsHeader';
import MovieReviews from '../../components/movieReviews/MovieReviews';
import MovieRecommendations from '../../components/MovieRecommendations/MovieRecommendations';
import Footer from '../../components/Footer/Footer';
import Loader from '../../components/Loader/Loader';
import './movieDetails.scss';

const MovieInfo = () => {
  const { id } = useParams();

  useEffect(() => {
    // Scroll to top of page when render
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="movie-info-container">
      <Loader />
      <MovieDetailsHeader />
      <MovieCast />
      <MovieTrailer />
      <MovieReviews />
      <MovieRecommendations />
      <Footer />
    </div>
  )
}

export default MovieInfo;
