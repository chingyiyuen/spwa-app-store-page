import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import './styles/_main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar as starRegular } from '@fortawesome/free-regular-svg-icons';
import { faStarHalfAlt, faStar as starSolid, faSearch } from '@fortawesome/free-solid-svg-icons';
import { fetchTopFreeApps, fetchTopGrossingApps } from './actions';
import * as serviceWorker from './serviceWorker';

library.add(starRegular, starSolid, faStarHalfAlt, faSearch);

store.dispatch(fetchTopFreeApps());
store.dispatch(fetchTopGrossingApps());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
