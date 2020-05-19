import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Loader from '../../components/Loader/Loader';
import './header.scss';

import Swiper from 'react-id-swiper';
import 'swiper/swiper.scss'

const Header = ({ movies, loading, error, config }) => {

  const params = {
    slidesPerView: 1,
    pagination: {
      el: '.swiper-pagination',
      type: 'progressbar'
    },
    autoplay: {
      delay: 5000
    },
    loop: true,
    containerClass: 'header-swiper-container'
  };

  if (loading) return <Loader />;
  if (error) return <p>Unable to display movies.</p>;

  const baseBackdropURL = `${config.images ? config.images.base_url : ''}${config.images ? config.images.backdrop_sizes[2] : ''}`

  return (
    <Swiper {...params}>
      {movies.results.filter(movie => movie.backdrop_path).map(movie => (
        <div key={movie.id} className="swiper-slide">
          <Link to={`movie/${movie.id}`}>
            <img className="swiper-slide_header"src={`${baseBackdropURL}${movie.backdrop_path}`} alt={movie.title}/>
          </Link>
          <div className="header-content">
            <h2 className="header-content_title">{movie.title}</h2>
            <p className="header-content_score">
              <img className="header-content_core-icon" src="https://img.icons8.com/offices/14/000000/filled-star.png" alt="Movie Score"/> {movie.vote_average}
            </p>
          </div>
        </div>
        ))
      }
    </Swiper>
  )
}

const mapStateToProps = state => ({
  config: state.configReducer.config,
  movies: state.nowPlayingReducer.movies,
  loading: state.nowPlayingReducer.loading,
  error: state.nowPlayingReducer.error
});

export default connect(mapStateToProps)(Header);
