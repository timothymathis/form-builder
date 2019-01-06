import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import App from './containers/App';
import reducer from './reducers';

const store = createStore(
  reducer,
  applyMiddleware(thunk, logger)
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);