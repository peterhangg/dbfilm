import React, { useEffect } from 'react'
import { fetchMovies } from '../actions/getMovies';
import { connect, useDispatch, useSelector } from 'react-redux';
import Movies from './Movies';

const MovieList = ({loading, errors, movies}) => {
  // const { movies, loading, errors } = useSelector(state => state.movieReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovies());
  },[dispatch]);
  
  const renderMovies = () => {
    if (loading) return <p>Loading movies...</p>
    if (errors) return <p>Unable to display movies.</p>
    if (movies.results) return movies.results.map((movie,index) => <Movies key={movie.id} movie={movie} />);
  }

  return (
    <div>
      <h2>MovieList</h2>
      {renderMovies()}
    </div>
  )
}

const mapStateToProps = state => ({
    movies: state.movieReducer.movies,
    loading: state.movieReducer.loading,
    error: state.movieReducer.error
});

// export default connect(mapStateToProps)(MovieList);
export default connect(mapStateToProps)(MovieList);
