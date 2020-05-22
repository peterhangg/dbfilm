import React from 'react'
import MovieItems from '../MovieItems/MovieItems';

import './movieList.scss';
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.min.css";

import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css'

const MovieList = ({label, loading, errors, movies}) => {

  const params = {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    slidesPerView: 1,
    breakpoints: {
      385: {
        slidesPerView: 2,
      },
      585: {
        slidesPerView: 3,
      },
      785: {
        slidesPerView: 4,
      },
      925: {
        slidesPerView: 5,
      },
      1125: {
        slidesPerView: 6,
      },
      1295: {
        slidesPerView: 7,
      },
      1485: {
        slidesPerView: 8,
      },
    }
  };

  if (loading) return <p>Loading movies...</p>
  if (errors) return <p>Unable to display movies.</p>

  return (
    <section className="movie-list-container">
      <ScrollAnimation animateIn="fadeIn" animateOnce={true} duration={2}>
        <h2 className="swiper-container_label">{label}</h2>
        <Swiper key={movies.length} {...params}>
          {movies.results ? movies.results.filter(movie => movie.poster_path).map((movie, index)=> (
            <MovieItems key={index} movie={movie} />
          )) : ""}
        </Swiper>
      </ScrollAnimation>
    </section>
  )
}

export default MovieList;
