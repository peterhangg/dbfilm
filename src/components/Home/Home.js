import React, {useEffect} from 'react'
import { connect, useDispatch } from 'react-redux';

import MovieList from '../MovieList/MovieList';

import { fetchConfig } from '../../actions/getConfig';
import { fetchNowPlaying } from '../../actions/getNowPlaying';
import { fetchPopularMovies } from '../../actions/getPopularMovies';

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
    dispatch(fetchNowPlaying());
    dispatch(fetchConfig());
    dispatch(fetchPopularMovies());
  },[dispatch]);
  
  return (
    <div className="home-container">
      <MovieList label="Now Playing" movies={props.nowPlayingMovies} loading={props.nowPlayingError} error={props.nowPlayingLoading}/>
      <MovieList label="Latest" movies={props.popularMovies} loading={props.popularLoading} error={props.popularMoviesError}/>
    </div>
  )
}
const mapStateToProps = state => ({
  nowPlayingMovies: state.nowPlayingReducer.movies,
  nowPlayingLoading: state.nowPlayingReducer.loading,
  nowPlayingError: state.nowPlayingReducer.error,

  popularMovies: state.popularMoviesReducer.movies,
  popularLoading: state.popularMoviesReducer.loading,
  popularMoviesError: state.popularMoviesReducer.error
});

export default connect(mapStateToProps)(Home);
