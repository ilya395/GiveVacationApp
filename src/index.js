import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './assets/sass/style.scss';

import FirebaseContext from './assets/context/firebaseContext';
import InstanseFirebase from './assets/services/firebase';

ReactDOM.render(
  <FirebaseContext.Provider
    value={InstanseFirebase}
  >
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root')
);