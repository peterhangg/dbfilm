import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Footer from '../../components/Footer/Footer';

import { fetchFavouriteMovies } from '../../actions/favouriteActions';

import posterPlaceholder from '../../images/poster-placeholder.jpg';
import './favourite.scss'

const Favourite = ({ favouriteMovies }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFavouriteMovies());
  }, [dispatch]);

  return (
    <div className="favourite-movies-container">
      <h2 className="favourite-movies-container_header">Favourite Movies</h2>
      <div className="favourite-movie-wrapper">
      {favouriteMovies.length > 0 ? favouriteMovies.map((movie, index) => (
        <div className="favourite-movie" key={index}>
          <Link to={`/movie/${movie.id}`}>
            <img
              className="favourite-movie_image"
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : posterPlaceholder }
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
      <Footer />
    </div>
  )
};

const mapStateToProps = state => ({
  favouriteMovies: state.favouriteMovieReducer.favouriteMovies
});

export default connect(mapStateToProps)(Favourite);
