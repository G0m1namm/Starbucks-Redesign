import React, { useState, useContext } from "react";
import { Auth } from "aws-amplify";

export const AuthContext = React.createContext(null);

export default function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const AuthContextUser = useContext(AuthContext);

    return(<AuthContextUser.Provider>{children}</AuthContextUser.Provider>);
}