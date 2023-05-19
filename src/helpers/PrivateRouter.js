import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function PrivateRouter() {
    const { user } = useAuth();
    let location = useLocation();
    return !user ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />
}