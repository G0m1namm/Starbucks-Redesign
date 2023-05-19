import React from "react";
import { Navigate, Route } from "react-router-dom";

export default function PrivateRouter({ children, user, ...props }) {
    return (
        <Route
            {...props}
            render={({ location }) =>
                user ? (
                    <Navigate
                        to="/"
                        state={{ from: location }}
                    />
                ) : (children)
            }
        />
    )
}