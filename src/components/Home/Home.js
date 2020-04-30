import React, {useEffect} from 'react'
import { fetchNowPlaying } from '../../actions/getNowPlaying';
import { connect, useDispatch } from 'react-redux';
import MovieList from '../MovieList/MovieList';
import Swiper from 'swiper';
import { fetchConfig } from '../../actions/getConfig';

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
  },[dispatch]);
  
  return (
    <div className="home-container">
      <MovieList label="Now Playing" movies={props.nowPlayingMovies} error={props.nowPlayingLoading} loading={props.nowPlayingError}/>
    </div>
  )
}
const mapStateToProps = state => ({
  nowPlayingMovies: state.nowPlayingReducer.movies,
  nowPlayingLoading: state.nowPlayingReducer.loading,
  nowPlayingError: state.nowPlayingReducer.error
});

export default connect(mapStateToProps)(Home);
