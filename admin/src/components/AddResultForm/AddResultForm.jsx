import { useState,useEffect } from "react"
import { toast,ToastContainer } from "react-toastify"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import { useAxios } from "../../hooks/useReusablefunc";
export default function ClassStdSub({btntext, isactive, resultid}) {
    const secureAxios = useAxiosPrivate()
    const submitForm = useAxios()
    const [stdid,setStdid] = useState("")
    const [klasid,setKlasid] = useState("")
    const [subid,setSubid] = useState("")
    const [mark,setmark] = useState("")
    const [resid,setResid] = useState("")
    const [allStd,setAllstd] = useState([])
    const [stdSub,setStdsub] = useState([])
    useEffect(() => {

            let isMounted = true
            const controller = new AbortController()
            const getAllStd = async () => {
                try {
                    const response = await secureAxios.get('/result/all',{
                        signal: controller.signal
                    })
                    //console.log(response.data)
                    isMounted && setAllstd(response.data)
            
    
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
    useEffect(() => {
        if(btntext === 'Update Result'){
            let isMounted = true
            const controller = new AbortController()
        
            const getEdit = async() => {
                try {
                    const response = await secureAxios.get(`/result/single/${resultid}`, {
                        signal: controller.signal
                    })
                    console.log(response.data)
                    if(isMounted){
                        setResid(response?.data?._id)
                        setStdid(response?.data?.student_id?._id)
                        setSubid(response?.data?.subject_id?._id)
                        setKlasid(response?.data?.class_id)
                        setmark(response?.data?.mark)
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
    useEffect(() => {
    
        //console.log(stdid)
        let newstdid = stdid
        const result = allStd.find(stdnt => {
                return stdnt._id === newstdid;
        });
        setStdsub(result?.subject_id)
        //console.log(stdSub)
        
      },[stdid,stdSub])
      const addResult = (e) => {
          e.preventDefault()
          if(stdid === "" || klasid === "" || subid === "" || mark === "") return toast("pls add the missing feild/s")
            if(btntext === 'Update Result'){
                const reqdata = {dmark: mark}
                submitForm(`/result/${resid}`,reqdata,secureAxios.patch,"Result Updated Successfully")
            }else{
                const reqdata = {klasId:klasid, stdId:stdid,subId:subid,dmark:mark}
                submitForm('/result',reqdata,secureAxios.post,"Result Declared Successfully")
            }
           
        }
  return (
    <div className="newClass">
        <ToastContainer pauseOnFocusLoss={true} />
    <form onSubmit={addResult} className="newClassForm">
        <div className="newClassItems">
            <label >{btntext === 'Update Result'? 'Student' : 'Select Student'}</label>
            <select 
            className="subComboSelect" 
            value={stdid}
            onChange = {(e) => {
                setStdid(e.target.value)
                setKlasid(e.target.options[e.target.selectedIndex].dataset.clsid)
            }}
            disabled={isactive}>
                <option>Select Student</option>
                {allStd.map((student) => 
                   <option key={student._id} value={student._id} data-clsid={student.class_id._id}>{student.student_name}  {student.class_id.class_name}</option>
                )}
            </select>
        </div>
        <div className="newClassItems">
            <label >{btntext === 'Update Result'? 'Subject' : 'Select Subject'}</label>
            <select 
            value={subid}
            onChange = {e => setSubid(e.target.value)}
            className="subComboSelect" 
            disabled={isactive}>
                   <option>Select Subject</option>
                {stdSub === undefined ?
                    <option>select Student first</option>
                :   stdSub.length < 1 ?
                        <option>No Subject Assigned to this Student</option>
                    :stdSub.map((subject) => 
                    <option key={subject._id} value={subject._id}>{subject.subject_name}  {subject.subject_code}</option>
                    )
                }
            </select>
        </div>
        <div className="newClassItems">
            <label >Mark</label>
           <input type="number" 
           value={mark}
           onChange={e => setmark(e.target.value)}
           min={0} max={100}
           disabled={stdSub === undefined || stdSub.length < 1 ? true : false} 
           placeholder="input subject mark"/>
        </div>
        <div className="newClassBtn">
            <button>{btntext}</button>
        </div>
    </form>
</div>
  )
}
