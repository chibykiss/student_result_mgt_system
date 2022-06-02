import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshtoken from "../../hooks/useRefreshtoken";
import useAuth from "../../hooks/useAuth";

const PersistLogin = () => {
    const [isloading, setisloading] = useState(true);
    const refresh = useRefreshtoken();
    const {auth} = useAuth();

    useEffect(() => {
        let isMounted = true
        const verifyRefreshToken = async () => {
            try {
                await refresh()
            } catch (error) {
                console.error(error)
            } finally{
                isMounted && setisloading(false)
            }
        }
        !auth?.accesstoken ? verifyRefreshToken() : setisloading(false)
        return () => isMounted = false
    },[])

    useEffect(() => {
        console.log(`isloading ${isloading}`)
        console.log(`authToken ${JSON.stringify(auth?.accesstoken)}`)
    },[isloading])

    return (
        <>
            {
                isloading
                ? <p>loading...</p>
                : <Outlet />
            }
        </>
    )
}

export default PersistLogin