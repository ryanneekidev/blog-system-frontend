import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState("");
    const [user, setUser] = useState();
    const [regError, setRegError] = useState({});
    const [logError, setLogError] = useState({});
    const navigate = useNavigate();

    const login = async (creds) => {
        try {
            setLogError({});
            const response = await fetch("http://localhost:3000/api/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `username=${creds.username}&password=${creds.password}`
            })
            const res = await response.json();
            if (res.token) {
                setToken(res.token);
                setUser(jwtDecode(res.token))
                navigate("/");
                return;
            }
            navigate("/");
            setLogError(res)
        } catch (err) {
            console.error(err)
        }
    }

    const register = async (creds) => {
        try {
            setRegError({})
            const response = await fetch("http://localhost:3000/api/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `username=${creds.username}&password=${creds.password}&email=${creds.email}`
            })
            const status = response.status;
            const message = await response.json();
            if (status === 400) {
                setRegError(message)
                console.log(message)
            } else {
                navigate('/login')
            }
        } catch (err) {
            console.error(err)
        }
    }

    const logout = () => {
        setToken("");
        navigate('/')
    }

    return (
        <AuthContext.Provider value={{ token, login, register, logout, user, regError, logError }}>{children}</AuthContext.Provider>
    )
}

export default AuthProvider

export const useAuth = () => {
    return useContext(AuthContext)
}