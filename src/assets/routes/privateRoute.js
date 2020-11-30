import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import MainLayout from '../layouts/MainLayout/MainLayout';

export const PrivateRoute = ({component: Component, ...rest}) => (
    <Route 
        {...rest}
        render={props => localStorage.getItem('userId') 
            ? <MainLayout><Component {...props} /></MainLayout>
            : <Redirect to='/auth' />
        }
    />
);