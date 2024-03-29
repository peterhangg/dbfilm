import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSearchMovies } from '../../actions/getSearchMovies';
import { Link } from 'react-router-dom';

import Pagination from '../../components/Pagination/Pagination';
import Footer from '../../components/Footer/Footer';
import Loader from '../../components/Loader/Loader';

import './search.scss';

const Search = ({ searchResultMovies, searchMoviesLoading, searchMoviesError, config, totalPages }) => {
  // This is to get your search parmas from route search-result/:id
  const { searchInput } = useParams();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const baseURL = `${config.images ? config.images.base_url : ''}${config.images ? config.images.poster_sizes[2] : ''}`

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchSearchMovies(searchInput, currentPage));
  },[currentPage, dispatch, searchInput]);

  if (searchMoviesLoading) return <p>Loading...</p>;
  if (searchMoviesError) return <p>Unable to display movies.</p>;

  return (
    <div className="search-movie-container">
      <Loader />
      <h2 className="search-movie-container_title">Results for: {searchInput}</h2>
      <div className="search-movie-wrapper">
        {searchResultMovies.results.length > 0 ? searchResultMovies.results.filter(movie => movie.poster_path).map(movie => (
        <div key={movie.id} className="search-movie">
          <Link to={`/movie/${movie.id}`}>
            <img
              className="search-movie_image"
              src={movie.poster_path === null ? `http://via.placeholder.com/200x300` : `${baseURL}${movie.poster_path}`}
              alt={movie.title}
            />
          </Link>
          <h4 className="search-movie_title">{movie.title}</h4>
          <p className="search-movie_score">
            <img className="search-movie_score-icon" src="https://img.icons8.com/offices/14/000000/filled-star.png"alt="Movie Score"/>
            {movie.vote_average}
          </p>
        </div>
        )) :
        <p>Sorry no results found!</p>
        }
      </div>
        <Pagination totalPages={totalPages} paginate={paginate} currentPage={currentPage}/>
        <Footer />
    </div>
  )
};

const mapStateToProps = state => ({
  searchResultMovies: state.searchMoviesReducer.movies,
  searchMoviesLoading: state.searchMoviesReducer.loading,
  searchMoviesError: state.searchMoviesReducer.error,
  config: state.configReducer.config,
  totalPages: state.searchMoviesReducer.movies.total_pages,
  totalResults: state.searchMoviesReducer.movies.total_results
});

export default connect(mapStateToProps)(Search);
