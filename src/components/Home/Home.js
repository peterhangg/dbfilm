import React, {useEffect} from 'react'
import { connect, useDispatch } from 'react-redux';

import MovieList from '../MovieList/MovieList';

import { fetchConfig } from '../../actions/getConfig';
import { fetchNowPlaying } from '../../actions/getNowPlaying';
import { fetchPopularMovies } from '../../actions/getPopularMovies';
import { fetchTopRatedMovies} from '../../actions/getTopRatedMovies';

import Swiper from 'swiper';
import 'swiper/css/swiper.min.css';


const Home = (props) => {
  const dispatch = useDispatch();

  const swiper = new Swiper('.swiper-container', {
    init: true,
    slidesPerView: 8,
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
    console.log("USE EFFECT IN HOME COMPONENT");
    dispatch(fetchConfig());
    dispatch(fetchNowPlaying());
    dispatch(fetchPopularMovies());
    dispatch(fetchTopRatedMovies());
  },[dispatch]);
  
  return (
    <div className="home-container">
      <MovieList label="Now Playing" movies={props.nowPlayingMovies} loading={props.nowPlayingError} error={props.nowPlayingLoading}/>
      <MovieList label="Popular" movies={props.popularMovies} loading={props.popularLoading} error={props.popularMoviesError}/>
      <MovieList label="Top Rated" movies={props.topRatedMovies} loading={props.topRatedMoviesLoading} error={props.topRatedMoviesError}/>
    </div>
  )
}
const mapStateToProps = state => ({
  nowPlayingMovies: state.nowPlayingReducer.movies,
  nowPlayingLoading: state.nowPlayingReducer.loading,
  nowPlayingError: state.nowPlayingReducer.error,

  popularMovies: state.popularMoviesReducer.movies,
  popularLoading: state.popularMoviesReducer.loading,
  popularMoviesError: state.popularMoviesReducer.error,

  topRatedMovies: state.topRatedMoviesReducer.movies,
  topRatedMoviesLoading: state.topRatedMoviesReducer.loading,
  topRatedMoviesError: state.topRatedMoviesReducer.error
});

export default connect(mapStateToProps)(Home);
