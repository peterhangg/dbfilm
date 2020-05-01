import React from 'react';

import "./navbar.scss";

const Navbar = () => {
  return (
    <nav className="navBar">
      <form className="main-nav-search-form">
          <input className="search-input" type="text" placeholder="search..." />
            <button>Search</button>
      </form>
    </nav>
  )
}

export default Navbar;
