import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMovieCredits } from '../../actions/getMovieCredits';

import './movieCast.scss';

import Swiper from 'react-id-swiper';
import 'swiper/swiper.scss'
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.min.css";

const MovieCast = ({cast, loading, error}) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const params = {
    slidesPerView: 8,
    paginationClickable: true,
    spaceBetween: 10,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    breakpoints: {
      200: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      390: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      580: {
        slidesPerView: 3,
        spaceBetween: 30
      },
      780: {
        slidesPerView: 4,
        spaceBetween: 40
      },
      985: {
        slidesPerView: 5,
        spaceBetween: 40
      },
      1190: {
        slidesPerView: 6,
        spaceBetween: 40
      },
      1395: {
        slidesPerView: 7,
        spaceBetween: 40
      },
      1600: {
        slidesPerView: 8,
        spaceBetween: 40
      },
      1805: {
        slidesPerView: 9,
        spaceBetween: 40
      }
    }
  };

  useEffect(() => {
    dispatch(fetchMovieCredits(id));
  }, [dispatch, id]);

  if (loading) return <p>LOADING CAST...</p>
  if (error) return <p>ERROR WHEN LOOKING FOR MOVIE CAST :(</p>

  return (
    <ScrollAnimation animateIn="fadeIn" animateOnce={true} duration={2}>
      <h2>Cast</h2>
      <Swiper {...params} key={cast.length}>
          {cast.map(actor => (
            <div key={actor.cast_id} className="swiper-slide">
              <img className="swiper-slide_image"src={ actor.profile_path == null ? `http://via.placeholder.com/200x300` : `https://image.tmdb.org/t/p/w185${actor.profile_path}`} alt={actor.name}/>
              <p>{actor.name}</p>
            </div>
          ))}
      </Swiper>
    </ScrollAnimation>
  )
}

const mapStateToProps = state => ({
  cast: state.movieCreditsReducer.credit.cast,
  loading: state.movieCreditsReducer.loading,
  error: state.movieCreditsReducer.error
});

export default connect(mapStateToProps)(MovieCast);
