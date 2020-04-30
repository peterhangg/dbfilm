import React from 'react'

const Movies = ({movie}) => {
  return (
      <div className="swiper-slide">
        <h4>{movie.title}</h4>
        <img className="swiper-slide_image" src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt="{props.movie.title}"/>
        <p>
          <img src="https://img.icons8.com/android/14/000000/star.png" alt="star"/>
          {movie.vote_average}
        </p>
      </div>
  )
}

export default Movies;
