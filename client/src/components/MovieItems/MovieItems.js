import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './movieItems.scss';
import 'swiper/swiper.scss'

const MovieItems = ({movie, config}) => {
  const imagePoster = `${config.images ? config.images.base_url : ''}${config.images ? config.images.poster_sizes[2] : ''}${movie.poster_path}`;

  return (
    <div key={movie.id} className="swiper-slide">
      <Link to={`/movie/${movie.id}`}>
        <img
          className="swiper-slide_image"
          src={movie.poster_path === null ? `http://via.placeholder.com/200x300` : `http://image.tmdb.org/t/p/w185${movie.poster_path}`}
          alt={movie.title}
        />
        <h4 className="swiper-slide_title">{movie.title}</h4>
        <p className="swiper-slide_score">
          <img className="swiper-slide_score-icon" src="https://img.icons8.com/offices/14/000000/filled-star.png" alt="Movie Score"/>
          {movie.vote_average}
        </p>
      </Link>
    </div>
  )
};

const mapStateToProps = state => ({
  config: state.configReducer.config
});


export default connect(mapStateToProps)(MovieItems);
