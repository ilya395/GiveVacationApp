import React, { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.scss';

import useRoutes from './assets/routes/routes';
import { BrowserRouter as Router } from 'react-router-dom';

import Firebase from './assets/context/firebaseContext';
import Preloader from './assets/components/Preloader/Preloader';
import LoginContext from './assets/context/loginContext';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { FirebaseContextType } from './assets/context/firebaseContext';

type StateProps = {
  allDepartments: Array<{}>
  allVacations: Array<{}>
  allUsers: Array<{}>
  allYears: Array<{}>
}

type PropsType = {
  userDataNewFits: (param: {}) => {
    type: string
    payload: typeof param
  } 
}

const App: React.FC<PropsType> = (props) => {

  // console.log('GLOBAL PARAMS: ', props);
  const { userDataNewFits } =  props;

  const { auth, getUsersRef, getDepartmentsRef, getVacationsRef, getYearsRef } = useContext(Firebase);

  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [thisUserData, setThisUserData] = useState(null);

  const allDepartments = useSelector((state:StateProps) => state.allDepartments);
  const allVacations = useSelector((state:StateProps) => state.allVacations);
  const allUsers = useSelector((state:StateProps) => state.allUsers);
  const allYears = useSelector((state:StateProps) => state.allYears);

  // const [allDepartments, setAllDepartments] = useState([]);
  // const [allVacations, setAllVacations] = useState([]);
  // const [allUsers, setAllUsers] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    getDepartmentsRef()
      .on('value', (res: any) => { // ?
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
        .on('value', (res: any) => { // ?
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
            .on('value', (res: any) => {
              const result = res.val();
              // setAllUsers(result);
              dispatch({
                type: 'ADD_ALL_USERS',
                payload: result,
              });
              const newUser = result.find((item: {login: string}) => item.login === user.email);

              setThisUserData(newUser); 

              userDataNewFits(newUser);     
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
          value={
            {
              login: userEmail, 
              userData: thisUserData, 
              allDepartmentsData: allDepartments, 
              allUsersData: allUsers, 
              allVacationsData: allVacations, 
              allYearsData: allYears
            }
          }
        >
          {routes}
        </LoginContext.Provider>
      </Router> 
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    userDataNewFits: (param) => {
      return {
        type: 'ADD_THIS_USER',
        payload: param
      }
    },
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
