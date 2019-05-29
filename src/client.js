// @flow
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { hydrate } from 'react-dom';

import App from './App';

const root = document.getElementById('root');
if (root) {
  hydrate(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    root
  );
}


if (module.hot) {
  module.hot.accept();
}
