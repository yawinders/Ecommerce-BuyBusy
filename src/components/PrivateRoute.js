import React from 'react'
import { useSelector } from 'react-redux'

import { Navigate } from 'react-router-dom';
import { authSelector } from '../redux/reducers/authReducer';

export default function PrivateRoute({ element }) {
    const { isAuthenticated } = useSelector(authSelector);
    if (!isAuthenticated) {
        return <Navigate to='/login' />;
    }
    return element;
}
