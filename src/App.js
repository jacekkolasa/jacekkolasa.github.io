// @flow
import React, { Suspense } from 'react';
import { Root, Routes } from 'react-static';
import {
  Redirect, Route, Switch,
} from 'react-router-dom';
import { SettingsProvider } from 'routes/Settings/SettingsContext';

import 'utils/reset.css';

import Navbar from 'components/Navbar';
import Growth from 'routes/Growth';
import Settings from 'routes/Settings';
import NotFound from 'routes/NotFound';

import './App.css';

// todo add bootstrap stylesheet to the bundle
const App = () => (
  <Root>
    <SettingsProvider>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/growth-charts" component={Growth} />
          <Route exact path="/settings" component={Settings} />
          <Redirect exact from="/" to="/growth-charts" />
          <Route component={NotFound} />
          <Route component={() => <Routes />} />
        </Switch>
      </Suspense>
    </SettingsProvider>
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
      integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
      crossOrigin="anonymous"
    />
  </Root>
);

export default App;
