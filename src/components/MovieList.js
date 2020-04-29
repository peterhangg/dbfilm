import React, { useEffect } from 'react'
import { fetchMovies } from '../actions/getMovies';
import { connect, useDispatch, useSelector } from 'react-redux';
import Movies from './Movies';

import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'

const MovieList = ({loading, errors, movies}) => {
  // const { movies, loading, errors } = useSelector(state => state.movieReducer);
  const dispatch = useDispatch();

  const swiper = new Swiper('.swiper-container', {
    init: true,
    slidesPerView: 10,
    loop: true,
    spaceBetween: 10,
    observer: true,
  
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    }
});

  useEffect(() => {
    dispatch(fetchMovies());
  },[dispatch]);
  
  const renderMovies = () => {
    if (loading) return <p>Loading movies...</p>
    if (errors) return <p>Unable to display movies.</p>
    if (movies.results) return movies.results.map((movie,index) => <Movies key={movie.id} movie={movie} />);
  }

  return (
    <div className="swiper-container">
      <h2>MovieList</h2>
      <div className="swiper-wrapper">
        {renderMovies()}
      </div>
      <div className="swiper-button-prev"></div>
      <div className="swiper-button-next"></div>
    </div>
  )
}

const mapStateToProps = state => ({
    movies: state.movieReducer.movies,
    loading: state.movieReducer.loading,
    error: state.movieReducer.error
});

export default connect(mapStateToProps)(MovieList);
