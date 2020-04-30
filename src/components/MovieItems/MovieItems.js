import React from 'react'
import './movieItems.scss';
import { connect } from 'react-redux';

const MovieItems = ({movie, config}) => {
  const imagePoster = `${config.images ? config.images.base_url : ''}${config.images ? config.images.poster_sizes[2] : ''}${movie.poster_path}`
  
  return (
    <div className="swiper-slide">
      <h4>{movie.title}</h4>
      <img 
        className="swiper-slide_image" 
        src={movie.poster_path === null ? `http://via.placeholder.com/200x300` : imagePoster}
        alt={movie.title}
      />
      <p>
        <img src="https://img.icons8.com/android/14/000000/star.png" alt="star"/>
        {movie.vote_average}
      </p>
    </div>
  )
}

const mapStateToProps = state => ({
  config: state.configReducer.config
});


export default connect(mapStateToProps)(MovieItems);
