import React from 'react'
import MovieItems from '../MovieItems/MovieItems';

import './movieList.scss';
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.min.css";

const MovieList = ({label, loading, errors, movies}) => {

  const renderMovies = () => {
    if (loading) return <p>Loading movies...</p>
    if (errors) return <p>Unable to display movies.</p>
    if (movies.results) return movies.results.map(movie => <MovieItems key={movie.id} movie={movie} />);
  };

  return (
    <ScrollAnimation animateIn="fadeIn" animateOnce={true} duration={2}>
      <div className="swiper-container">
        <h2 className="swiper-container_label">{label}</h2>
        <div className="swiper-wrapper">
          {renderMovies()}
        </div>
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </div>
    </ScrollAnimation>
  )
}

export default MovieList;
