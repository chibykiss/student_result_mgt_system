import { toast } from "react-toastify";
export const useAxios = () => {
    async function submitForm(url,rdata,func,tres){
      try {
        const response = await func(url,rdata)
        console.log(response.data);
        if(response.status === 200){
          toast(tres)
        }
      } catch (err) {
        console.log(err)
        if(!err?.response){
          toast("No Server Response")
        } else if(err?.request.status === 409){
          toast("Already Exists")
        } else if(err?.request.status === 401){
          toast("Already Added")
        }
        else{
          toast("Regitration Failed")
        }
      }
    }
    return submitForm
 
  }

