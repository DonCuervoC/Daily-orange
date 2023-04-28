import { useState, useEffect, createContext } from "react";
import { User } from "../api";

const userController = new User();

export const AuthContext = createContext();

export function AuthProvider(props) {
    const { children } = props;
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {

    }, []);

    const login = async (accessToken) => {

        try {
            //console.log("TOKEN : ", accessToken);
            const response = await userController.getMe(accessToken);
            delete response.password;
            console.log(response);
            // setUser(response);
            // setToken(accessToken);
        } catch (error) {
            console.error(error);
        }
    };

    const data = {
        accessToken: token,
        user,
        login,
    };

    return <AuthContext.Provider value={data}> {children} </AuthContext.Provider>
}
