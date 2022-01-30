import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
    const LoggedIn = useSelector(state => state.auth.isLoggedIn)
    return (
        LoggedIn && restricted ?
            <Navigate replace to="/home" />
            : Component
    );
};

export default PublicRoute;