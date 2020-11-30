import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './assets/sass/style.scss';

import FirebaseContext from './assets/context/firebaseContext';
import Firebase from './assets/services/firebase';

ReactDOM.render(
  <FirebaseContext.Provider
    value={new Firebase()}
  >
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root')
);