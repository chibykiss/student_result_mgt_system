import { privateAxios } from "../api/axios";
import { useEffect } from "react";
import useRefreshtoken from "./useRefreshtoken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
    //initialise our refreshtoken hook
    const refresh = useRefreshtoken()
    //initialise our auth
    const { auth } = useAuth();

    useEffect(() => {
        //use axios interceptor to intercept our request. this will run when we try to make a request for the first time
        const requestIntercept  = privateAxios.interceptors.request.use(
            (config) => {
                if(!config.headers.Authorization){//if the authorization has not been set at all
                    config.headers.Authorization = `Bearer ${auth?.accesstoken}`
                }
                return config
            }, (error) => {return Promise.reject(error)}//handle error here
        )

        //use axios interceptor to intercept our response. this will run if our access token has expired, so axios will try to create a new access token for us
        const responseIntercept = privateAxios.interceptors.response.use(
            (response) => {return response},//if we get a response of 2xx then return our response
            //if we get any response that is not in the region of 2xx, then we initiate our error
            async (error) => {
                const prevRequest = error?.config;//we get our previous request from the config property of error object
                //we check if the previous request error status is 401, also if our previous request has already been sent, so will dont get stuck in aloop
                if(error?.response?.status === 403 && !prevRequest?.sent){
                    prevRequest.sent = true // we assign the true property to the previous request, because it has already been sent
                    //get our new access token from the refresh token hook
                    const newAccessToken = await refresh()
                    //access the header and authorization property of the previous request and assign the new access token to its header authorization
                    prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    //after this we will return the axios private with the updated previous request that now has the new access token in its authorization
                    return privateAxios(prevRequest)
                }
                return Promise.reject(error)
            } 

        )
        //clean up the response interceptors so they dont keep on pilling up
        return () => {
            privateAxios.interceptors.request.eject(requestIntercept) //ejecting the request
            privateAxios.interceptors.response.eject(responseIntercept) //ejecting the response
        }
    },[auth, refresh])

    return privateAxios
}

export default useAxiosPrivate