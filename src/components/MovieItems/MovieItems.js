import React from 'react'
import './movieItems.scss';

const MovieItems = ({movie}) => {
  return (
    <div className="swiper-slide">
      <h4>{movie.title}</h4>
      <img className="swiper-slide_image" src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} alt={movie.title}/>
      <p>
        <img src="https://img.icons8.com/android/14/000000/star.png" alt="star"/>
        {movie.vote_average}
      </p>
    </div>
  )
}

export default MovieItems;
