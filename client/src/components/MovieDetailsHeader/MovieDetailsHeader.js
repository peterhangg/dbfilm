import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import { fetchMovieDetails } from '../../actions/getMovieDetails';
import { fetchMovieCredits } from '../../actions/getMovieCredits';
import { addToFavourites } from '../../actions/favouriteActions';
import { deleteFavouriteMovie } from '../../actions/favouriteActions';

import filmPlaceholder from '../../images/film-placeholder.jpg';
import Fav from '../../images/fav.svg';
import unFav from '../../images/un-fav.svg';

import './movieDetailsHeader.scss';

const MovieDetails = ({ favouriteMovies, movieDetails, crew, loading, error, isAuthenticated }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const [favourite, setFavourite] = useState(false);

  // Check whether this movie is favourited by the user previously
  const favMovieStatus = () => {
    const movieIds = favouriteMovies.map(movie => movie.id);
    const currentMovieId = parseInt(id, 10);
    if (movieIds.includes(currentMovieId)) {
      setFavourite(true);
    }
  };

  useEffect(() => {
    dispatch(fetchMovieDetails(id));
    dispatch(fetchMovieCredits(id)); 
    favMovieStatus();
  }, [dispatch, id])

  if (loading) return <p>LOADING MOVIE DETAILS...</p>
  if (error) return <p>ERROR WHEN LOOKING FOR MOVIE DETAILS...</p>

  const handleFavourite = () => {
    if (!isAuthenticated) {
      history.push("/login");
    };
    if (!favourite) {
      // Passing in the entire movieDetail state to add favourite endpoint
      dispatch(addToFavourites(movieDetails));
    } else {
      dispatch(deleteFavouriteMovie(id));
    };
    setFavourite(!favourite);
  };

  const headerStyle = {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url(https://image.tmdb.org/t/p/w1280${movieDetails.backdrop_path})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  };

  const movieYear = movieDetails.release_date.split("-")[0];
  
  const MovieRuntime = minute => {
    return `${Math.floor(minute/60)}h ${minute % 60}m`
  };

  return (
    <div className="movie-header-container" style={headerStyle}>
      <div className="movie-header-poster-wrapper">
        <img className="movie-header-poster-wrapper_image" 
          src={movieDetails.poster_path ? `https://image.tmdb.org/t/p/w300${movieDetails.poster_path}` : filmPlaceholder} alt={movieDetails.title}
        />
        {!favourite ? (
          <button className="movie-header-poster-wrapper_fav-button" onClick={handleFavourite}>
            <img className="movie-header-poster-wrapper_fav-button-icon" src={unFav} alt="like"/> <span className="movie-header-poster-wrapper_fav-button-text">Add To Favourite</span>  
          </button>
          ) : (
          <button className="movie-header-poster-wrapper_fav-button" onClick={handleFavourite}>
            <img className="movie-header-poster-wrapper_fav-button-icon" src={Fav} alt="like"/> <span className="movie-header-poster-wrapper_fav-button-text">Favourited</span>
          </button>
          )
        }
      </div>
      <div className="movie-header-info-wrapper">
      <h2 className="movie-header-info-wrapper_title">{movieDetails.title} <span>({movieYear})</span></h2>
      <div className="movie-header-info-wrapper-details">
        <h3 className="movie-header-info-wrapper-details_tagline">{movieDetails.tagline}</h3>
          <h2>Overview</h2>
          <p className="movie-header-info-wrapper-details_overview">{movieDetails.overview}</p>
          <p className="movie-header-info-wrapper-details_genre"><strong>Genres:</strong> {movieDetails.genres.map(genre =>(
            movieDetails.genres.length === 1 ? genre.name : genre.name + " | "
            ))}
          </p>
          <p className="movie-header-info-wrapper-details_release-date"><strong>Release Date:</strong> {movieDetails.release_date}</p>
          <p className="movie-header-info-wrapper-details_score"><strong>User Score:</strong> {movieDetails.vote_average}</p>
          <p className="movie-header-info-wrapper-details_runtime"><strong>Runtime:</strong> {MovieRuntime(movieDetails.runtime)}</p>
          <ul className="movie-header-info-wrapper-details_crew-list">
          {crew ? crew.filter(person => person.job === "Producer" || person.job === "Screenplay").map(person => (
            <li className="movie-header-info-wrapper-details_crew-profile" key={person.id}>
              <p className="movie-header-info-wrapper-details_crew-profile_person">{person.name}</p>
              <p className="movie-header-info-wrapper-details_crew-profile_job">{person.job}</p>
            </li>
            )) :
            ""}
          </ul>
      </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  movieDetails: state.movieDetailsReducer.movieDetails,
  loading: state.movieDetailsReducer.loading,
  error: state.movieDetailsReducer.error,
  crew: state.movieCreditsReducer.credit.crew,
  isAuthenticated: state.authReducer.isAuthenticated,
  favouriteMovies: state.favouriteMovieReducer.favouriteMovies
});

export default connect(mapStateToProps)(MovieDetails);
