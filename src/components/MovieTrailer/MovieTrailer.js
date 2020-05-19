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
    slidesPerView: 1,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    containerClass: 'trailer-swiper-container',
  }

  if (loading) return <p>LOADING MOVIE TRAILERS...</p>
  if (error) return <p>ERROR WHEN LOOKING FOR MOVIE TRAIELR :(</p>

  return (
    <section className="movie-trailer-container">
      <h1>TRAILER</h1>
      <Swiper {...params} key={id}>
        {trailers.length > 0 ? trailers.map(trailer => (
          <div key={trailer.id}>
            <iframe
              title={trailer.name}
              width="420"
              height="350"
              src={`https://www.youtube.com/embed/${trailer.key}`}>
            </iframe>
          </div>
        )):
        <p className="swiper-slide_no-trailer">Currently Trailer Available.</p>
      }
      </Swiper>
    </section>
  )
}

const mapPropsToState = state => ({
  trailers: state.movieTrailerReducer.trailer.results,
  loading: state.movieTrailerReducer.loading,
  error: state.movieTrailerReducer.error,
});

export default connect(mapPropsToState)(MovieTrailer);
