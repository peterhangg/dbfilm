import React from 'react'
import { useHistory } from 'react-router-dom';
import backArrow from '../../images/back.svg';

import "./backButton.scss";

const BackButton = () => {
  const history = useHistory();
  return (
    <button className="back-button" type="button" onClick={() => history.goBack()}>
      <img className="back-arrow"src={backArrow} alt="back button"/>
    </button>
  )
};

export default BackButton;
