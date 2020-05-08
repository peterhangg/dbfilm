import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './header.scss';

import Swiper from 'react-id-swiper';
import 'swiper/swiper.scss'

const Header = ({movies, loading, error, config}) => {

  const params = {
    pagination: {
      el: '.swiper-pagination',
      type: 'progressbar'
    },
    slidesPerView: 1,
    paginationClickable: true,
    spaceBetween: 0,
    autoplay: {
      delay: 2000
    },
    loop: true,
    containerClass: 'header-swiper-container'
  };

  if (loading) return <p>Loading movies...</p>
  if (error) return <p>Unable to display movies.</p>

  const baseBackdropURL = `${config.images ? config.images.base_url : ''}${config.images ? config.images.backdrop_sizes[2] : ''}`

  return (
    <Swiper {...params}>
      {movies.results.filter(movie => movie.backdrop_path).map(movie => (
        <div key={movie.id} className="swiper-slide">
          <Link to={`movie/${movie.id}`}>
            <img className="swiper-slide_header"src={`${baseBackdropURL}${movie.backdrop_path}`} alt={movie.title}/>
          </Link>
        </div>
        ))
      }
    </Swiper>
  )
}

const mapStateToProps = state => ({
  config: state.configReducer.config
});

export default connect(mapStateToProps)(Header);
