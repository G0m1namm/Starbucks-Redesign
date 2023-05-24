import React, { useState, Suspense, lazy } from "react";
import PrivateRouter from "./PrivateRouter";
import { Route, Routes, useNavigate } from "react-router-dom";
import useAmplifyAuth from "./UseAmplifyAuth";
import LoaderScreen from "../components/templates/Loader/LoaderScreen";
import Home from "../components/pages/Home/Home";

export const AuthContext = React.createContext();
export const useAuth = () => React.useContext(AuthContext);

const MainRoutingWrapper = lazy(() => import("../components/templates/MainRoutingWrapper/MainRoutinWrapper"));
const Login = lazy(() => import("../components/pages/Login/Login"));
const Register = lazy(() => import("../components/pages/Register/Register"));
const Verify = lazy(() => import("../components/pages/VerifyRegister/Verify"));

export default function AuthProvider() {
    const navigate = useNavigate();
    const { state, handleSignout, handleSignIn, handleSignUp, handleConfirmSignUp, handleResendSignUp } = useAmplifyAuth(navigate);
    const [email, setEmail] = useState(null);

    return (
        <Suspense fallback={<LoaderScreen />}>
            <AuthContext.Provider value={{ user: state?.user, handleSignout }}>
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
                    <Route exact path="/verify" element={<Verify handleConfirmSignUp={handleConfirmSignUp} handleResendSignUp={handleResendSignUp} email={email} />} />
                    {/* <Route element={<PrivateRouter />}>
                        <Route exact path="/verify" element={<Verify handleConfirmSignUp={handleConfirmSignUp} handleResendSignUp={handleResendSignUp} email={email} />} />
                    </Route> */}
                </Routes>
            </AuthContext.Provider>
        </Suspense>
    );
}