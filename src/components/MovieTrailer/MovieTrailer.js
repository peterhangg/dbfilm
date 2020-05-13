import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMovieTrailer } from '../../actions/getMovieTrailer';

import './movieTrailer.scss';
import Swiper from 'react-id-swiper';
import 'swiper/swiper.scss'

const MovieTrailer = ({trailers, loading, error}) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovieTrailer(id));
  }, [dispatch, id]);

  const params = {
    slidesPerView: 3,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    containerClass: 'trailer-swiper-container',
    breakpoints: {
      1435: {
        slidesPerView: 3
      },
      990: {
        slidesPerView: 2
      },
      200: {
        slidesPerView: 1
      }
    },
  }

  if (loading) return <p>LOADING MOVIE TRAILERS...</p>
  if (error) return <p>ERROR WHEN LOOKING FOR MOVIE TRAIELR :(</p>

  return (
    <div className="movie-trailer-container">
      <h1>TRAILER</h1>
      <Swiper {...params}>
        {trailers.map(trailer => (
          <div key={trailer.id}>
            <iframe
              title={trailer.name}
              width="420"
              height="315"
              src={`https://www.youtube.com/embed/${trailer.key}`}>
            </iframe>
          </div>
        ))}
      </Swiper>
    </div>
  )
}

const mapPropsToState = state => ({
  trailers: state.movieTrailerReducer.trailer.results,
  loading: state.movieTrailerReducer.loading,
  error: state.movieTrailerReducer.error,
});

export default connect(mapPropsToState)(MovieTrailer);
