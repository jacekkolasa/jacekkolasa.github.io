// @flow
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './Home';
import Growth from './routes/Growth';
import Settings from './routes/Settings';

import './App.css';

const App = () => {
  // todo add bootstrap stylesheet to the bundle
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/growth-charts" component={Growth} />
        <Route exact path="/settings" component={Settings} />
        <Route path="/home" component={Home} />
        <Redirect from="/" to="/growth-charts" />
      </Switch>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossOrigin="anonymous"
      />
    </div>
  );
}

export default App;
