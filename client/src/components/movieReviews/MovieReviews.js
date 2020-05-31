import React, { useState, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../actions/getMovieReviews';

import './movieReviews.scss';
import noReviewsImage from '../../images/no-reviews.jpg'

const MovieReviews = ({ reviews, loading, error}) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [allReviews, setAllReviews] = useState(false);

  useEffect(() => {
    setAllReviews(false);
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
      <h1>Reviews</h1>
      {reviews.length > 0 ? 
        <div className="movie-reviews-wrapper" key={reviews[0].id}>
          <h3 className="movie-reviews-wrapper_author">Review by {reviews[0].author}</h3>
          <p className="movie-reviews-wrapper_content">
            {shortenedSummary(reviews[0].content)}
            {reviews[0].content.split(" ").length > 100 ? <a className="movie-reviews-wrapper_url" href={reviews[0].url} target="_blank" rel="noopener noreferrer">read the rest.</a> : ""}
          </p>
        </div>
        :
        <div className="no-movie-review-container">
          <div className="no-movie-review-container_image-wrapper">
            <img className="no-movie-review-container_image" src={noReviewsImage} alt="no reviews"></img>
          </div>
          <div className="no-movie-review-container_text-wrapper">
          <p className="no-movie-review-container_text">Currently No Reviews Available.</p>
          </div>
        </div>
      }
      {allReviews && reviews.length > 1 ? reviews.slice(1).map(review => (
        <div className="movie-reviews-wrapper" key={review.id}>
          <h3 className="movie-reviews-wrapper_author">Review by {review.author}</h3>
          <p className="movie-reviews-wrapper_content">
            {shortenedSummary(review.content)}
            {review.content.split(" ").length > 100 ? <a className="movie-reviews-wrapper_url" href={review.url} target="_blank" rel="noopener noreferrer">read the rest.</a> : ""}
          </p>
        </div>
        ))
        : null
      }
      {reviews.length > 1 && !allReviews ? 
        <div className="movie-review-button-wrapper">
          <button className="movie-review-button-wrapper_button" onClick={() => setAllReviews(!allReviews)}>View All Reviews</button>
        </div> 
        : null
      }
    </div>
  )
};

const mapStateToProps = state => ({
  reviews: state.movieReviewsReducer.reviews.results,
  loading: state.movieReviewsReducer.loading,
  error: state.movieReviewsReducer.error
});
export default connect(mapStateToProps)(MovieReviews);
