import { useState, useEffect, createContext } from "react";
import { Auth, User } from "../api";

const userController = new User();
const authController = new Auth();

export const AuthContext = createContext();

export function AuthProvider(props) {
    const { children } = props;
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        (async () => {

            
            const accessToken = authController.getAccessToken();
            const refreshToken = authController.getRefreshToken();
            // console.log("refreshToken : ",accessToken);
            // console.log("refreshToken : ",refreshToken);
            await login(accessToken);

            setLoading(false);


        })();



    }, []);

    const login = async (accessToken) => {

        try {
            //console.log("TOKEN : ", accessToken);
            const response = await userController.getMe(accessToken);
            delete response.password;
            //console.log(response);
            setUser(response);
            setToken(accessToken);
        } catch (error) {
            console.error(error);
        }
    };

    const data = {
        accessToken: token,
        user,
        login,
    };

    if (loading) return null;

    return <AuthContext.Provider value={data}> {children} </AuthContext.Provider>
}
