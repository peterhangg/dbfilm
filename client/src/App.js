import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './store';

import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Search from './pages/Search/Search';
import MovieDetails from './pages/MovieDetails/MovieDetails';
import ActorDetails from './pages/ActorDetails/ActorDetails';
import Registration from './pages/Registration/Registration';
import Login  from './pages/Login/Login';

import { loadUser } from './actions/authActions';

import './App.scss';

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

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
        </Switch>
      </div>
    </Router>
  );
}

export default App;
