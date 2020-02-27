import React from "react";
import { Redirect, Route } from "react-router-dom";

export default function PrivateRouter({ children, user, ...props }) {
    return (
        <Route
            {...props}
            render={({ location }) =>
                user ? (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: location }
                        }}
                    />
                ) : (children)
            }
        />
    )
}