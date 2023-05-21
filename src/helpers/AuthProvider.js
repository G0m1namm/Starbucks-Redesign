import React, { useState, Suspense, lazy } from "react";
import PrivateRouter from "./PrivateRouter";
import { Route, Routes, useNavigate } from "react-router-dom";
// import MainRoutingWrapper from "../components/templates/MainRoutingWrapper/MainRoutinWrapper";
import useAmplifyAuth from "./UseAmplifyAuth";
import Login from "../components/pages/Login/Login";
import Register from "../components/pages/Register/Register";
import Verify from "../components/pages/VerifyRegister/Verify";
import LoaderScreen from "../components/templates/Loader/LoaderScreen";
import Home from "../components/pages/Home/Home";

export const AuthContext = React.createContext();
export const useAuth = () => React.useContext(AuthContext);

const MainRoutingWrapper = lazy(() => import("../components/templates/MainRoutingWrapper/MainRoutinWrapper"));

export default function AuthProvider() {
    const navigate = useNavigate();
    const { state, handleSignout, handleSignIn, handleSignUp, handleConfirmSignUp, handleResendSignUp } = useAmplifyAuth(navigate);
    const [email, setEmail] = useState(null);

    return (
        <AuthContext.Provider value={{ user: state?.user, handleSignout }}>
            <Suspense fallback={<LoaderScreen />}>
                <Routes>
                    <Route element={<MainRoutingWrapper />}>
                        <Route path="/" element={<Home />} />
                    </Route>
                    <Route element={<PrivateRouter />}>
                        <Route exact path="/login" element={<Login handleSignIn={handleSignIn} />} />
                    </Route>
                    <Route element={<PrivateRouter />}>
                        <Route exact path="/register" element={<Register handleSignUp={handleSignUp} setEmail={(e) => setEmail(e)} />} />
                    </Route>
                    <Route element={<PrivateRouter />}>
                        <Route exact path="/verify" element={<Verify handleConfirmSignUp={handleConfirmSignUp} handleResendSignUp={handleResendSignUp} email={email} />} />
                    </Route>
                </Routes>
            </Suspense>
        </AuthContext.Provider>
    );
}