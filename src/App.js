import React, { useContext, useEffect, useState } from 'react';
import './App.scss';

import useRoutes from './assets/routes/routes';
import { BrowserRouter as Router } from 'react-router-dom';

import Firebase from './assets/context/firebaseContext';
import Preloader from './assets/components/Preloader/Preloader';
import LoginContext from './assets/context/loginContext';

function App() {

  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(false);
  const { auth } = useContext(Firebase);
  const [userEmail, setUserEmail] = useState('');
  const [thisUserData, setThisUserData] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem('userId')) {

      console.log(
        'we don`t know who are you!'
      );

      setUserId(false);

      setLoading(false);

    } else {

      console.log(
        'we know who are you!', 
      );

      auth.onAuthStateChanged(user => {

        setLoading(false);

        if (user) {
          setUserId(user.uid);
          localStorage.setItem('userId', JSON.stringify(user.uid));
          setUserEmail(user.email);
          // console.log(localStorage.getItem('userId'));
        } else {
          setUserId(false);
          localStorage.removeItem('userId');
        }

      });
    }
    
  }, [userId, auth, userEmail]); 
  
  const routes = useRoutes(userId);

  if (loading) {
    return (
      <Preloader />
    );
  }

  return (
    <>
      <Router>
        <LoginContext.Provider
          value={{login: userEmail}}
        >
          {routes}
        </LoginContext.Provider>
      </Router> 
    </>
  );
}

export default App;
