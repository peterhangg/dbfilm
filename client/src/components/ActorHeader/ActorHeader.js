import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import BackButton from '../../components/BackButton/BackButton';
import { fetchActorDetails } from '../../actions/getActorDetails';
import ActorPlaceholder from "../../images/actor-placeholder.jpg";

import './actorHeader.scss';

const ActorHeader = ({ actorDetails, loading ,error }) => {
  const { actorID } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchActorDetails(actorID));
  },[dispatch, actorID])

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  return (
    <div className="actor-header-container">
      <div className="actor-header-container_wrapper">
        <div className="actor-header-image-wrapper">
          <img className="actor-header-image-wrapper_image" src={actorDetails.profile_path ? `https://image.tmdb.org/t/p/h632${actorDetails.profile_path}` : ActorPlaceholder } alt="actor-profile"/>
        </div>
        <div className="actor-header-detals-wrapper">
          <div className="actor-header-detals-wrapper_title-wrapper">
            <h1 className="actor-header-detals-wrapper_name">{actorDetails.name}</h1>
            <BackButton />
          </div>
          <h3 className="actor-header-detals-wrapper_label">Biography</h3>
          <p className="actor-header-detals-wrapper_biography">{actorDetails.biography}</p>
          <p className="actor-header-detals-wrapper_gender"><strong>Gender:</strong> {actorDetails.gender === 2 ? "Male" : "Female"}</p>
          <p className="actor-header-detals-wrapper_birthday"><strong>Birthday:</strong> {actorDetails.birthday}</p>
          <p className="actor-header-detals-wrapper_place-of-birth"><strong>Place of Birth:</strong> {actorDetails.place_of_birth}</p>
          <p className="actor-header-detals-wrapper_known-for"><strong>Known for:</strong> {actorDetails.known_for_department}</p>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  actorDetails: state.actorDetailsReducer.actorDetails,
  loading: state.actorDetailsReducer.loading,
  error: state.actorDetailsReducer.error
});

export default connect(mapStateToProps)(ActorHeader);
