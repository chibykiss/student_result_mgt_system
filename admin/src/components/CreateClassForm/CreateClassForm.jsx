import "./CreateClassForm.css";
import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { ToastContainer, toast } from "react-toastify";
import { useAxios } from "../../hooks/useReusablefunc";
export default function CreateClassForm(props) {
  const submitForm = useAxios()
  const privateAxios = useAxiosPrivate();
  const [classname, setclassname] = useState("");
  const [section, setsection] = useState("");
  const [id,setid] = useState("")
  const [updateClick, setUpdateClicked] = useState(false)
  useEffect(() => {
    if(props.btntext === 'update'){
        let isMounted = true
        const controller = new AbortController()
    
        const getEdit = async() => {
            try {
                const response = await privateAxios.get(`/class/${props.classid}`, {
                    signal: controller.signal
                })
                console.log(response.data)
                if(isMounted){
                  setclassname(response?.data?.class_name)
                  setsection(response?.data?.section)
                  setid(response?.data?._id)
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
  },[updateClick])
  // const execAxios = async (url,rdata,func,tres) => {
  //   try {
  //     const response = await func(url,rdata)
  //     console.log(response.data);
  //     if(response.status === 200){
  //       toast(tres)
  //     }
  //   } catch (err) {
  //     console.log(err)
  //     if(!err?.response){
  //       toast("No Server Response")
  //     } else if(err?.request.status === 409){
  //       toast("Class Name Already Exists")
  //     }else{
  //       toast("Regitration Failed")
  //     }
  //   }
  // }
  const createClass = async (e) => {
    e.preventDefault();
    if (classname === "" || section === "") return toast("fill in the missing feild/s");
      const reqdata = {class_name:classname,section:section}
      if(props.btntext === 'submit'){
        submitForm('/class',reqdata,privateAxios.post,"class created successfully")
      }else{
        setUpdateClicked(true)
        submitForm(`/class/${id}`,reqdata,privateAxios.patch,"class updated successfully")
        setUpdateClicked(false)
      }
    // setclassname('')
    // setsection('')

  };
  return (
    <div className="newClass">
      <ToastContainer pauseOnFocusLoss={true} />
      <form onSubmit={createClass} className="newClassForm">
        <div className="newClassItems">
          <label>Class Name</label>
          <input
            type="text"
            value={classname}
            onChange={(e) => setclassname(e.target.value)}
            placeholder="Input class name"
          />
          <small>e.g First Grade, Third Grade etc</small>
        </div>
        <div className="newClassItems">
          <label>Section</label>
          <input
            type="text"
            value={section}
            onChange={(e) => setsection(e.target.value)}
            placeholder="Input Class name"
          />
          <small>e.g A,B,C etc</small>
        </div>
        <div className="newClassBtn">
          <button type="submit">{props.btntext}</button>
        </div>
      </form>
    </div>
  );
}
