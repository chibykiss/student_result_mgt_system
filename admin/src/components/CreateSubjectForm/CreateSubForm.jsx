import "./createsubform.css";
import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { ToastContainer, toast } from "react-toastify";
import {useAxios} from "../../hooks/useReusablefunc"
export default function CreateClassForm(props) {
    const [subname,setsubname] = useState("")
    const [subcode,setsubcode] = useState("")
    const [subid,setsubid] = useState("")
    const secureAxios = useAxiosPrivate()
    const submitForm = useAxios()
    //const reuse = execAxios()
    useEffect(() => {
        if(props.btntext === 'update'){
            let isMounted = true
            const controller = new AbortController()
            const getEdit = async() => {
                try {
                    const response = await secureAxios.get(`/subject/${props.subjectid}`, {
                        signal: controller.signal
                    })
                    console.log(response.data)
                    if(isMounted){
                      setsubname(response?.data?.subject_name)
                      setsubcode(response?.data?.subject_code)
                      setsubid(response?.data?._id)
                    }
                } catch (error) {
                    console.error(error)
                }
            }
            getEdit()
            return () => {
                isMounted = false
                controller.abort()
              }
        }
    },[])
    const createSubject = (e) => {
        e.preventDefault()
        if(subname === '' || subcode=== '') return toast("pls fill in the missing feild")
        const reqdata = {name:subname, code:subcode}
        if(props.btntext === 'submit'){
            submitForm('/subject', reqdata, secureAxios.post,"subject created successfully")
        }else{
            submitForm(`/subject/${subid}`,reqdata,secureAxios.patch,"subject updated successfully")
        }
    }
  return (
    <div className="newClass">
        <ToastContainer pauseOnFocusLoss={true} />
        <form onSubmit={createSubject} className="newClassForm">
            <div className="newClassItems">
                <label >Subject Name</label>
                <input type="text" 
                value={subname}
                onChange={(e) => setsubname(e.target.value)}
                placeholder="Input subject name" />
                <small>e.g Mathematics, Physics etc</small>
            </div>
            <div className="newClassItems">
                <label >Subject Code </label>
                <input type="text"
                value={subcode}
                onChange={(e) => setsubcode(e.target.value)}
                 placeholder="Input subject code" />
                <small>e.g mth112,phy212,bio312 etc</small>
            </div>
            <div className="newClassBtn">
                <button type="submit">{props.btntext}</button>
            </div>
        </form>
    </div>
  )
}
