import React, { useEffect } from 'react'
import { fetchMovies } from '../actions/getMovies';
import { connect, useDispatch, useSelector } from 'react-redux';
import Movies from './Movies';

const MovieList = (props) => {
  // const { movies, loading, errors } = useSelector(state => state.movieReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovies());
  },[dispatch]);
  
  const renderMovies = () => {
    if (props.loading) return <p>Loading movies...</p>
    if (props.errors) return <p>Unable to display movies.</p>
    if (props.movies.results) return props.movies.results.map((movie,index) => <Movies key={index} movie={movie} />);
  }

  return (
    <div>
      <h2>MovieList</h2>
      {renderMovies()}
    </div>
  )
}

const mapStateToProps = state => {
  console.log("HERE", state)
  return {
    movies: state.movieReducer.movies,
    loading: state.movieReducer.loading,
    error: state.movieReducer.error

  }
}

// export default connect(mapStateToProps)(MovieList);
export default connect(mapStateToProps)(MovieList);
