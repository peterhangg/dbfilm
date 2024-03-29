import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Search from './pages/Search/Search';
import MovieDetails from './pages/MovieDetails/MovieDetails';
import ActorDetails from './pages/ActorDetails/ActorDetails';
import Registration from './pages/Registration/Registration';
import Login  from './pages/Login/Login';
import Favourite from './pages/Favourite/Favourite';

import './App.scss';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/search-results/:searchInput" component={Search} />
          <Route exact path="/movie/:id" component={MovieDetails} />
          <Route exact path ="/movie/actor/:actorID" component={ActorDetails} />
          <Route exact path="/register" component={Registration} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/favourite" component={Favourite} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
