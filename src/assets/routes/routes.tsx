import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout/MainLayout';
import AuthLayout from '../layouts/AuthLayout/AuthLayout';

import { PrivateRoute } from './privateRoute';
import routesConfig from './manageToRoutes';
import ContentWrap from '../components/ContentWrap';
import UserList from '../components/UserList';
import DepartmentList from '../components/DepartmentList';
import DepartmentForm from '../components/DepartmentForm';
import VacationList from '../components/VacationList';
import VacationForm from '../components/VacationForm';
import UserForm from '../components/UserForm';
// import loginContext from '../context/loginContext';
import { rolesConfig } from '../services/constants';

type PropsType = {
    userData: {
        role_id: string | number
        login: string
    }
}

const useRoutes: React.FC<PropsType> = ({ userData }) => {

    // const { login, userData } = props;
    // console.log(props);

    const [roleId, setRoleId] = useState(+rolesConfig.defaultUser);
    useEffect(() => {
        if (userData) {
            setRoleId(+userData.role_id);
        }
    }, [userData]);

    // console.log(roleId, rolesConfig.defaultUser)

    return (
        <Switch>
            <Route 
                path="/auth" 
                render={(props) => {
                    return (
                        <AuthLayout {...props} />
                    );
                }}
            >
            </Route>
            {
                roleId !== rolesConfig.defaultUser
                ? (
                    roleId !== rolesConfig.simpleUser 
                    ? (
                          <>
                              <PrivateRoute 
                                  path={routesConfig.users.url}
                                  component={UserList}
                              />
                              <PrivateRoute 
                                  path={routesConfig.user.url}
                                  component={UserForm}
                              />
                              <PrivateRoute 
                                  path={routesConfig['new-user'].url}
                                  component={UserForm}
                              />
                              <PrivateRoute 
                                  path={routesConfig.departments.url}
                                  component={DepartmentList}
                              />
                              <PrivateRoute 
                                  path={routesConfig.department.url}
                                  component={DepartmentForm}
                              />
                              <PrivateRoute 
                                  path={routesConfig['new-department'].url}
                                  component={DepartmentForm}
                              />
                              <PrivateRoute 
                                  path={routesConfig.vacations.url}
                                  component={VacationList}
                              />
                              <PrivateRoute 
                                  path={routesConfig.vacation.url}
                                  component={VacationForm}
                              />
                              <PrivateRoute 
                                  path={routesConfig['new-vacation'].url}
                                  component={VacationForm}
                              />
                              <PrivateRoute 
                                  path={routesConfig.home.url}
                                  exact
                                  component={ContentWrap}
                              />
                          </>
                    )
                    : (
                        <>
                              <PrivateRoute 
                                  path={routesConfig.vacations.url}
                                  component={VacationList}
                              />
                              <PrivateRoute 
                                  path={routesConfig.vacation.url}
                                  component={VacationForm}
                              />
                              <PrivateRoute 
                                  path={routesConfig['new-vacation'].url}
                                  component={VacationForm}
                              />
                              <PrivateRoute 
                                  path={routesConfig.home.url}
                                  exact
                                  component={ContentWrap}
                              />
                        </>
                    )
                )
                : (
                    <PrivateRoute 
                        path={routesConfig.home.url}
                        exact
                        component={ContentWrap}
                    />
                )
            }
            <Redirect to="/" />
        </Switch>
    );
}

export default useRoutes;

