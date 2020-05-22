import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMovieTrailer } from '../../actions/getMovieTrailer';

import './movieTrailer.scss';
import Swiper from 'react-id-swiper';
import 'swiper/swiper.scss'

import noTrailers from '../../images/no-trailers.jpg';

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

  if (loading) return <p>LOADING MOVIE TRAILER...</p>
  if (error) return <p>ERROR WHEN LOOKING FOR MOVIE TRAILER :(</p>

  return (
    <section className="movie-trailer-container">
      <h2>TRAILER</h2>
      {trailers.length > 0 ?
        <Swiper {...params} key={trailers.length}>
          {trailers.map((trailer, index) => (
            <div key={index}>
              <iframe
                title={trailer.name}
                width="420"
                height="350"
                src={`https://www.youtube.com/embed/${trailer.key}`}>
              </iframe>
            </div>
          ))}
        </Swiper>
        :
        <div className="no-movie-trailer-container">
          <div className="no-movie-trailer-container_image-wrapper">
            <img className="no-trailer-container_image" src={noTrailers} alt="notrailer"></img>
          </div>
          <div className="no-movie-trailer-container_text-wrapper">
            <p className="no-movie-trailer-container_text">Currently No Trailers Available.</p>
          </div>
        </div>
      }
    </section>
  )
}

const mapPropsToState = state => ({
  trailers: state.movieTrailerReducer.trailer.results,
  loading: state.movieTrailerReducer.loading,
  error: state.movieTrailerReducer.error,
});

export default connect(mapPropsToState)(MovieTrailer);
