import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchMovieCredits } from '../../actions/getMovieCredits';

import './movieCast.scss';

import Swiper from 'react-id-swiper';
import 'swiper/swiper.scss'
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.min.css";

const MovieCast = ({ cast, loading, error }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const params = {
    slidesPerView: 1,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    breakpoints: {
      485: {
        slidesPerView: 2,
      },
      680: {
        slidesPerView: 3,
      },
      930: {
        slidesPerView: 4,
      },
      1220: {
        slidesPerView: 5,
      },
      1465: {
        slidesPerView: 6,
      },
      1710: {
        slidesPerView: 7,
      }
    }
  };

  useEffect(() => {
    dispatch(fetchMovieCredits(id));
  }, [dispatch, id]);

  if (loading) return <p>LOADING CAST...</p>
  if (error) return <p>ERROR WHEN LOOKING FOR MOVIE CAST :(</p>

  return (
    <section className="movie-cast-container">
      <ScrollAnimation animateIn="fadeIn" animateOnce={true} duration={2}>
        <h2>Cast</h2>
        <Swiper {...params} key={cast.length}>
            {cast.map((actor, index) => (
              <div key={index} className="swiper-slide">
                <Link to={`/movie/actor/${actor.id}`}>
                  <img className="swiper-slide_image"src={ actor.profile_path == null ? `http://via.placeholder.com/200x300` : `https://image.tmdb.org/t/p/w185${actor.profile_path}`} alt={actor.name}/>
                </Link>
                <p>{actor.name}</p>
              </div>
            ))}
        </Swiper>
      </ScrollAnimation>
    </section>
  )
};

const mapStateToProps = state => ({
  cast: state.movieCreditsReducer.credit.cast,
  loading: state.movieCreditsReducer.loading,
  error: state.movieCreditsReducer.error
});

export default connect(mapStateToProps)(MovieCast);
