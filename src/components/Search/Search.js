import React from 'react';
import { connect } from 'react-redux';


const Search = ({searchResultMovies, searchMoviesLoading, searchMoviesError, config}) => {
  const baseURL = `${config.images ? config.images.base_url : ''}${config.images ? config.images.poster_sizes[2] : ''}`

  if (searchMoviesLoading) return <p>Loading movies...</p>
  if (searchMoviesError) return <p>Unable to display movies.</p>

  return (
    <div className="search-container">
      <h2>Search Results</h2>
      {searchResultMovies.results.length > 0 ? searchResultMovies.results.filter(movie => movie.poster_path).map(movie => (
        <div key={movie.id} className="search-movie">
        <h4 className="search-movie_title">{movie.title}</h4>
        <img
          className="search-movie_image"
          src={movie.poster_path === null ? `http://via.placeholder.com/200x300` : `${baseURL}${movie.poster_path}`}
          alt={movie.title}
        />
        <p className="swiper-slide_score">
          <img className="swiper-slide_score-icon" src="https://img.icons8.com/offices/14/000000/filled-star.png"alt="Movie Score"/>
          {movie.vote_average}
        </p>
      </div>
      )) :
      <p>Sorry no results found!</p>
      }
    </div>
  )
}

const mapStateToProps = state => ({
  searchResultMovies: state.searchMoviesReducer.movies,
  searchMoviesLoading: state.searchMoviesReducer.loading,
  searchMoviesError: state.searchMoviesReducer.error,
  config: state.configReducer.config
});

export default connect(mapStateToProps)(Search);