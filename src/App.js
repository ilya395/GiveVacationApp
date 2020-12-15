import React, { useContext, useEffect, useState } from 'react';
import './App.scss';

import useRoutes from './assets/routes/routes';
import { BrowserRouter as Router } from 'react-router-dom';

import Firebase from './assets/context/firebaseContext';
import Preloader from './assets/components/Preloader/Preloader';
import LoginContext from './assets/context/loginContext';

function App() {

  const { auth, getUsersRef, getDepartmentsRef, getVacationsRef } = useContext(Firebase);

  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [thisUserData, setThisUserData] = useState(null);

  const [allDepartments, setAllDepartments] = useState([]);
  const [allVacations, setAllVacations] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    // getDepartmentsRef()
    //   .once('value')
    //   .then(response => response.val())
    //   .then(res => setAllDepartments(res))
    //   .catch(e => console.log(e))
    //   .finally(() => console.log('сходили за отделами'));

    getDepartmentsRef()
      .on('value', res => {
        setAllDepartments(res.val())
      })
  }, []);

  useEffect(() => {
    // getVacationsRef()
    //   .once('value')
    //   .then(response => response.val())
    //   .then(res => setAllVacations(res))
    // .catch(e => console.log(e))
    // .finally(() => console.log('сходили за отпусками'));

    try {
      getVacationsRef()
        .on('value', res => {
          setAllVacations( res.val() );
        });
    } catch (error) {
      console.log(error);
    }

  }, []);

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

          // getUsersRef()
          //   .once('value')
          //   .then(response => response.val())
          //   .then(res => {
          //     setAllUsers(res);
          //     const newUser = res.find(item => item.login === user.email);
          //     setThisUserData(newUser);
          //   })
          //   .catch(e => console.log(e))
          //   .finally(() => console.log('сходили за юзерами'));

          getUsersRef()
            .on('value', res => {
              const result = res.val();
              setAllUsers(result);
              const newUser = result.find(item => item.login === user.email);
              setThisUserData(newUser);              
            })

        } else {
          setUserId(false);
          localStorage.removeItem('userId');
        }

      });
    }
    
  }, []); 
  
  const routes = useRoutes({login: userEmail, userData: thisUserData});

  if (loading) {
    return (
      <Preloader />
    );
  }

  return (
    <>
      <Router>
        <LoginContext.Provider
          value={{login: userEmail, userData: thisUserData, allDepartmentsData: allDepartments, allUsersData: allUsers, allVacationsData: allVacations}}
        >
          {routes}
        </LoginContext.Provider>
      </Router> 
    </>
  );
}

export default App;
