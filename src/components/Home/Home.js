import React, {useEffect} from 'react'
import { fetchNowPlaying } from '../../actions/getMovies';
import { connect, useDispatch } from 'react-redux';
import MovieList from '../MovieList/MovieList';
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
    dispatch(fetchNowPlaying());
  },[dispatch]);
  
  return (
    <div className="home-container">
      <MovieList label="Now Playing" movies={props.movies} error={props.error} loading={props.loading}/>
    </div>
  )
}
const mapStateToProps = state => ({
  movies: state.movieReducer.movies,
  loading: state.movieReducer.loading,
  error: state.movieReducer.error
});

export default connect(mapStateToProps)(Home);
