import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { fetchMovieDetails } from '../../actions/getMovieDetails';
import { fetchMovieCredits } from '../../actions/getMovieCredits';
import { addToFavourites } from '../../actions/favouriteActions';

import filmPlaceholder from '../../images/film-placeholder.jpg';
import './movieDetailsHeader.scss';

const MovieDetails = ({movieDetails, crew, loading, error, isAuthenticated}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const [favourite, setFavourite] = useState(false);

  const movieData = {
    movieId: movieDetails.id,
    movieTitle: movieDetails.title,
    releaseDate: movieDetails.release_date,
    poster: movieDetails.poster_path ? `https://image.tmdb.org/t/p/w300${movieDetails.poster_path}` : null,
    genres: movieDetails.genres,
    MovieRuntime: movieDetails.runtime,
    score: movieDetails.vote_average
  };

  console.log("THIS IS THE MOVIE DETAILS", movieData);

  useEffect(() => {
    dispatch(fetchMovieDetails(id));
    dispatch(fetchMovieCredits(id));
  }, [dispatch, id])

  if (loading) return <p>LOADING MOVIE DETAILS...</p>
  if (error) return <p>ERROR WHEN LOOKING FOR MOVIE DETAILS :(</p>

  const handleFavourite = () => {
      if (!isAuthenticated) {
        history.push("/login");
      };
      setFavourite(!favourite);
      dispatch(addToFavourites(movieData));
  };

  const headerStyle = {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url(https://image.tmdb.org/t/p/w1280${movieDetails.backdrop_path})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  };

  const year = movieDetails.release_date.split("-")[0];
  const runtime = minute => {
    return `${Math.floor(minute/60)}h ${minute % 60}m`
  };

  return (
    <div className="movie-header-container" style={headerStyle}>
      <div className="movie-header-poster-wrapper">
        <img className="movie-header-poster-wrapper_image" 
          src={movieDetails.poster_path ? `https://image.tmdb.org/t/p/w300${movieDetails.poster_path}` : filmPlaceholder} alt={movieDetails.title}
        />
        <button className="movie-header-poster-wrapper_fav-button" onClick={handleFavourite}>
          {!favourite ? "Add To Favourite" : "favourited" }
        </button>
      </div>
      <div className="movie-header-info-wrapper">
      <h2 className="movie-header-info-wrapper_title">{movieDetails.title} <span>({year})</span></h2>
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
          <p className="movie-header-info-wrapper-details_runtime"><strong>Runtime:</strong> {runtime(movieDetails.runtime)}</p>
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
  isAuthenticated: state.authReducer.isAuthenticated
});

export default connect(mapStateToProps)(MovieDetails);
