import React, { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.scss';

import useRoutes from './assets/routes/routes';
import { BrowserRouter as Router } from 'react-router-dom';

import Firebase from './assets/context/firebaseContext';
import Preloader from './assets/components/Preloader/Preloader';
import LoginContext from './assets/context/loginContext';

function App() {

  const { auth, getUsersRef, getDepartmentsRef, getVacationsRef, getYearsRef } = useContext(Firebase);

  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [thisUserData, setThisUserData] = useState(null);

  const allDepartments = useSelector(state => state.allDepartments);
  const allVacations = useSelector(state => state.allVacations);
  const allUsers = useSelector(state => state.allUsers);
  const allYears = useSelector(state => state.allYears);

  // const [allDepartments, setAllDepartments] = useState([]);
  // const [allVacations, setAllVacations] = useState([]);
  // const [allUsers, setAllUsers] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    getDepartmentsRef()
      .on('value', res => {
        dispatch({
          type: 'ADD_ALL_DEPARTMENTS',
          payload: res.val(),
        });
        // setAllDepartments(res.val())
      })
  }, []);

  useEffect(() => {
    try {
      getVacationsRef()
        .on('value', res => {
          dispatch({
            type: 'ADD_ALL_VACATIONS',
            payload: res.val(),
          });
          // setAllVacations( res.val() );
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

          getUsersRef()
            .on('value', res => {
              const result = res.val();
              // setAllUsers(result);
              dispatch({
                type: 'ADD_ALL_USERS',
                payload: result,
              });
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

  useEffect(() => {
    getYearsRef()
      .once('value')
      .then(response => response.val())
      .then(res => dispatch({ type: 'ADD_ALL_YEARS', payload: res }))
      .catch(e => console.log(e))
      .finally(() => console.log('сходили за годами'));
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
          value={{login: userEmail, userData: thisUserData, allDepartmentsData: allDepartments, allUsersData: allUsers, allVacationsData: allVacations, allYearsData: allYears}}
        >
          {routes}
        </LoginContext.Provider>
      </Router> 
    </>
  );
}

export default App;
