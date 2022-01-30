import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, mobileComponent: MobileComponent, ...rest }) => {
    const LoggedIn = useSelector(state => state.auth.isLoggedIn)
    const width = window.innerWidth;
    return (
        LoggedIn ?
            width <= 1024 && MobileComponent ? MobileComponent : Component
            : <Navigate replace to="/login" />
    );
};

export default PrivateRoute;