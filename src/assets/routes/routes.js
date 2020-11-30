import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout/MainLayout';
import AuthLayout from '../layouts/AuthLayout/AuthLayout';

import { PrivateRoute } from './privateRoute';
import ContentWrap from '../components/ContentWrap';
import Management from '../components/Management';

const useRoutes = (isAuthenticated) => {

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
            <PrivateRoute 
                path="/manage"
                exact
                component={Management}
            />
            <PrivateRoute 
                path="/"
                exact
                component={ContentWrap}
            />
            <Redirect to="/" />
        </Switch>
    );
}

export default useRoutes;

