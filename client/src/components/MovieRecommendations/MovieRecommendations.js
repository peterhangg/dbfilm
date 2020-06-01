import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchMovieRecommendations } from '../../actions/getMovieRecommendations';

import './movieRecommendations.scss';
import posterPlaceholder from '../../images/poster-placeholder.jpg';
import noRecomendation from '../../images/no-recommendation.png';

import Swiper from 'react-id-swiper';
import 'swiper/swiper.scss'

const MovieRecommendations = ({ movieRecommendations, loading, error }) => {
  const dispatch = useDispatch();
  const { id } = useParams();

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
      735: {
        slidesPerView: 3,
      },
      975: {
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
    dispatch(fetchMovieRecommendations(id));
  }, [dispatch, id]);

  if (loading) return <p>LOADING MOVIE RECOMMENDATIONS...</p>
  if (error) return <p>ERROR WHEN FETCHING MOVIE RECOMMENDATIONS</p>

  return (
    <section className="movie-recommendations-container">
      <h1>Recommendations</h1>
      {movieRecommendations.lenth > 0 ? (
        <Swiper {...params} key={movieRecommendations.length}>
          {movieRecommendations.map((recommendation, index) => (
            <div key={index}>
              <Link to={`/movie/${recommendation.id}`}>
                <img
                  className="swiper-slide_image"
                  src={recommendation.poster_path === null ? posterPlaceholder : `http://image.tmdb.org/t/p/w185${recommendation.poster_path}`}
                  alt={recommendation.title}
                />
              <h4 className="swiper-slide_title">{recommendation.title}</h4>
              </Link>
              <p className="swiper-slide_score">
                <img className="swiper-slide_score-icon" src="https://img.icons8.com/offices/14/000000/filled-star.png" alt="Movie Score"/>
                {recommendation.vote_average}
              </p>
            </div>
          ))}
        </Swiper>
      ) : (
      <div className="no-movie-recommendation-container">
        <div className="no-movie-recommendation-container_image-wrapper">
          <img className="no-recommendation-container_image" src={noRecomendation} alt="no-recommendation"></img>
        </div>
        <div className="no-movie-recommendation-container_text-wrapper">
          <p className="no-movie-recommendation-container_text">No recommendations available.</p>
        </div>
      </div>
      )
    }
    </section>
  )
}

const mapStateToProps = state => ({
  movieRecommendations: state.movieRecommendationsReducer.movieRecommendations.results,
  loading: state.movieRecommendationsReducer.loading,
  error: state.movieRecommendationsReducer.error
});

export default connect(mapStateToProps)(MovieRecommendations);
