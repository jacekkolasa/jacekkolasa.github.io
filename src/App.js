// @flow
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './Home';
import Growth from './routes/Growth';
import Settings from './routes/Settings';

import './App.css';

const App = () => {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/growth-charts" component={Growth} />
        <Route exact path="/settings" component={Settings} />
        <Route path="/home" component={Home} />
        <Redirect from="/" to="/growth-charts" />
      </Switch>
    </div>
  );
}

export default App;
