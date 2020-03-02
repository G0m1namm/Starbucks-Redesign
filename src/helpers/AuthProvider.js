import React, { useState, Suspense, lazy } from "react";
import PrivateRouter from "./PrivateRouter";
import { Route, Switch, useHistory } from "react-router-dom";
// import MainRoutingWrapper from "../components/templates/MainRoutingWrapper/MainRoutinWrapper";
import useAmplifyAuth from "./UseAmplifyAuth";
import Login from "../components/pages/Login/Login";
import Register from "../components/pages/Register/Register";
import Verify from "../components/pages/VerifyRegister/Verify";
import LoaderScreen from "../components/templates/Loader/LoaderScreen";

export const AuthContext = React.createContext();
export const FormDataContext = React.createContext();
const MainRoutingWrapper = lazy(() => import("../components/templates/MainRoutingWrapper/MainRoutinWrapper"));

export default function AuthProvider() {
    let history = useHistory();
    const { state: { user }, handleSignout, handleSignIn, handleSignUp, handleConfirmSignUp, handleResendSignUp } = useAmplifyAuth(history);
    const [email, setEmail] = useState(null);

    return (
        <AuthContext.Provider value={{ user, handleSignout }}>
            <Suspense fallback={<LoaderScreen />}>
                <Switch>
                    <Route exact path={["/", "/home"]}>
                        <MainRoutingWrapper />
                    </Route>
                    <FormDataContext.Provider>
                        <PrivateRouter path="/login" user={user}>
                            <Login handleSignIn={handleSignIn} />
                        </PrivateRouter>
                        <PrivateRouter path="/register" user={user} >
                            <Register handleSignUp={handleSignUp} setEmail={(e) => setEmail(e)} />
                        </PrivateRouter>
                        <PrivateRouter path="/verify" user={user}>
                            <Verify handleConfirmSignUp={handleConfirmSignUp} handleResendSignUp={handleResendSignUp} email={email} />
                        </PrivateRouter>
                    </FormDataContext.Provider>
                </Switch>
            </Suspense>
        </AuthContext.Provider>
    );
}