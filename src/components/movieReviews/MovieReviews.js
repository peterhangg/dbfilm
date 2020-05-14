import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../actions/getMovieReviews';
import './movieReviews.scss';

const MovieReviews = ({ reviews, loading, error}) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchMovieReviews(id));
  }, [dispatch, id]);

  const shortenedSummary = (string) => {
    const textArr = string.split(" ");
    return textArr.length > 100 ? `${textArr.slice(0, 100).join(" ")}...` : textArr.join(" ");
  }

  if (loading) return <p>LOADING MOVIE REVIEWS...</p>
  if (error) return <p>SORRY, ERROR WHEN FETCHING MOVIE REVIEWS :(</p>

  return (
    <div className="movie-reviews-container">
      <h1>REVIEWS</h1>
      {reviews.length > 0 ? reviews.map(review => (
        <div className="movie-reviews-wrapper" key={review.id}>
          <h3 className="movie-reviews-wrapper_author">Review by {review.author}</h3>
          <p className="movie-reviews-wrapper_content">
            {shortenedSummary(review.content)}
            {review.content.split(" ").length > 100 ? <a className="movie-reviews-wrapper_url" href={review.url} target="_blank" rel="noopener noreferrer">read the rest.</a> : "" }
          </p>
        </div>
      )) :
      <p className="movie-reviews-wrapper_no-reviews">Currently no reviews for this movie.</p>}
    </div>
  )
};

const mapStateToProps = state => ({
  reviews: state.movieReviewsReducer.reviews.results,
  loading: state.movieReviewsReducer.loading,
  error: state.movieReviewsReducer.error
});
export default connect(mapStateToProps)(MovieReviews);
