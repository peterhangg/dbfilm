import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchActorMovieCredits } from '../../actions/getActorMovieCredits';

import Swiper from 'react-id-swiper';
import 'swiper/swiper.scss'
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.min.css";

import './actorMovieCredits.scss';
import posterPlaceholder from '../../images/poster-placeholder.jpg';


const ActorMovieCredits = ({ actorMovieCredits, loading, error }) => {
  const { actorID } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchActorMovieCredits(actorID));
  }, [dispatch, actorID]);
  
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Movie Credit Error...</p>;

  return (
    <div className="actor-movie-credits-container">
      <ScrollAnimation animateIn="fadeIn" animateOnce={true} duration={2}>
        <h2
        >Known for</h2>
        <Swiper {...params} key={actorMovieCredits.length}>
            {actorMovieCredits.map((movie, index) => (
              <div key={index} className="swiper-slide">
                <Link to={`/movie/${movie.id}`}>
                  <img className="swiper-slide_image" src={movie.poster_path === null ? posterPlaceholder : `http://image.tmdb.org/t/p/w185${movie.poster_path}`}alt={movie.name}/>
                </Link>
                <h4 className="swiper-slide_title">{movie.title}</h4>
                <p className="swiper-slide_score">
                  <img className="swiper-slide_score-icon" src="https://img.icons8.com/offices/14/000000/filled-star.png" alt="Movie Score"/>
                  {movie.vote_average}
                </p>
              </div>
            ))}
        </Swiper>
      </ScrollAnimation>
    </div>
  )
};

const mapStateToProps = state => ({
  actorMovieCredits: state.actorMovieCreditsReducer.actorMovieCredits.cast,
  loading: state.actorMovieCreditsReducer.loading,
  error: state.actorMovieCreditsReducer.error
});

export default connect(mapStateToProps)(ActorMovieCredits);
