import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';
import MainLayout from '../layouts/MainLayout/MainLayout';

type PropsType = {
    component: React.ReactNode | (new() => React.Component<any, any>) | typeof React.Component // React.ElementType | React.Component | React.ReactNode | React.ReactChild
    path?: string
    exact?: any
    // rest: any
}

export const PrivateRoute: React.FC<PropsType> = ({component: Component, ...rest}) => (
    <Route 
        {...rest}
        render={(props) => localStorage.getItem('userId') 
            ? <MainLayout><Component {...props} /></MainLayout>
            : <Redirect to='/auth' />
        }
    />
);