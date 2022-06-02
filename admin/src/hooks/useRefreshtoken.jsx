import axios from '../api/axios';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';

export default function useRefreshtoken() {
  const { setAuth } = useAuth();
  const navigate = useNavigate()
  const refresh = async () => {
    try {
      const response = await axios.get("/admin/refresh", {
       withCredentials: true
     })
    setAuth(prev => {
         // console.log('PREV'+JSON.stringify(prev)) 
         // console.log('NEW'+JSON.stringify(response?.data?.newaccesstoken))
      return {...prev, accesstoken: response.data.newaccesstoken}
    })
       return response.data.newaccesstoken
    } catch (error) {
      if(error?.response?.status === 403){
        navigate('/login', {replace: true})
      }
    }
  
  }
 return refresh
}

