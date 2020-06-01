import React from 'react'
import { connect, useDispatch } from 'react-redux';

import SideMenu from '../SideMenu/SideMenu';
import { fetchMenuToggle } from '../../actions/menuToggle';

import './menuToggleButton.scss';

const MenuToggle = () => {
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(fetchMenuToggle())
  };

  return (
    <>
      <button onClick={handleToggle} className="menu-toggle-button">
        <div className="menu-line"></div>
        <div className="menu-line"></div>
        <div className="menu-line"></div>
      </button>
      <SideMenu />
    </>
  )
};

const mapStateToProps = state => ({
  open: state.menuToggleReducer.open
});

export default connect(mapStateToProps)(MenuToggle);
