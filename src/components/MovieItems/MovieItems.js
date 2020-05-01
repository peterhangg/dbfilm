import React from 'react'
import './movieItems.scss';
import { connect } from 'react-redux';

const MovieItems = ({movie, config}) => {
  const imagePoster = `${config.images ? config.images.base_url : ''}${config.images ? config.images.poster_sizes[2] : ''}${movie.poster_path}`

  return (
    <div className="swiper-slide">
      <h4 className="swiper-slide_title">{movie.title}</h4>
      <img
        className="swiper-slide_image"
        src={movie.poster_path === null ? `http://via.placeholder.com/200x300` : imagePoster}
        alt={movie.title}
      />
      <p className="swiper-slide_score">
        <img className="swiper-slide_score-icon" src="https://img.icons8.com/offices/14/000000/filled-star.png"alt="Movie Score"/>
        {movie.vote_average}
      </p>
    </div>
  )
}

const mapStateToProps = state => ({
  config: state.configReducer.config
});


export default connect(mapStateToProps)(MovieItems);
