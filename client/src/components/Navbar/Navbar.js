import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';

import { fetchSearchMovies } from '../../actions/getSearchMovies';
import { logout } from '../../actions/authActions';

import "./navbar.scss";
import Logo from '../../images/movie-icon.svg';

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
      <Link className="navbar_icon" to={"/"}>
        <img className="navbar_logo" src={Logo} alt="movie-icon"/>
      </Link>
      <form className="navbar_form" onSubmit={getSearchResult}>
        <input className="navbar_search-input" value={search} onChange={updateSearch} type="text" placeholder="Search for a movie..." required />
        <button className="navbar_search-button" type="submit">Search</button>
      </form>
      <div>
        {!isAuthenticated ? (
        <>
          <Link to={"/login"}>
            <button>Login</button>
          </Link>
          <Link to={"/register"}>
            <button>Register</button>
          </Link>
        </>
        ) : (
          <button onClick={handleLogout}>logout</button>
        )}
      </div>
    </nav>
  )
};

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated
});

export default connect(mapStateToProps)(Navbar);
