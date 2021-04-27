import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './assets/sass/style.scss';

import FirebaseContext from './assets/context/firebaseContext';
import InstanseFirebase from './assets/services/firebase';

import { Provider } from 'react-redux';
import store from './assets/store/store';

ReactDOM.render(
  <FirebaseContext.Provider
    value={InstanseFirebase}
  >
    <Provider store={store}>
      <App />
    </Provider>
  </FirebaseContext.Provider>,
  document.getElementById('root')
);