import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';

import { fetchSearchMovies } from '../../actions/getSearchMovies';
import { logout } from '../../actions/authActions';

import MenuToggleButton from '../MenuToggleButton/MenuToggleButton';

import "./navbar.scss";
import Logo from '../../images/movie-icon.svg';
import Profile from '../../images/profile.svg';

const Navbar = ({ isAuthenticated }) => {
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const updateSearch = event => {
    setSearch(event.target.value);
    console.log("updaing search query");
  };

  const getSearchResult = event => {
    event.preventDefault();
    setSearchQuery(search);
    history.push(`/search-results/${search}`);
    setSearch("");
  };

  const handleLogout = (event) => {
    dispatch(logout());
  };

  useEffect(() => {
    console.log("SEARCHING MOVIE");
    if (searchQuery) {
      // default fetch search movie data to page 1
      dispatch(fetchSearchMovies(searchQuery, 1));
    }
  }, [searchQuery, dispatch]);

  return (
    <nav className="navbar">
      <div className="navbar_icon-wrapper">
        <Link to={"/"}>
          <img className="navbar_logo" src={Logo} alt="movie-icon"/>
        </Link>
      </div>
      <div className="navbar_form-wrapper">
        <form className="form" onSubmit={getSearchResult}>
          <input className="form_search-input" value={search} onChange={updateSearch} type="text" placeholder="Find a movie..." required />
          <button className="form_search-button" type="submit">Search</button>
        </form>
      </div>
        {!isAuthenticated ? (
        <ul className="navbar_links">
          <Link to={"/login"}>
            <li className="navbar_links_button">Login</li>
          </Link>
          <Link to={"/register"}>
            <li className="navbar_links_button">Register</li>
          </Link>
        </ul>
        ) : (
          <ul className="navbar_links">
            <Link to={"/favourite"}>
              <li className="navbar_links_button">
                <img className="navbar_profile" src={Profile} alt="profile"/>
              </li>
            </Link>
              <li className="navbar_links_button" onClick={handleLogout}>Logout</li>
          </ul>
        )}
        <MenuToggleButton />
    </nav>
  )
};

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated
});

export default connect(mapStateToProps)(Navbar);
