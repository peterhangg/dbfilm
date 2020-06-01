import React from 'react'
import { Link } from 'react-router-dom';
import { connect, useDispatch} from 'react-redux';

import { logout } from '../../actions/authActions';
import { fetchMenuToggle } from '../../actions/menuToggle';

import './sideMenu.scss';

const SideMenu = ({ open, isAuthenticated }) => {
  const dispatch = useDispatch();
  
  const handleLogout = (event) => {
    dispatch(logout());
    dispatch(fetchMenuToggle())
  };

  const handleToggle = () => {
    dispatch(fetchMenuToggle());
  };

  return (
    <div className={open ? "side-nav open": "side-nav"}>
      {!isAuthenticated ? (
        <ul className="side-menu">
          <Link to={"/login"}>
            <li onClick={handleToggle} className="side-menu_links">Login</li>
          </Link>
          <Link to={"/register"}>
            <li onClick={handleToggle} className="side-menu_links">Register</li>
          </Link>
        </ul>
        ) : (
          <ul className="side-menu">
            <Link to={"/favourite"}>
              <li onClick={handleToggle} className="side-menu_links">Favourites</li>
            </Link>
              <li className="side-menu_links" onClick={handleLogout}>Logout</li>
          </ul>
        )}
    </div>
  )
};

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  open: state.menuToggleReducer.open
});

export default connect(mapStateToProps)(SideMenu);
