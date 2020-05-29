import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './favourite.scss'

const Favourite = ({ favouriteMovies }) => {
  return (
    <div className="favourite-movies-container">
      <div className="favourite-movie-wrapper">
      {favouriteMovies.length > 0 ? favouriteMovies.map((movie, index) => (
        <div className="favourite-movie" key={index}>
          <Link to={`/movie/${movie.movieId}`}>
            <img 
              className="favourite-movie_image" 
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : `http://via.placeholder.com/200x300` }
              alt={movie.title}
            />
          </Link>
          <h4 className="favourite-movie_title">{movie.title}</h4>
          <p className="favourite-movie_score">
            <img className="favourite-movie_score-icon" src="https://img.icons8.com/offices/14/000000/filled-star.png"alt="Movie Score"/>
            {movie.vote_average}
          </p>
        </div>
        )) : (
          <p>Your favourite movies list is empty!</p>
        )
      }
      </div>
    </div>
  )
};

const mapStateToProps = state => ({
  favouriteMovies: state.favouriteMovieReducer.favouriteMovies
});

export default connect(mapStateToProps)(Favourite);
