import useAxiosPrivate from "./useAxiosPrivate";
import useAuth from "./useAuth";

const useLogout = () => {
    const {setAuth} = useAuth()
    const privateAxios = useAxiosPrivate()

    const logout = async () => {
        setAuth({})
        try {
            const response = await privateAxios.get('/admin/logout')
            //console.log(response.data)
        } catch (error) {
            console.error(error)
        }
    }
    return logout;
}

export default useLogout