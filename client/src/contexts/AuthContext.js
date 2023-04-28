import { useState, useEffect, createContext } from "react";

export const AuthContext = createContext();

export function AuthProvider(props) {
    const { children } = props;
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        //Ckeck if user is logged in
        // return () => {
        //     // second
        // }
    }, [ /*third */])


    const login = async (acessToken) => {
        console.log("Login context");
        console.log(acessToken);

    };

    const data = {

        accessToken: token,
        user,
        login,
    }

    return <AuthContext.Provider value={data}> {children} </AuthContext.Provider>
}
