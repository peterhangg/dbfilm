import React, {useEffect} from 'react'
import { connect, useDispatch } from 'react-redux';

import MovieList from '../../components/MovieList/MovieList';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import Search from '../../components/Search/Search';

import { fetchConfig } from '../../actions/getConfig';
import { fetchNowPlaying } from '../../actions/getNowPlaying';
import { fetchPopularMovies } from '../../actions/getPopularMovies';
import { fetchTopRatedMovies } from '../../actions/getTopRatedMovies';
import { fetchUpcomingMovies } from '../../actions/getUpcomingMovies';

import Swiper from 'swiper';
import 'swiper/css/swiper.min.css';
import './home.scss';


const Home = (props) => {
  const dispatch = useDispatch();

  const swiper = new Swiper('.swiper-container', {
    init: true,
    slidesPerView: 8,
    loop: true,
    spaceBetween: 10,
    observer: true,
    breakpoints: {
      200: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      390: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      580: {
        slidesPerView: 3,
        spaceBetween: 30
      },
      780: {
        slidesPerView: 4,
        spaceBetween: 40
      },
      985: {
        slidesPerView: 5,
        spaceBetween: 40
      },
      1190: {
        slidesPerView: 6,
        spaceBetween: 40
      },
      1395: {
        slidesPerView: 7,
        spaceBetween: 40
      },
      1600: {
        slidesPerView: 8,
        spaceBetween: 40
      },
      1805: {
        slidesPerView: 9,
        spaceBetween: 40
      }
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
});

  useEffect(() => {
    console.log("USE EFFECT IN HOME COMPONENT");
    dispatch(fetchConfig());
    dispatch(fetchNowPlaying());
    dispatch(fetchPopularMovies());
    dispatch(fetchTopRatedMovies());
    dispatch(fetchUpcomingMovies());
  },[dispatch]);

  return (
    <div className="home-container">
      <Navbar />
      <Header movies={props.nowPlayingMovies} loading={props.nowPlayingError} error={props.nowPlayingLoading}/>
      <MovieList label="Now Playing" movies={props.nowPlayingMovies} loading={props.nowPlayingError} error={props.nowPlayingLoading}/>
      <MovieList label="Popular" movies={props.popularMovies} loading={props.popularLoading} error={props.popularMoviesError}/>
      <MovieList label="Top Rated" movies={props.topRatedMovies} loading={props.topRatedMoviesLoading} error={props.topRatedMoviesError}/>
      <MovieList label="Upcoming" movies={props.upcomingMovies} loading={props.upcomingMoviesLoading} error={props.upcomingMoviesError}/>
      <Search />
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
  topRatedMoviesError: state.topRatedMoviesReducer.error,

  upcomingMovies: state.upcomingMoviesReducer.movies,
  upcomingMoviesLoading: state.upcomingMoviesReducer.loading,
  upcomngMoviesError: state.upcomingMoviesReducer.error
});

export default connect(mapStateToProps)(Home);
