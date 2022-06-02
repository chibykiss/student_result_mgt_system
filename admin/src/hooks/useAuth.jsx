import { useContext, useDebugValue } from "react";
import AuthContext from "../auth/AuthProvider";

const useAuth = () => {
    const { auth } = useContext(AuthContext)
    useDebugValue(auth)
    return useContext(AuthContext)
}

export default useAuth