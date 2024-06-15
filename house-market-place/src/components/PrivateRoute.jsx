import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStatus } from '../hooks/useAuthStatus'
import Spinner from './Spinner'

function PrivateRoute() {
    const { isLoggedIn, loading } = useAuthStatus();

    if (loading) {
        return <Spinner />;
    }

  return (
    isLoggedIn ? (
        <Outlet />
    ) : (
      <Navigate to="/sign-in" />
    )
  )
}

export default PrivateRoute
