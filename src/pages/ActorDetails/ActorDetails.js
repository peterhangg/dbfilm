import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';

import ActorHeader from '../../components/ActorHeader/ActorHeader';
import ActorMovieCredits from '../../components/ActorMovieCredits/ActorMovieCredits';

import './actorDetails.scss';

const ActorDetails = () => {
  const { id } = useParams();

  useEffect(() => {
    // Scroll to top of page when render
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="actor-details-container">
      <ActorHeader />
      <ActorMovieCredits />
    </div>
  )
}

export default ActorDetails;
