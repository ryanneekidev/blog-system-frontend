import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

function PrivateRoute() {
    const auth = useAuth();
    if (auth.token === '') {
        return <Navigate to='/login' />
    }
    return <Outlet />
}

export default PrivateRoute