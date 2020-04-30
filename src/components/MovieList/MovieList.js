import React from 'react'
import Movies from '../MovieItems/MovieItems';

import './movieList.scss';

const MovieList = ({label, loading, errors, movies}) => {

  const renderMovies = () => {
    if (loading) return <p>Loading movies...</p>
    if (errors) return <p>Unable to display movies.</p>
    if (movies.results) return movies.results.map((movie,index) => <Movies key={movie.id} movie={movie} />);
  };

  return (
    <div className="swiper-container">
      <h2>{label}</h2>
      <div className="swiper-wrapper">
        {renderMovies()}
      </div>
      <div className="swiper-button-prev"></div>
      <div className="swiper-button-next"></div>
    </div>
  )
}

export default MovieList;
