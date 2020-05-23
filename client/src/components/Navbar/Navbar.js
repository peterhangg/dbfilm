import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';

import { fetchSearchMovies } from '../../actions/getSearchMovies';

import "./navbar.scss";
import Logo from '../../images/movie-icon.svg';

const Navbar = () => {
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
    </nav>
  )
}

export default Navbar;
