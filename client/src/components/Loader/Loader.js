import React from 'react'
import LoadingGif from '../../images/loader.gif';

import './loader.scss';

const Loader = () => {
  return (
    <div className="loading-container">
        <img className="loading-container_loader" src={LoadingGif} alt="loading"/> :
    </div>
  )
}

export default Loader
