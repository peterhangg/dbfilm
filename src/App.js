import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Search from './pages/Search/Search';

import './App.scss';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/search-results/:searchInput" exact component={Search} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
