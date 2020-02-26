import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import PrivateRouter from "./PrivateRouter";
import { Login, Demo } from "../components/pages/Login/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainRoutingWrapper from "../components/templates/MainRoutingWrapper/MainRoutinWrapper";

export const AuthContext = React.createContext();
export const FormDataContext = React.createContext();

export default function AuthProvider() {
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({})

    useEffect(() => {
        Auth.currentAuthenticatedUser({ bypassCache: true })
            .then(
                data => {
                    const currentUser = { username: data.username, ...data.attributes };
                    if (currentUser.email_verified) setUser({ currentUser, status: "welcome" });
                }
            )
            .catch(err => console.log(err));
    }, []);

    const handleFormSubmit = (data) => {
        setFormData(data);
    }

    useEffect(() => {
        console.table(formData);
    }, [formData]);

    return (
        <AuthContext.Provider value={user}>
            <Router>
                <Switch>
                    <FormDataContext.Provider value={handleFormSubmit}>
                        <PrivateRouter path="/login">
                            {/* <Login /> */}
                            <Demo />
                        </PrivateRouter>
                    </FormDataContext.Provider>
                    <Route path="*" component={MainRoutingWrapper} />
                </Switch>
            </Router>
        </AuthContext.Provider>
    );
}