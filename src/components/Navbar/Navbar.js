import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { fetchSearchMovies } from '../../actions/getSearchMovies';

import "./navbar.scss";

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
      dispatch(fetchSearchMovies(searchQuery));
    }
  }, [searchQuery, dispatch]);

  return (
    <nav className="navBar">
      <form className="main-nav-search-form" onSubmit={getSearchResult} action={`/search-results/${searchQuery}`}>
        <input className="search-input" value={search} onChange={updateSearch} type="text" placeholder="search..." required />
        <button type="submit">Search</button>
      </form>
    </nav>
  )
}

export default Navbar;
