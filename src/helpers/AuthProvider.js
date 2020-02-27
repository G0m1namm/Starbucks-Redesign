import React from "react";
import PrivateRouter from "./PrivateRouter";
import { Login } from "../components/pages/Login/Login";
import { Route, Switch, useHistory } from "react-router-dom";
import MainRoutingWrapper from "../components/templates/MainRoutingWrapper/MainRoutinWrapper";
import useAmplifyAuth from "./UseAmplifyAuth";

export const AuthContext = React.createContext();
export const FormDataContext = React.createContext();

export default function AuthProvider() {
    let history = useHistory();
    const {state: {user}, handleSignout, handleSignIn} = useAmplifyAuth(history);

    return (
        <AuthContext.Provider value={{ user, handleSignout }}>
                <Switch>
                    <Route exact path={["/", "/home"]}>
                        <MainRoutingWrapper />
                    </Route>
                    <FormDataContext.Provider>
                        <PrivateRouter path="/login" user={user}>
                            <Login handleSignIn={handleSignIn}/>
                        </PrivateRouter>
                    </FormDataContext.Provider>
                </Switch>
        </AuthContext.Provider>
    );
}