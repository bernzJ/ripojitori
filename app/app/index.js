import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import './assets/montserrat/index.css';
import './assets/app.global.css';
import Router from './components/Router';

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;
render(
  <AppContainer>
    <Router />
  </AppContainer>,
  document.getElementById('root')
);
