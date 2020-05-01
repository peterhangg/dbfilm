import React from 'react'
import { connect } from 'react-redux';

import Swiper from 'swiper';
import './header.scss';

const Header = ({movies, loading, error, config}) => {
  const swiper = new Swiper('.header-swiper-container', {
    init: true,
    slidesPerView: 1,
    loop: true,
    spaceBetween: 0,
    observer: true,
    autoplay: {
      delay: 2000
    },
    pagination: {
      el: '.swiper-pagination',
      type:'progressbar'
    }
});

  if (loading) return <p>Loading movies...</p>
  if (error) return <p>Unable to display movies.</p>

  const baseBackdropURL = `${config.images ? config.images.base_url : ''}${config.images ? config.images.backdrop_sizes[2] : ''}`

  return (
    <div className="header-swiper-container">
      <div className="swiper-wrapper">
        {movies.results.map((movie, index) => (
          <div className="swiper-slide">
            <img className="swiper-slide_header"src={`${baseBackdropURL}${movie.backdrop_path}`} alt={movie.title}/>
          </div>
        ))
      }
      </div>
      <div class="swiper-pagination"></div>
    </div>
  )
}

const mapStateToProps = state => ({
  config: state.configReducer.config
});

export default connect(mapStateToProps)(Header);
