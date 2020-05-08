import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMovieCredits } from '../../actions/getMovieCredits';

import './movieCast.scss';

import Swiper from 'swiper';

const MovieCast = ({cast, loading, error}) => {
  const { id } = useParams();
  const dispatch = useDispatch();

const swiper = new Swiper('.swiper-container', {
  init: true,
  slidesPerView: 1,
  spaceBetween: 0,
  observer: true,
  autoplay: {
    delay: 2000
  }
});

  useEffect(() => {
    dispatch(fetchMovieCredits(id));
  }, [dispatch, id]);

  if (loading) return <p>LOADING CAST...</p>
  if (error) return <p>UNABLE TO FIND CAST.</p>

  return (
    <div className="swiper-container">
      <h2 className="swiper-container_cast">Cast</h2>
      <div className="swiper-wrapper">
        {cast.map(actor => (
          <div key={actor.cast_id} className="swiper-slide">
            <img src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`} alt={actor.name}/>
            <p>{actor.name}</p>
          </div>
        ))}
      </div>
      <div className="swiper-button-prev"></div>
      <div className="swiper-button-next"></div>
    </div>
  )
}

const mapStateToProps = state => ({
  cast: state.movieCreditsReducer.credit.cast,
  loading: state.movieCreditsReducer.loading,
  error: state.movieCreditsReducer.error
});

export default connect(mapStateToProps)(MovieCast);
