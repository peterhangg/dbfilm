import React, {useEffect} from 'react'
import { connect, useDispatch } from 'react-redux';

import MovieList from '../../components/MovieList/MovieList';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Loader from '../../components/Loader/Loader';

import { store } from '../../store';
import { loadUser } from '../../actions/authActions';
import { fetchConfig } from '../../actions/getConfig';
import { fetchNowPlaying } from '../../actions/getNowPlaying';
import { fetchPopularMovies } from '../../actions/getPopularMovies';
import { fetchTopRatedMovies } from '../../actions/getTopRatedMovies';
import { fetchUpcomingMovies } from '../../actions/getUpcomingMovies';
import { fetchFavouriteMovies } from '../../actions/favouriteActions';

import './home.scss';

const Home = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("USE EFFECT IN HOME COMPONENT");
    store.dispatch(loadUser());
    dispatch(fetchNowPlaying());
    dispatch(fetchConfig());
    dispatch(fetchPopularMovies());
    dispatch(fetchTopRatedMovies());
    dispatch(fetchUpcomingMovies());
    dispatch(fetchFavouriteMovies());
  },[dispatch]);

  return (
    <div className="home-container">
      <Loader />
      <Header movies={props.nowPlayingMovies} loading={props.nowPlayingError} error={props.nowPlayingLoading}/>
      <MovieList label="Now Playing" movies={props.nowPlayingMovies} loading={props.nowPlayingError} error={props.nowPlayingLoading}/>
      <MovieList label="Popular" movies={props.popularMovies} loading={props.popularLoading} error={props.popularMoviesError}/>
      <MovieList label="Top Rated" movies={props.topRatedMovies} loading={props.topRatedMoviesLoading} error={props.topRatedMoviesError}/>
      <MovieList label="Upcoming" movies={props.upcomingMovies} loading={props.upcomingMoviesLoading} error={props.upcomingMoviesError}/>
      <Footer />
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
