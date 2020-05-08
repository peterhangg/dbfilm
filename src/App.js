import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Search from './pages/Search/Search';
import MovieInfo from './pages/MovieInfo/MovieInfo';

import './App.scss';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/search-results/:searchInput" exact component={Search} />
          <Route path="/movie/:id" exact component={MovieInfo} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
