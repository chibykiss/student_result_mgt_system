import "./ClassStdSub.css";
import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { ToastContainer, toast } from "react-toastify";
import { useAxios } from "../../hooks/useReusablefunc";
export default function ClassStdSub() {
    const secureAxios = useAxiosPrivate()
    const submitForm = useAxios()
    const [stdId,setStdId] = useState("")
    const [subId,setSubId] = useState("")
    const [allStd,setStd] = useState([])
    const [allSub,setSub] = useState([])
    useEffect(() => {
        let isMounted = true
        const controller = new AbortController()
        const getAllStd = async () => {
            try {
                const response = await secureAxios.get('/students',{
                    signal: controller.signal
                })
                const res = await secureAxios.get('/subject', {
                    signal: controller.signal
                })
                console.log(response.data)
                console.log(res.data)
                isMounted && setStd(response.data)
                isMounted && setSub(res.data)

            } catch (error) {
                console.log(error)
            }
        }
        getAllStd()

        return () => {
            isMounted = false
            controller.abort()
        }
        
    },[])
    const addStdSub = async (e) => {
        e.preventDefault()
        if (stdId === "" || subId === "" ) return toast("Pls Select the Proper Student Subject Combo");
        const reqdata = {student_id:stdId, subject_id: subId}
        submitForm('/subcombo',reqdata,secureAxios.post,"Student/Subject Combo Added")
    }
  return (
    <div className="newClass">
        <ToastContainer pauseOnFocusLoss={true} />
    <form onSubmit={addStdSub} className="newClassForm">
        <div className="newClassItems">
            <label >Select Student</label>
            <select 
            value={stdId} 
            onChange={e => setStdId(e.target.value)}
            className="subComboSelect"
            >
                <option value="">Select Student</option>
                {allStd.map((student) => 
                   <option key={student._id} value={student._id}>{student.student_name}</option>
                )}
            </select>
        </div>
        <div className="newClassItems">
            <label >Select subject</label>
            <select
            value={subId} 
            onChange={(e) => setSubId(e.target.value)}
            className="subComboSelect">
                <option value="">Select Subject</option>
                {allSub.map((subject) => 
                   <option key={subject._id} value={subject._id}>{subject.subject_name}  {subject.subject_code}</option>
                )}
            </select>
        </div>
        <div className="newClassBtn">
            <button>Add</button>
        </div>
    </form>
</div>
  )
}
